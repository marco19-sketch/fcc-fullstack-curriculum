import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [stats, setStats] = useState([]);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const selected = useMemo(() => {
    const found = pokemonList.find(pokemon => pokemon.name === name);
    return found;
  }, [name, pokemonList]);

  const handleFetchClick = useCallback(async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

      if (res.ok) {
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              image: details.sprites.front_default,
              statistics: details.stats,
            };
          })
        );
        setPokemonList(detailedData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  const handleImgClick = useCallback((e, name) => {
    e.preventDefault();
    setName(name);
  }, []);

  const handleChange = useCallback(
    e => {
      setSearchName(e.target.value);
      console.log(searchName);
    },
    [searchName]
  );

  const handleStatsClick = useCallback(() => {
    const statFound = pokemonList.find(pokemon => pokemon.name === searchName);
    if (statFound) {   //prevents Uncaught TypeError if name is not found
      setStats(statFound.statistics);
    } else {
      setStats([]);
    }
  }, [searchName, pokemonList]);

  useEffect(() => {
    if (stats) {
      console.log("updated stats", stats);
    }
  });

  const handleReset = useCallback(() => {
    setPokemonList([]);
  }, [])

  return (
    <div>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name}>
            <a
              href="#"
              onClick={e => handleImgClick(e, pokemon.name)}
              style={{ cursor: "pointer" }}>
              {pokemon.name}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        {stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <input ref={inputRef} value={searchName} onChange={handleChange} />
      <button disabled={!searchName} type="button" onClick={handleStatsClick}>
        Stats
      </button>
      {selected && <img src={selected.image} alt={selected.name} />}
      <button type="button" onClick={handleClick}>
        Focus
      </button>
      <button type="button" id="fetch" onClick={handleFetchClick}>
        Fetch
      </button>
      <button type='button' onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;

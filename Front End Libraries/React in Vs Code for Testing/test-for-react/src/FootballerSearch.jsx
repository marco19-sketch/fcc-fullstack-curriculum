import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import footballers from "./footballers";

const FootballerSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000); // Start searching 1 second after the user stops typing

  useEffect(() => {
    if (debouncedQuery) {
      const results = footballers.filter(footballer =>
        footballer.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      console.log("Search results:", results);
    } else {
      console.log("Search results: []");
    }
  }, [debouncedQuery]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Footballer Search App</h1>
      <div style={{ textAlign: "center" }}>
        <input
          style={{ padding: "0.5rem", width: "30%" }}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a footballer..."
        />
      </div>
    </>
  );
};

export default FootballerSearch;

import { useState, useCallback, useEffect, useMemo } from "react";
import "./App.css";
import CustomRadio from "./components/CustomRadio.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [competition, setCompetition] = useState("Serie A");
  const [matches, setMatches] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [seasonStart, setSeasonStart] = useState(null);
  const [seasonEnd, setSeasonEnd] = useState(null);
  const [tableStats, setTableStats] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const competitionsChoice = useMemo(
    () => [
      "Fifa World Cup",
      "UEFA Champions League",
      "Bundesliga",
      "Eredivisie",
      "Campeonato Brasileiro",
      "Primera Division",
      "Ligue 1",
      "Championship",
      "European Championship",
      "Serie A",
      "Premier League",
    ],
    []
  );

  //extracted fetch functions from the handleFetch for readability

  const fetchMatches = async (competition, startDate, endDate) => {
    const params = new URLSearchParams({
      competition,
      dateFrom: startDate.toISOString().split("T")[0],
      dateTo: endDate.toISOString().split("T")[0],
    });

    const res = await fetch(
      `http://localhost:3001/api/matches?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch matches");
    const data = await res.json();
    //sorting matches by date
    const sortedMatches = data.matches.sort(
      (a, b) => new Date(a.utcDate) - new Date(b.utcDate)
    );
    //log for debugging
    sortedMatches.forEach(match =>
      console.log(
        `${match.awayTeam.shortName} vs ${match.homeTeam.shortName} , ${match.utcDate}`
      )
    );
    return sortedMatches;
  };

  const fetchStandings = async (competition, season) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/standings?competition=${encodeURIComponent(
          competition
        )}&season=${season}`
      );
      if (!res.ok) {
        console.warn("Standings response not ok");
        return null;
      }
      const data = await res.json();
      return data.standings.find(s => s.type === "TOTAL")?.table || [];
    } catch (err) {
      console.error("Error in fetching Standings:", err);
      return null;
    }
  };

  const handleFetch = useCallback(async () => {
    setShowTable(false);
    setIsLoading(true);

    try {
      const matches = await fetchMatches(competition, startDate, endDate);
      setMatches(matches);

      const table = await fetchStandings(
        competition,
        startDate.getFullYear() - 1
      );

      setTableStats(table);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching match data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [competition, startDate, endDate]);

  useEffect(() => {
    setShowDates(false);
    const fetchSeasonDates = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/season?competition=${encodeURIComponent(
            competition
          )}`
        );

        if (!res.ok) {
          console.warn("There was a problem with the season data");
          setSeasonStart(null);
          setSeasonEnd(null);
          return;
        } else {
          const data = await res.json();
          setSeasonStart(new Date(data.startDate));
          setSeasonEnd(new Date(data.endDate));
          setShowDates(true);
        }
      } catch (err) {
        console.error("Failed to fetch season dates: ", err);
      }
    };
    fetchSeasonDates();
  }, [competition]);

  const handleResetBtn = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSeasonStart(null);
    setSeasonEnd(null);
    setMatches([]);
    setShowTable(false);
    setShowDates(false);
    setTableStats([]);
  }, []);

  return (
    <div>
      <div className="competition">
        {competitionsChoice.map(comp => (
          <CustomRadio
            key={comp}
            label={comp}
            name={comp}
            checked={comp === competition}
            onChange={() => setCompetition(comp)}
          />
        ))}
      </div>
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
        }}
        disabled={isLoading}
        dateFormat="dd-MM-yyyy"
        placeholderText="Select start date"
        showPopperArrow
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
      <DatePicker
        selected={endDate}
        onChange={date => {
          setEndDate(date);
        }}
        disabled={isLoading}
        dateFormat="dd-MM-yyyy"
        placeholderText="Select end date"
        showPopperArrow
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
      {showDates && (
        <p>
          Season: {seasonStart?.toLocaleDateString()} -{" "}
          {seasonEnd?.toLocaleDateString()}
        </p>
      )}
      <button
        className="search"
        type="button"
        onClick={handleFetch}
        disabled={isLoading || !startDate || !endDate || endDate < startDate}>
        Go!
      </button>
      <button className="reset" type="button" onClick={handleResetBtn}>
        Reset
      </button>

      {matches.length > 0 && (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              <span>
                {match.homeTeam.shortName} {match.score.fullTime.home}
              </span>{" "}
              vs{" "}
              <span>
                {match.score.fullTime.away} {match.awayTeam.shortName}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div aria-live="polite">
        {!isLoading && matches.length === 0 && showTable && (
          <p>No matches found for the selected dates.</p>
        )}
        {tableStats === null && <p>⚠️ Unable to fetch the standing table</p>}
        {isLoading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>⚽ Loading...</p>
          </div>
        )}
      </div>
      {/* {tableStats === null && <p>⚠️ Unable to fetch the standing table</p>} */}
      {showTable && Array.isArray(tableStats) && (
        <table>
          <thead>
            <tr>
              <th>Crest</th>
              <th>Team</th>
              <th>Position</th>
              <th>Played</th>
              <th>Points</th>
              <th>Won</th>
              <th>Draw</th>
              <th>Lost</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Goal Difference</th>
            </tr>
          </thead>
          <tbody>
            {tableStats.map(team => {
              return (
                <tr key={team.team.id}>
                  <td>
                    <img
                      className="crest"
                      src={team.team.crest}
                      alt={`${team.team.name} crest`}
                      onError={e => (e.target.style.display = "none")}
                    />
                  </td>
                  <td>{team.team.shortName}</td>
                  <td>{team.position}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.points}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

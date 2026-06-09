require("dotenv").config();
const express = require("express");
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(mod => mod.default(...args)); // ✅ dynamic import fix

 const competitionCodes = {
   "FIFA World Cup": "WC",
   "UEFA Champions League": "CL",
   Bundesliga: "BL1",
   Eredivisie: "DED",
   "Campeonato Brasileiro": "BSA",
   "Primera Division": "PD",
   "Ligue 1": "FL1",
   Championship: "ELC",
   "Primera Liga": "PPL",
   "European Championship": "EC",
   "Serie A": "SA",
   "Premier League": "PL",
 };

const API_KEY = process.env.FOOTBALL_API_KEY;
if (!API_KEY) {
  console.error(
    "⚠️ FOOTBALL_API_KEY not set. Create a .env file with your key."
  );
  process.exit(1);
}

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/matches", async (req, res) => {
  console.log("🔄 /api/matches called");
  const { competition, dateFrom, dateTo } = req.query;

  const apiCompetitionCode = competitionCodes[competition];

  if (!apiCompetitionCode) {
    // don't need this, codes are hardcoded, but is a best practice
    return res.status(400).json({error: 'Invalid competition name'});
  }

  const params = new URLSearchParams();
  params.append('competitions', apiCompetitionCode);

  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const apiUrl =  `https://api.football-data.org/v4/matches?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    const data = await response.json();
    // console.log(`📦 Received ${data.matches?.length || 0} matches`);
    // console.log('matches data', data)
    res.json(data);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});


// 🎯 New endpoint to get season date range
app.get('/api/season', async (req, res) => {
  

   console.log("🛎️ /api/season called"); 
  const { competition } = req.query;

  const apiCompetitionCode = competitionCodes[competition];

  console.log("🔍 /api/season endpoint called with competition:", competition);

  if (!apiCompetitionCode) {
    return res.status(400).json({ error: 'Invalid competition name' });
  }

  const url = `https://api.football-data.org/v4/competitions/${apiCompetitionCode}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    const data = await response.json();
    console.log('Season data', data);

    if (!data.currentSeason) {
      return res.status(404).json({ error: "No current season found" });
    }

    const { startDate, endDate } = data.currentSeason;

    res.json({ startDate, endDate });
  } catch (err) {
    console.error("Error fetching season info:", err);
    res.status(500).json({ error: "Failed to fetch season info" });
  }
});


app.get("/api/standings", async (req, res) => {
  console.log('STAAAAAAAANDIIIIIIIIIIIIIIIIIINGSSSSSSSSSSSS');
  const { competition, season } = req.query;
  // const { competition } = req.query;

  const code = competitionCodes[competition];
  if (!code) {
    return res.status(400).json({ error: "Invalid competition name" });
  }

  const url = `https://api.football-data.org/v4/competitions/${code}/standings?season=${season}
`;
//   const url = `https://api.football-data.org/v4/competitions/PL/standings?season=2023
// `;
  // const url = `https://api.football-data.org/v4/competitions/${code}/standings`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    const data = await response.json();
    console.log("📊 Standings data:", data); 
    res.json(data);
    console.log('Classifica', data.standings );
    const standings = data.standings.find(s => s.type === 'TOTAL');
    const table = standings.table
    console.log('STANDINGS', standings, 'TABLE', table)
  } catch (err) {
    console.error("Error fetching standings:", err);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});





app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});

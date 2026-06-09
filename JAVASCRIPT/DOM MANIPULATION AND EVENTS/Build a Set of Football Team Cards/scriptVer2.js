const coach = document.getElementById("head-coach");
const team = document.getElementById("team");
const year = document.getElementById("year");
const playerCards = document.getElementById("player-cards");
const selectPosition = document.getElementById("players");

const footballTeam = {
  team: "Bacicalupo",
  year: 1907,
  headCoach: "Don Tonino",
  players: [
    { name: "Franco", position: "goalkeeper", isCaptain: true },
    { name: "Gigi", position: "defender", isCaptain: false },
    { name: "Giovà", position: "defender", isCaptain: false },
    { name: "Fofò", position: "defender", isCaptain: false },
    { name: "Totò", position: "midfielder", isCaptain: false },
    { name: "Gigi", position: "midfielder", isCaptain: false },
    { name: "Lino", position: "midfielder", isCaptain: false },
    { name: "Pepe", position: "forward", isCaptain: false },
    { name: "Lollo", position: "forward", isCaptain: false },
    { name: "Sasà", position: "forward", isCaptain: false },
  ],
};

coach.innerText = footballTeam.headCoach;
team.innerText = footballTeam.team;
year.innerText = footballTeam.year;


const renderCards = players => {
  playerCards.innerHTML = players
    .map(player => {
      return `<div class='player-card'>
      <h2>${player.name}${player.isCaptain ? " (Captain)" : ""}</h2>
      <p>Position: ${player.position}</p>
     </div>`;
    })
    .join("");
};

const getPlayers = () => {
  const selected = selectPosition.value;
  if (selected === "all") {
    renderCards(footballTeam.players);
    return;
  }

  const filteredPlayers = footballTeam.players.filter(
    player => player.position === selected
  );
  renderCards(filteredPlayers);
};

selectPosition.addEventListener("change", getPlayers);

// initial render
renderCards(footballTeam.players);

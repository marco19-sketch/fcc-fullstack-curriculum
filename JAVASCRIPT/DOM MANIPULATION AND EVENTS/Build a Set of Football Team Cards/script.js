const footballTeam = {
  team: "Italia",
  year: 2006,
  headCoach: "Marcello Lippi",
  players: [
    {
      name: "Gianluigi Buffon",
      position: "goalkeeper",
      isCaptain: true,
    },
    {
      name: "Marco Materazzi",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Fabio Cannavaro",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Andrea Pirlo",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Gennaro Gattuso",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Simone Perrotta",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Mauro Camoranesi",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Gianluca Zambrotta",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Grosso",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Francesco Totti",
      position: "forward",
      isCaptain: false,
    },
    {
      name: "Luca Toni",
      position: "forward",
      isCaptain: false,
    },
  ],
};

const { team, year, headCoach, players } = footballTeam;

document.getElementById("team").textContent = team;
document.getElementById("head-coach").textContent = headCoach;
document.getElementById("year").textContent = year;

const playerCards = document.getElementById("player-cards");
const playersSelect = document.getElementById("players");

playersSelect.addEventListener("change", (event) => {
  const selectedPosition = event.target.value;

  playerCards.innerHTML = "";

  const filteredPlayers =
    selectedPosition === "all"
      ? players
      : players.filter((player) => player.position === selectedPosition);
  /*let filteredPlayers;
  if (selectedPosition === "all") {
    filteredPlayers = players;
  } else {
    filteredPlayers = players.filter(
      (player) => player.position === selectedPosition
    );
  }*/

  filteredPlayers.forEach((player) => {
    const playerCardClass = document.createElement("div");
    playerCardClass.setAttribute("class", "player-card");
    const heading = document.createElement("h2");
    const p = document.createElement("p");

    heading.textContent = player.name + (player.isCaptain ? "(Captain)" : "");
    p.textContent = player.position;
    
    playerCards.appendChild(playerCardClass);
    playerCardClass.appendChild(heading);
    playerCardClass.appendChild(p);
  });
});

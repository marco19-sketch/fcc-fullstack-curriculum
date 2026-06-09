const drumPad = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");
const padBank = document.getElementById("pad-bank");

drumPad.forEach(pad => {
  pad.addEventListener("click", e => {
    const audio = e.target.children[0];
    audio.currentTime = 0;
    audio.play();
    display.innerText = e.target.id.slice(0, 8);
  });
});

document.addEventListener("keydown", e => {
  const audio = document.getElementById(e.key.toUpperCase());

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  const pad = audio.parentElement;
  display.innerText = pad.id.slice(0, 8);
  pad.style.backgroundColor = "red";
  pad.style.transform = "scale(1.1)";
  pad.style.boxShadow = "6px 6px 9px white";

  setTimeout(() => {
    pad.style.backgroundColor = "";
    pad.style.transform = "";
    pad.style.boxShadow = "";
  }, 300);
});

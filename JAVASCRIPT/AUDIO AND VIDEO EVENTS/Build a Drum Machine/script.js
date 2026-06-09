const padBank = document.getElementById("pad-bank");
const display = document.getElementById("display");

padBank.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  const audio = button.querySelector("audio");
  audio.currentTime = 0;
  audio.play();
  display.innerText = button.id;
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  const audio = document.getElementById(key);

  try {
    if (!validKeys.includes(key)) {
      throw new Error(`Invalid key: ${key}`);
    }

    audio.currentTime = 0;
    audio.play();

    display.innerText = audio ? audio.parentElement.id : "";
  } catch (err) {
    console.warn("Caught error:", err.message);
  } finally {
    console.log("Event processed, continuing...");
  }
});

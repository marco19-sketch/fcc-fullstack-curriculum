const textInput = document.querySelector("#text-input");
const charCount = document.querySelector("#char-count");

function outerAddOneCount() {
  let counter = 0;
  return function innerAddOneCount(event) {
    if (counter >= 50 && !["Backspace", "Delete"].includes(event.key)) {
      event.preventDefault();
      charCount.style.color = "red";
    } else if (counter < 50 && /^[\x20-\x7E]$/.test(event.key)) {
      counter++;
    } else if (
      (counter > 0 && event.key === "Backspace") ||
      event.key === "Delete"
    ) {
      counter--;
    }
    charCount.textContent = `Character Count: ${counter}/50`;
  };
}

const count = outerAddOneCount();

textInput.addEventListener("keydown", count);

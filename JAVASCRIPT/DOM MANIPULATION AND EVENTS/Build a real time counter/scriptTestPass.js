const textInput = document.querySelector("#text-input");
const charCount = document.querySelector("#char-count");

function counter(event) {
  let charNumber = event.target.value.trim().length;

  if (charNumber >= 50) {
    event.target.value = event.target.value.slice(0, 50);
    charNumber = event.target.value.length;
    charCount.style.color = "red";
  }
  return (charCount.textContent = `Character Count: ${charNumber}/50`);
}

textInput.addEventListener("input", counter);

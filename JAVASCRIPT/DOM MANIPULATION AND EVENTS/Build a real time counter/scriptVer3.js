const textInput = document.getElementById("text-input");
const charCount = document.querySelector("#char-count");

textInput.addEventListener("input", () => {
  let count = textInput.value.length;
  charCount.textContent = `Character Count: ${count}/50`;
  if (count >= 50) {
    charCount.style.color = "red";
    textInput.value = textInput.value.slice(0, 50);
  }
});

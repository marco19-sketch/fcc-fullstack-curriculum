const regexPattern = document.getElementById("pattern");
const patternContainer = document.getElementById("pattern-container");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

const getFlags = () => {
  const i = caseInsensitiveFlag.checked === true ? "i" : "";
  const g = globalFlag.checked === true ? "g" : "";
  return i + g;
};

const getMatch = () => {
  const regex = new RegExp(regexPattern.value, getFlags());
  const string = stringToTest.innerHTML;
  const match = string.match(regex);

  result.textContent = match ? match.join(", ") : "no match";
  console.log("match", match);

  if (match) {
    stringToTest.innerHTML = string.replace(
      regex,
      matched => `<span class='highlight'>${matched}</span>`
    );
  }
};

testButton.addEventListener("click", getMatch);

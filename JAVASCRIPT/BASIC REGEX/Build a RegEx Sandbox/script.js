const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const resetButton = document.getElementById('reset-btn');

const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

let flags = '';
 const flag = () => {
  flags += caseInsensitiveFlag.checked ? "i" : "";
  flags += globalFlag.checked ? "g" : "";
  return flags;
};

testButton.addEventListener("click", () => {
  let string = stringToTest.innerHTML;

  const pattern = regexPattern.value;
  flags = flag();
  const regex = new RegExp(pattern, flags);
  const matched = string.match(regex);

  const highlight = string.replace(regex, (matched) => {
    return `<span class='highlight'>${matched}</span>`;
  });

  stringToTest.innerHTML = highlight;

  matched === null
    ? (result.innerText = "no match")
    : (result.innerText = matched.join(", "));
});

resetButton.addEventListener('click', () => {
  regexPattern.value = '';
  stringToTest.innerHTML = '';
  result.innerText = '';
  caseInsensitiveFlag.checked = false;
  globalFlag.checked = false;
  flags = "";
})


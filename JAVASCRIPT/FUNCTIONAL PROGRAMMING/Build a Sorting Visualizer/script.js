// Get references to DOM elements
const startArray = document.getElementById("starting-array");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const arrayContainer = document.getElementById("array-container");

// Generate a random number between 1 and 100
const generateElement = () => Math.floor(Math.random() * 100 + 1);

// Create an array of 5 random numbers
const generateArray = () => {
  const array = [];
  for (let i = 1; i <= 5; i++) {
    const item = generateElement();
    array.push(item);
  }
  return array;
};

// Create a new div container to display an array snapshot
const generateContainer = () => {
  const div = document.createElement("div");
  div.classList.add("generated");
  arrayContainer.appendChild(div);
  return div;
};

// Fill a div with <span> elements representing array values
const fillArrContainer = (div, array) => {
  let span = "";
  for (let i = 0; i < 5; i++) {
    span += `<span>${array[i]}</span>`;
  }
  div.innerHTML = span;
};

// Helper function to check if two numbers are in correct order (ascending)
const isOrdered = (a, b) => a <= b;

// Swap elements if they are not ordered
const swapElements = (arr, i) => {
  if (!isOrdered(arr[i], arr[i + 1])) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }
};

// Visually highlight the two elements currently being compared
const highlightCurrentEls = (el, i) => {
  const child1 = el.children[i];
  const child2 = el.children[i + 1];

  if (child1) child1.style.border = "2px dashed red";
  if (child2) child2.style.border = "2px dashed red";
};

// When "Generate" button is clicked:
generateBtn.addEventListener("click", () => {
  const oldDivs = document.querySelectorAll(".generated");
  oldDivs.forEach(div => div.remove());

  fillArrContainer(startArray, generateArray());
});

// When "Sort" button is clicked:
sortBtn.addEventListener("click", () => {
  // Read all <span> elements and convert their text into numbers
  const spans = document.querySelectorAll("span");
  const array = Array.from(spans, span => Number(span.textContent));

  let div; // To store each new array visualization container
  let arrayB4; // Snapshot before each outer iteration
  let arrayAft; // Snapshot after each outer iteration

  // Outer loop: repeat passes until array is sorted
  for (let j = 0; j < array.length - 1; j++) {
    arrayB4 = array.slice(); // Copy array before sorting pass

    // Inner loop: compare and swap adjacent elements
    for (let i = 0; i < array.length - 1; i++) {
      // Highlight the elements being compared
      if (i === 0 && j === 0) {
        highlightCurrentEls(startArray, i);
      } else if (i === 4) {
        // Reset index when reaching the end (last comparison)
        i = 0;
      } else {
        highlightCurrentEls(div, i);
      }

      // Swap if needed and create a visual snapshot
      swapElements(array, i);
      div = generateContainer();
      fillArrContainer(div, array);
    }
    arrayAft = array.slice(); // Copy array after sorting pass

    // If no changes occurred, array is sorted — stop the process
    if (arrayB4.every((val, i) => val === arrayAft[i])) {
      // Remove last redundant snapshot
      arrayContainer.lastChild.remove();

      // Create final green-bordered container to show sorted array
      const resultDiv = generateContainer();
      resultDiv.style.border = "4px solid green";
      fillArrContainer(resultDiv, array);
      return;
    }
  }
});

/*
📘 Description:
This script visually demonstrates the bubble sort algorithm.
It generates a random array of 5 numbers, displays it on screen,
and shows each sorting step until the array is completely ordered.
*/

// Get DOM elements for buttons and containers
const generateBtn = document.getElementById("generate-btn");
const startingArray = document.getElementById("starting-array");
const arrayContainer = document.getElementById("array-container");
const sortBtn = document.getElementById("sort-btn");

// Generate a random number between 1 and 100
const generateElement = () => Math.floor(Math.random() * 100) + 1;

// Create an array of 5 random numbers
const generateArray = () => {
  const array = [];
  for (let i = 1; i <= 5; i++) {
    array.push(generateElement());
  }
  return array;
};

// Create a new <div> container to visualize an array state
const generateContainer = () => document.createElement("div");

// Fill a container with <span> elements representing each array item
const fillArrContainer = (el, array) => {
  let spans = "";
  for (let i = 0; i < 5; i++) {
    spans += `<span>${array[i]}</span>`;
  }
  return (el.innerHTML = spans);
};

// Check if two numbers are in ascending order
const isOrdered = (n, m) => n <= m;

// Swap two adjacent elements if they are out of order
const swapElements = (array, i) => {
  if (!isOrdered(array[i], array[i + 1])) {
    [array[i], array[i + 1]] = [array[i + 1], array[i]];
  }
};

// Highlight the two elements currently being compared
const highlightCurrentEls = (el, i) => {
  el.children[i].style.border = "2px dashed red";
  el.children[i + 1].style.border = "2px dashed red";
};

// Handle click on "Generate" button
generateBtn.addEventListener("click", () => {
  arrayContainer.innerHTML = ""; // Clear all previous content
  arrayContainer.append(startingArray); // Re-append the main array section
  startingArray.innerHTML = ""; // Reset previous array values

  // Generate a new random array and display it
  fillArrContainer(startingArray, generateArray());
});

// Handle click on "Sort" button
sortBtn.addEventListener("click", () => {
  // Get all <span> elements and convert their text to numbers
  const spans = document.querySelectorAll("span");
  const array = [...spans].map(item => Number(item.innerText));

  // Track the array before and after each pass
  let arrayBeforeSwap = [];
  let arrayAfterSwap = [];
  let arrayDiv;

  // Outer loop → repeat until array is sorted
  for (let j = 0; j < array.length - 1; j++) {
    arrayAfterSwap = array.join("-");

    // If array hasn't changed, it's already sorted → stop
    if (arrayAfterSwap === arrayBeforeSwap) {
      break;
    } else {
      arrayBeforeSwap = array.join("-");

      // Inner loop → compare adjacent elements
      for (let i = 0; i < array.length - 1; i++) {
        // Highlight the current pair being compared
        if (i === 0 && j === 0) {
          highlightCurrentEls(startingArray, i);
        } else if (j === 0 && i === 4) {
          i = 0; // Reset to start if first pass ends
        } else {
          highlightCurrentEls(arrayDiv, i);
        }

        // Perform a swap if needed
        swapElements(array, i);

        // Create a new visual snapshot of the array
        arrayDiv = generateContainer();
        fillArrContainer(arrayDiv, array);
        arrayContainer.append(arrayDiv);
      }
    }
  }

  // Remove the last redundant snapshot
  arrayContainer.lastChild.remove();

  // Show final sorted array with green border
  const finalDiv = generateContainer();
  fillArrContainer(finalDiv, array);
  finalDiv.style.border = "4px solid green";
  arrayContainer.append(finalDiv);
});

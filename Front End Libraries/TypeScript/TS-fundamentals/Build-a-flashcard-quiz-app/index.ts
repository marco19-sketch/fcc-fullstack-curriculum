const flashcard = document.getElementById("flashcard");
const delBtn = document.getElementById("delete-btn");
const entryForm = document.getElementById("entry-form");
const frontText = document.getElementById("front-text") as HTMLInputElement;
const backText = document.getElementById("back-text") as HTMLInputElement;
const cardFront = document.querySelector(".card-front .question");
const cardBack = document.querySelector(".card-back .answer");

interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

const currentCards: FlashCard[] = [
  {
    questionText: "What is TypeScript?",
    questionAnswer: "A typed superset of JavaScript",
  },
  {
    questionText: "What is a collection in TypeScript?",
    questionAnswer: "Array, Map, Set, or Object holding multiple values",
  },
  {
    questionText: "What method does e.target have?",
    questionAnswer: "addEventListener, removeEventListener, dispatchEvent",
  },
  {
    questionText: "How to cast e.target in TypeScript?",
    questionAnswer: 'Use "as HTMLElement" or "instanceof" checks',
  },
];

// Function to update card content
function updateCardDisplay(): void {
  if (cardFront && cardBack) {
    if (currentCards.length === 0) {
      cardFront.textContent = "";
      cardBack.textContent = "";
      return;
    }

    const index = currentCards.length - 1;
    cardFront.textContent = currentCards[index].questionText;
    cardBack.textContent = currentCards[index].questionAnswer;
  }
}

// Flip card logic
if (flashcard && cardFront && cardBack) {
  updateCardDisplay();

  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });
}

// Remove flashcard logic
if (delBtn && flashcard) {
  delBtn.addEventListener("click", () => {
    currentCards.pop();
    if (currentCards.length === 0) {
      flashcard.textContent = "No cards left!";
      flashcard.classList.remove("flipped");
      return;
    }
    updateCardDisplay();
    flashcard.classList.remove("flipped");
  });
}

// Create new error class
class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}

// Entry form logic
if (entryForm && frontText && backText) {
  entryForm.addEventListener("submit", e => {
    e.preventDefault();

    if (frontText.value.trim() === "" || backText.value.trim() === "") {
      throw new InvalidUserInputError("Question and answer cannot be empty");
    }
    currentCards.push({
      questionText: frontText.value,
      questionAnswer: backText.value,
    });

    frontText.value = "";
    backText.value = "";
  });
}

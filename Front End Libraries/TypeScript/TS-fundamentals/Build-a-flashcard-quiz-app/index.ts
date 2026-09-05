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

let currentCardIndex = 0;

// Function to update card content
function updateCardDisplay(index: number) {
  if (cardFront && cardBack && currentCards[index]) {
    cardFront.textContent = currentCards[index].questionText;
    cardBack.textContent = currentCards[index].questionAnswer;
  }
}

if (flashcard && cardFront && cardBack) {
  updateCardDisplay(currentCardIndex);

  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });
}

// if (delBtn && flashcard && currentCards.length > 0) {
if (delBtn && flashcard) {
  delBtn.addEventListener("click", () => {
    // if (currentCards.length < 1) {
    //   return 'No more cards'
    // }
    currentCards.splice(currentCardIndex, 1);
    if (currentCards.length === 0) {
      flashcard.textContent = "No cards left!";
      flashcard.classList.remove("flipped");
      return;
    }
    currentCardIndex--;
    if (currentCardIndex < 0) {
      currentCardIndex = 0;
    }
    // flashcard.textContent = currentCards[currentCardIndex].questionText;
    updateCardDisplay(currentCardIndex);
    flashcard.classList.remove("flipped");
  });
}

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}

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
    console.log(currentCards);
  });
}

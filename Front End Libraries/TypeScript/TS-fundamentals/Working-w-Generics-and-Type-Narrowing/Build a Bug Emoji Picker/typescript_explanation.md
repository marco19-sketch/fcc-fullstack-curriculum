# Bug Emoji Picker - TypeScript Implementation

A TypeScript-based emoji picker that displays different bug emojis when selected from a dropdown.

## Complete Code with Commentary

```typescript
/**
 * Abstract base class for all bugs
 * 
 * @template T - The type of emoji (e.g., string, number, etc.)
 * 
 * This is a generic class that can work with different emoji types,
 * though we'll use string for emoji characters.
 */
abstract class Bug<T> {
  // The emoji value that will be displayed
  // The '!' is a definite assignment assertion - tells TypeScript 
  // that this property will be initialized before use (even though 
  // TypeScript can't verify it in the constructor)
  emoji!: T;
  
  // HTML element where the emoji will be rendered
  // Again using '!' because it's initialized in the constructor
  emojiElement!: HTMLParagraphElement;
  
  /**
   * Constructor receives the DOM element where the bug will be displayed
   * @param emojiElement - The paragraph element that will show the emoji
   */
  constructor(emojiElement: HTMLParagraphElement) {
    this.emojiElement = emojiElement;
  }

  /**
   * Abstract method - each subclass must implement its own rendering logic
   * This forces all bugs to have a render() method
   */
  abstract render(): void;
}

/**
 * Concrete Bee class that extends Bug with string emoji type
 * 
 * A bee emoji will be displayed as 🐝
 */
class Bee extends Bug<string> {
  /**
   * Constructor creates a Bee instance
   * @param emojiElement - The paragraph element for displaying the bee
   */
  constructor(emojiElement: HTMLParagraphElement) {
    // Call parent constructor to set up the emojiElement
    super(emojiElement);
    // Set the specific emoji for bees
    this.emoji = "🐝";
  }

  /**
   * Implementation of the render method
   * 'override' keyword ensures we're intentionally overriding the parent method
   * Displays the bee emoji in the assigned HTML element
   */
  override render() {
    this.emojiElement.innerText = this.emoji;
  }
}

/**
 * Concrete Spider class that extends Bug with string emoji type
 * 
 * A spider emoji will be displayed as 🕷️
 */
class Spider extends Bug<string> {
  /**
   * Constructor creates a Spider instance
   * @param emojiElement - The paragraph element for displaying the spider
   */
  constructor(emojiElement: HTMLParagraphElement) {
    // Call parent constructor to set up the emojiElement
    super(emojiElement);
    // Set the specific emoji for spiders
    this.emoji = "🕷️";
  }

  /**
   * Implementation of the render method
   * 'override' keyword ensures we're intentionally overriding the parent method
   * Displays the spider emoji in the assigned HTML element
   */
  override render() {
    this.emojiElement.innerText = this.emoji;
  }
}

/**
 * Type guard function to check if an EventTarget is an HTMLSelectElement
 * 
 * This is a "type predicate" - it tells TypeScript that if this function
 * returns true, then the element is definitely an HTMLSelectElement
 * 
 * @param element - The event target to check (could be null, or any EventTarget)
 * @returns True if the element is an HTMLSelectElement
 */
function isSelect(element: EventTarget | null): element is HTMLSelectElement {
  return element instanceof HTMLSelectElement;
}

/**
 * Get the paragraph element where bugs will be displayed
 * The '!' is a non-null assertion - we're telling TypeScript "I know
 * for certain this element exists in the HTML, so don't worry about null"
 * 
 * We use querySelector with a generic type parameter to specify
 * what kind of element we expect to get back
 */
const bugEmojiElement = 
  document.querySelector<HTMLParagraphElement>("#bug-emoji")!;

/**
 * Create a lookup table (Record) that maps species names to bug instances
 * 
 * Record<string, Bug<string>> means: keys are strings, values are Bug<string> objects
 * This allows us to look up the correct bug based on what the user selects
 */
const bugMap: Record<string, Bug<string>> = {
  bee: new Bee(bugEmojiElement),    // Create a Bee instance for the "bee" option
  spider: new Spider(bugEmojiElement), // Create a Spider instance for the "spider" option
};

/**
 * Get the select dropdown element from the DOM
 * We're specifying it's an HTMLSelectElement for proper type checking
 */
const selectElement = document.querySelector<HTMLSelectElement>("#species")!;

/**
 * Add an event listener to the dropdown that triggers when the user selects an option
 * 
 * The event handler:
 * 1. First checks if the event target is actually a select element (using our type guard)
 * 2. Then looks up the corresponding bug in the bugMap using the selected value
 * 3. If the bug exists (safety check), call its render() method to display the emoji
 */
selectElement.addEventListener("change", e => {
  // Type guard ensures we're working with the right element type
  if (isSelect(e.target)) {
    // Get the bug instance for the selected value (e.g., "bee" or "spider")
    const bug = bugMap[e.target.value];
    
    // Safety check: only render if we actually found a bug
    // This prevents crashes if someone adds an option that's not in bugMap
    if (bug) {
      bug.render(); // 🐝 or 🕷️ appears on the page!
    }
  }
});

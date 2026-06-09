// Type definition for motorcycle categories - restricts possible values
type Category =
  | "Sport"
  | "Cruiser"
  | "Touring"
  | "Dirt"
  | "Adventure"
  | "Naked"
  | "Electric";

// Interface defining the shape of a Motorcycle object
interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
  engine_cc?: string; // Optional property - may not exist on all motorcycles
}


// Fetches motorcycle data from external API, returns array or empty array on error
const fetchMotorcycles = async (): Promise<Motorcycle[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); //Delay 1 sec.
    const res = await fetch(
      "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json",
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data: ", err);
    return []; // Return empty array as fallback to prevent crashes
  }
};


// Converts a Motorcycle object into an HTML string for display in the gallery
const renderMotorcycleCard = (motorcycle: Motorcycle): string => {
  return /*html */`<div class="motorcycle-card">
    <div class="motorcycle-card-image-container">
      <img class="motorcycle-card-image" src='${motorcycle.image_url}' alt='${motorcycle.name}' />
      <p class='motorcycle-card-year-badge'>${motorcycle.year}</p>
    </div>
    <div class='motorcycle-card-content'>
      <div class='motorcycle-card-header'>
        <div>
          <h3 class='motorcycle-card-title'>${motorcycle.name}</h3>
          <p class='motorcycle-card-manufacturer'>${motorcycle.manufacturer}</p>
        </div>
        <span class='motorcycle-card-category'>${motorcycle.category}</span>
      </div>
      <p class='motorcycle-card-description'>${motorcycle.description}</p>
      <div class='motorcycle-card-footer'>
        <div>
          <p class='motorcycle-card-price'>$${motorcycle.price.toLocaleString()}</p>
          <p class='motorcycle-card-engine'>${motorcycle?.engine_cc || "undefined"}cc</p>
        </div>
        <button class='motorcycle-card-button'>View Details</button>
      </div>
    </div>
  </div>`;
};


// Main application class that manages the motorcycle gallery
class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = []; // Complete unfiltered dataset
  private filteredMoto: Motorcycle[] = []; // Currently displayed dataset (after filtering)

  constructor() {
    this.loadMotorcycles(); // Fetch data when app starts
    this.setupEventListener(); // Set up search input listener
  }

  // Fetches motorcycle data from API, shows/hides loading spinner, then renders
  private async loadMotorcycles(): Promise<void> {
    const loadingContainer = document.getElementById("loading-container");
    if (loadingContainer) loadingContainer.style.display = "flex"; // Show spinner
    try {
      this.allMotorcycles = await fetchMotorcycles();
      this.filteredMoto = this.allMotorcycles;

      if (loadingContainer) loadingContainer.style.display = "none"; // Hide spinner
      this.renderMotorcycles(); // Display the motorcycles
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  }

  // Renders current filtered motorcycles to the DOM, updates count, handles empty state
  renderMotorcycles(): void {
    const moto = this.filteredMoto;
    const gridElement = document.getElementById("motorcycle-grid");
    const noResults = document.getElementById("no-results");

    // Clear previous content
    if (gridElement) {
      gridElement.textContent = "";
    }

    // Show/hide "no results" message based on filtered results
    if (moto.length === 0) {
      if (noResults) noResults.style.display = "block";
      if (gridElement) gridElement.style.display = "none";
    } else {
      if (noResults) noResults.style.display = "none";
      if (gridElement) gridElement.style.display = "grid";
    }

    // Update results count display
    const number = document.getElementById("results-number");
    if (number) {
      number.innerText = moto.length.toString();
    }

    // Generate and insert HTML for each motorcycle
    moto.forEach((moto: Motorcycle) => {
      gridElement?.insertAdjacentHTML("beforeend", renderMotorcycleCard(moto));
    });
  }

  // Filters motorcycles by name (case-insensitive) and re-renders
  handleSearch(query: string): void {
    this.filteredMoto = this.allMotorcycles.filter((moto: Motorcycle) =>
      moto.name.toLowerCase().includes(query.toLowerCase()),
    );
    console.log("filtered moto", this.filteredMoto);
    this.renderMotorcycles();
  }

  // Attaches input event listener to search box for real-time filtering
  setupEventListener(): void {
    const input = document.getElementById(
      "name-filter-input",
    ) as HTMLInputElement | null;
    input?.addEventListener("input", e => {
      const target = e.target as HTMLInputElement;
      this.handleSearch(target.value);
      console.log("target value", target.value);
    });
  }
}

// Create and start the application instance
// const shop = new MotorcycleGalleryApp();

document.addEventListener("DOMContentLoaded", () => {
  new MotorcycleGalleryApp();
});

export const MoodBoardItem = ({ color, image, description }) => {
  return (
    <div className="mood-board-item" style={{ backgroundColor: color }}>
      <img className="mood-board-image" src={image} />
      <h3 className="mood-board-text">{description}</h3>
    </div>
  );
};

export const MoodBoard = () => {
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        <div className="mood-board-item" style={{ backgroundColor: "blue" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg"
          />
          <h3 className="mood-board-text">
            A stone path winds through a tranquil forest.
          </h3>
        </div>
        <div className="mood-board-item" style={{ backgroundColor: "green" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg"
          />
          <h3 className="mood-board-text">
            Calm shore, gentle waves, driftwood, peaceful and quiet.
          </h3>
        </div>
        <div className="mood-board-item" style={{ backgroundColor: "pink" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/grass.jpg"
          />
          <h3 className="mood-board-text">
            Green grass field, blue sky, peaceful, fresh, open, sunny.
          </h3>
        </div>
        <div className="mood-board-item" style={{ backgroundColor: "orange" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/ship.jpg"
          />
          <h3 className="mood-board-text">
            Sailing ship at sunset, calm sea, warm orange light.
          </h3>
        </div>
        <div className="mood-board-item" style={{ backgroundColor: "yellow" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg"
          />
          <h3 className="mood-board-text">
            White houses, blue domes, ocean views, sunny day.
          </h3>
        </div>
        <div className="mood-board-item" style={{ backgroundColor: "purple" }}>
          <img
            className="mood-board-image"
            src="https://cdn.freecodecamp.org/curriculum/labs/pigeon.jpg"
          />
          <h3 className="mood-board-text">
            Pigeon perched on stone ledge, city blurred behind softly.
          </h3>
        </div>
      </div>
    </div>
  );
};

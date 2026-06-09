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
        <MoodBoardItem
          color="#4B6043"
          image="https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg"
          description="A peaceful forest path inviting quiet, mindful steps."
        />
        <MoodBoardItem
          color="#8CAFBF"
          image="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg"
          description="Gentle waves roll under the pale morning sky."
        />
        <MoodBoardItem
          color="#7BB661"
          image="https://cdn.freecodecamp.org/curriculum/labs/grass.jpg"
          description="Bright blades dancing under sunlight, full of life."
        />
        <MoodBoardItem
          color="#30475E"
          image="https://cdn.freecodecamp.org/curriculum/labs/ship.jpg"
          description="A lone ship sails boldly through misty waters."
        />
        <MoodBoardItem
          color="#2A2A2E"
          image="https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg"
          description="Sun-kissed cliffs above sparkling, endless blue horizons."
        />
        <MoodBoardItem
          color="#778899"
          image="https://cdn.freecodecamp.org/curriculum/labs/pigeon.jpg"
          description="City bird perched calmly, watching the world pass."
        />
      </div>
    </div>
  );
};

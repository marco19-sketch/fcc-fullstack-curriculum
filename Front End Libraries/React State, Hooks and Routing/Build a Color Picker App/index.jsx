const { useState } = React;

export const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");

  const handleColorChanger = e => {
    setColor(e.target.value);
  };

  return (
    <div id="color-picker-container" style={{ backgroundColor: color }}>
      <input
        value={color}
        id="color-input"
        type="color"
        onChange={handleColorChanger}
      />
    </div>
  );
};

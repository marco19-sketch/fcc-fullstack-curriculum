import { useState, useMemo, useCallback } from "react";

const products = [
  { name: "iPhone", category: "Electronics" },
  { name: "T-Shirt", category: "Clothing" },
  { name: "Blender", category: "Appliances" },
  { name: "Jeans", category: "Clothing" },
  { name: "Laptop", category: "Electronics" },
];

function App() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => {
      console.log("🔄 Filtering products...");
      return products.filter(obj => category === "All" || obj.category === category)},
    [category]
  );

  const handleChange = useCallback(e => {
    console.log("📞 handleChange called");
    console.log("🧠 handleChange identity:", handleChange);

    setCategory(e.target.value);
  }, []);

  return (
    <div>
      <select value={category} onChange={handleChange}>
        <option value="All">All</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Appliances">Appliances</option>
      </select>
      <ul>
        {filtered.map(obj => (
          <li key={obj.name}>{obj.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
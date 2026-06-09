import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     console.log("Component renders"); //renders every time
  //   });

//   useEffect(() => {
//     console.log("Component renders"); //renders only the first time []
//   }, []);

useEffect(() => {
  document.title = `The current count is ${count}`; //renders every time the count changes[count]
  console.log("component renders");
}, [count]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <h2>{count}</h2>
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </div>
    </div>
  );
};

export default Counter;

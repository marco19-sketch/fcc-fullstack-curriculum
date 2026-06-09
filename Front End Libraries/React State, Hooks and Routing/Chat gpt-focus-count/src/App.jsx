import { useState, useRef, useEffect, useCallback, useMemo } from "react";

function App() {
const inputRef = useRef(null);
const renderCount = useRef(0);
const [name, setName] = useState('');

useEffect(() => {renderCount.current++}); // intentional no dependencies

const renderName = useMemo(() => {
  if (name.length > 3)
    return name
}, [name])

const handleChange = useCallback((e) => 
 setName(e.target.value), []);

const handleClick = useCallback(() => {
  inputRef.current.focus()}, [])

  return (
    <div>
      <input ref={inputRef} onChange={handleChange} type='text' />
      <button onClick={handleClick}>Focus Input</button>
      <p>Render name: {renderName || 'too short'}</p>
      <p>Render Count: {renderCount.current}</p>
    </div>
  );
}

export default App;

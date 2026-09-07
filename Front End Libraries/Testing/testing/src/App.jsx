import { useState, useRef, useEffect } from "react";

export default function Profile() {
  const inputRef = useRef(null)
  const [user, setUser] = useState({
    name: 'Marco',
    age: 56,
    city: 'Palermo'
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({...prevUser, [name]: value}))
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // oxlint-disable-next-line react/refs
  console.log(inputRef)

  useEffect(() => {
    console.log('Component renders')
  }) // No dependency array, the effect runs at every Component render or update

  useEffect(() => {
    console.log('I run only once at first render')
  }, [])

  useEffect(() => {
    console.log('I run when my dependencies change')
  }, [user])

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>City: {user.city} </p>

      <h2>Update User Name</h2>
      <input type="text" name='name' value={user.name} onChange={handleChange} />

      <h2>Update User Age</h2>
      <input type="number" name='age' value={user.age} onChange={handleChange} />

      <h2>Update User City</h2>
      <input type="text" name='city' value={user.city} onChange={handleChange} />

      <h2>useRef</h2>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
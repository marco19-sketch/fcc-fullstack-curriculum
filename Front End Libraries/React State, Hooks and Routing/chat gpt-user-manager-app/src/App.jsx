import {useRef, useState, useEffect, useCallback} from 'react'

function App() {
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null)
  const userAddCount = useRef(0);
  const lastUserRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        
        if (res) {
          const data = await res.json()
          setUsers(data)
          console.log(data)
        }
      
      } catch (error) {
        console.error('Error trying to fetch the data: ', error)
      }
    }
    fetchData()
  }, [])

  const handleNameChange = useCallback((e) => 
    setNewUserName(e.target.value), []);

  const handleEmailChange = useCallback((e) =>
    setNewUserEmail(e.target.value), []);

  const handleUsernameChange = useCallback((e) =>
    setNewUserUsername(e.target.value), [])

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('')

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (inputRef.current)
    inputRef.current.focus();
    userAddCount.current++;
    setTimeout(() => {
      lastUserRef.current?.scrollIntoView({behavior: 'smooth'});
    }, 2000);

    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      username: newUserUsername
    };

    setUsers((prevUsers) => 
      [...prevUsers, newUser]);

      setNewUserName('');
      setNewUserEmail('');
      setNewUserUsername('');
    
  }, [newUserName, newUserEmail, newUserUsername])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          ref={inputRef}
          id="name"
          type="text"
          value={newUserName}
          onChange={handleNameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={newUserEmail}
          onChange={handleEmailChange}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={newUserUsername}
          onChange={handleUsernameChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map((user, i) => (
          <li
            ref={i === users.length - 1 ? lastUserRef : null}
            key={user.id}>{`${user.name}, ${user.email}, ${user.username}`}</li>
        ))}
      </ul>
      <p>{userAddCount.current}</p>
    </div>
  );
}

export default App

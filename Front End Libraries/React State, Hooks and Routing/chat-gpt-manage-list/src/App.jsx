import { useState, useCallback } from "react";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", grade: "A" },
    { id: 2, name: "Bob", grade: "B" },
  ]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("");

  const handleAddCharlie = useCallback(() => {
    setStudents(prevStudents => [
      ...prevStudents,
      { id: 3, name: "Charlie", grade: "C" },
    ]);
  }, []);

  const handleUpgradeBob = useCallback(() => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === 2 ? { ...student, grade: "A+" } : student
      )
    );
  }, []);

  const handleRemoveAlice = useCallback(
    () =>
      setStudents(prevStudents =>
        prevStudents.filter(student => student.id !== 1)
      ),
    []
  );

  const handleNameChange = useCallback(
    e => setNewStudentName(e.target.value),
    []
  );

  const handleGradeChange = useCallback(
    e => setNewStudentGrade(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const newStudent = {
        id: Date.now(),
        name: newStudentName,
        grade: newStudentGrade,
      };

      setStudents(prev => [...prev, newStudent]);
      setNewStudentName("");
      setNewStudentGrade("");      
    },
    [newStudentName, newStudentGrade]
  );

  console.log(students)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-name">Name</label>
        <input
          id="new-name"
          value={newStudentName}
          type="text"
          onChange={handleNameChange}
        />
        <label htmlFor="new-grade">Grade</label>
        <input
          id="new-grade"
          value={newStudentGrade}
          type="text"
          onChange={handleGradeChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleAddCharlie}>Add Student</button>
      <button onClick={handleUpgradeBob}>Upgrade Bob</button>
      <button onClick={handleRemoveAlice}>Remove Alice</button>
      {students.map(student => (
        <p
          key={
            student.id
          }>{`Name: ${student.name};  Grade: ${student.grade}`}</p>
      ))}
    </div>
  );
}

export default App;

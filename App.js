import React, { useState } from 'react';
import './App.css';

// Student Form Component for Add and Update
function StudentForm({ addStudent, updateStudent, studentToEdit }) {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    school: '',
    yearlevel: ''
  });

  React.useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentToEdit) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
    setStudent({ name: '', age: '', school: '', yearlevel: '' });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Student Name"
        required
      />
      <input
        type="number"
        name="age"
        value={student.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        type="text"
        name="school"
        value={student.school}
        onChange={handleChange}
        placeholder="School"
        required
        />
      <input
        type="text"
        name="yearlevel"
        value={student.yearlevel}
        onChange={handleChange}
        placeholder="Yearlevel"
        required
      />
      <button type="submit">{studentToEdit ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
}

// Student List Component
function StudentList({ students, deleteStudent, editStudent }) {
  return (
    <div className="student-list">
      {students.map((student) => (
        <div key={student.name} className="student-item">
          <div>{student.name}</div>
          <div>{student.age}</div>
          <div>{student.school}</div>
          <div>{student.yearlevel}</div>
          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.name === updatedStudent.name ? updatedStudent : student
      )
    );
    setStudentToEdit(null);
  };

  const deleteStudent = (name) => {
    setStudents(students.filter((student) => student.name !== name));
  };

  const editStudent = (student) => {
    setStudentToEdit(student);
  };

  return (
    <div className="app">
      <h1>Student CRUD Application</h1>
      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        studentToEdit={studentToEdit}
      />
      <StudentList students={students} deleteStudent={deleteStudent} editStudent={editStudent} />
    </div>
  );
}

export default App;

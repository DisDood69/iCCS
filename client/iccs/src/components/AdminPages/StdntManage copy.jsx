import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import ProtectedRoute from './HOC.jsx';
import { useNavigate } from 'react-router-dom';


function StdntManagement() {
  const [logs, setLogs] = useState([]);
  const [showView , setShowView] = useState(false);
  const [viewStudentData, setViewStudentData] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('student_number');
  const [showAdd, setShowAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    student_number: '',
    student_name: '',
    year: '',
    course: '',
    section: ''
  });

  const columns = [
    { key: 'student_number', label: 'Student Number' },
    { key: 'student_name', label: 'Name' },
    { key: 'year', label: 'Year' },
    { key: 'course', label: 'Course' },
    { key: 'section', label: 'Section' },
  ];

  useEffect(() => {
    fetchStudents();
  }, [sortColumn, sortOrder]);

  const fetchStudents = () => {
    axios
    .get(`http://localhost:5000/sortstudent?column=${sortColumn}&order=${sortOrder}`, { withCredentials: true })
    .then(res => setLogs(res.data))
    .catch(err => console.error(err));
  };

//On submit of the form, it will send a post request to the server
 const addStudent = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/add_student', studentInfo, { withCredentials: true })
      .then((res) => {
        console.log(res)
        fetchStudents();
        setShowAdd(false);
        setStudentInfo({
          student_number: '',
          student_name: '',
          year: '',
          course: '',
          section: ''
        });
      })
      .catch((err) => {

        if (err.response && err.response.data && err.response.data.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {  
        alert("An unexpected error occurred.");
      }
        console.error(err);
      });
    };
  
  const sortDirection = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    fetchStudents();
  }
  
  const deleteStudent = (student_number) => {
    axios.delete(`http://localhost:5000/studentdelete/${student_number}`, { withCredentials: true })
    .then(() => {
      fetchStudents();
    })
    .catch(err => console.error(err));
  }

  const viewStudent = (student) => {
    setViewStudentData(student);
    setShowView(true);
  }

  const handleEditClick = (student) => {
    setEditStudent(student);
    setShow(true);
  };

  const handleEditChange = (e) => {
    setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    console.log("editStudent:", editStudent);
    axios.put(`http://localhost:5000/studentedit/${editStudent.student_number}`, editStudent, { withCredentials: true })
      .then(() => {
        setShow(false);
        fetchStudents();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      
      <h1>Student Info</h1>
      <Button variant="primary" onClick={() => setShowAdd(true)}>Add Student</Button>
      <Button variant="secondary" onClick={() => sortDirection()}>
       Sort {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
      <DropdownButton
        id="dropdown-sort-column"
        title={`Sort by: ${columns.find(col => col.key === sortColumn)?.label || 'Select Column'}`}
        variant="secondary"
      >
        {columns.map(col => (
          <Dropdown.Item
            key={col.key}
            onClick={() => {
              setSortColumn(col.key);
              fetchStudents();
            }}
          >
            {col.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <table>
        <thead>
          <tr>
            {logs[0] && Object.keys(logs[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              {Object.values(log).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
              <td>
                <Button variant="primary" onClick={() => viewStudent(log)}>View</Button>
              </td>

              <td>
                <Button variant="primary" onClick={() => handleEditClick(log)}>Edit</Button>
              </td>

              <td>
                <Button variant="danger" onClick={() => deleteStudent(log.student_number)}>Delete</Button>
              </td>

              
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back</Button>

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-student-form" onSubmit={addStudent}>
            <Form.Group>
              <Form.Label>Student Number</Form.Label>
              <Form.Control name="student_number" value={studentInfo.student_number} onChange={(e) => setStudentInfo({ ...studentInfo, student_number: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="student_name" value={studentInfo.student_name} onChange={(e) => setStudentInfo({ ...studentInfo, student_name: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control name="year" value={studentInfo.year} onChange={(e) => setStudentInfo({ ...studentInfo, year: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control name="course" value={studentInfo.course} onChange={(e) => setStudentInfo({ ...studentInfo, course: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Section</Form.Label>
              <Form.Control name="section" value={studentInfo.section} onChange={(e) => setStudentInfo({ ...studentInfo, section: e.target.value })} />
            </Form.Group>
            
          </Form>
 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Close</Button>
          <Button variant="primary" type="submit" form="add-student-form">Add Student</Button>
        </Modal.Footer>
      </Modal>
        
      
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {viewStudentData && (
          <div>
            <p><strong>Name:</strong> {viewStudentData.student_name}</p>
            <p><strong>Year:</strong> {viewStudentData.year}</p>
            <p><strong>Course:</strong> {viewStudentData.course}</p>
            <p><strong>Section:</strong> {viewStudentData.section}</p>
          </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editStudent && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="student_name" value={editStudent.student_name} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control name="year" value={editStudent.year} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control name="course" value={editStudent.course} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Control name="section" value={editStudent.section} onChange={handleEditChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProtectedRoute(StdntManagement);
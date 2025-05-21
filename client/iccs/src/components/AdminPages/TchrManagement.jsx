import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import ProtectedRoute from './HOC.jsx';
import { useNavigate } from 'react-router-dom';

function TchrManagement() {
  const [logs, setLogs] = useState([]);
  const [show, setShow] = useState(false);
  const [showView , setShowView] = useState(false);
  const [viewTeacherData, setViewTeacherData] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('teacher_id');
  const navigate = useNavigate();
  const [newTeacher, setNewTeacher] = useState({
    teacher_id: "",
    teacher_name: "",
    subjects: [] 
  });

  const columns = [
    { key: 'teacher_id', label: 'Teacher ID' },
    { key: 'teacher_name', label: 'Name' },
    
  ]

  // Fetch teacher information
  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = () => {
    axios
    .get(`http://localhost:5000/sortteacher?column=${sortColumn}&order=${sortOrder}`, { withCredentials: true })
    .then(res => setLogs(res.data))
    .catch(err => console.error(err));
  };
  const sortDirection = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    fetchTeacher();
  }

  // Fetch  subjects
  useEffect(() => {
    axios
      .get('http://localhost:5000/subjectinfo', { withCredentials: true })
      .then(res => setAllSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteTeacher = (teacher_id) => {
    axios
      .delete(`http://localhost:5000/teacherdelete/${teacher_id}`, { withCredentials: true })
      .then(() => {
        fetchTeacher();
      })
      .catch(err => console.error(err));
  }
  const handleEditClick = (teacher) => {

    // Convert to array of objects
    const subjectsArray = teacher.subjects
      ? teacher.subjects.split('\n').map(subject => {
          const [subject_code, subject_name] = subject.split(' - ');
          return { subject_code, subject_name };
        })
      : [];
    setEditTeacher({
      ...teacher,
      subjects: subjectsArray,
    });
    setShow(true);
  };

  const handleEditChange = (e) => {
    setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const payload = {
      teacher_name: editTeacher.teacher_name,
      subjects: editTeacher.subjects.map(s => s.subject_code) 
    };

    axios
      .put(`http://localhost:5000/teacheredit/${editTeacher.teacher_id}`, payload, { withCredentials: true })
      .then(() => {
        setShow(false);
        fetchTeacher();
      })
      .catch(err => console.error(err));
  };

  const teachers = logs;

  const showTeacher = (teacher) => {
    setViewTeacherData(teacher);
    setShowView(true);
  };


  const handleNewTeacherChange = (e) => {
  const { name, value } = e.target;
  setNewTeacher({ ...newTeacher, [name]: value });
  };

  const toggleCheckbox = (subjects, subject_code) => {
    
  const alreadySelected = subjects.includes(subject_code);
  return alreadySelected
    ? subjects.filter(code => code !== subject_code)
    : [...subjects, subject_code];
  };

  const handleSubjectSelect = (subject_code) => {
  setNewTeacher({ ...newTeacher, subjects: toggleCheckbox(newTeacher.subjects, subject_code) });
  };
// add the teacher
  const handleAddTeacher = () => {

  const teacherinfo = {
    teacher_id: newTeacher.teacher_id,
    teacher_name: newTeacher.teacher_name,
    subjects_code: newTeacher.subjects 
  };

  axios
    .post("http://localhost:5000/add_teacher", teacherinfo, { withCredentials: true })
    .then(() => {
  
      setNewTeacher({ teacher_id: "", teacher_name: "", subjects: [] }); 
      fetchTeacher(); 
    })
    .catch(err => console.error(err));
};

  return (
    <div>
      <h1>Teacher Info</h1>
      <Button variant="primary" onClick={() => setShowAdd(true)}>Add Teacher</Button>
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
              fetchTeacher();
            }}
          >
            {col.label}
          </Dropdown.Item>
              ))}
      </DropdownButton>

      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Teacher Name</th>
            <th>Subjects</th>
        
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, idx) => (
            <tr key={teacher.teacher_id}>
              <td>{teacher.teacher_id}</td>
              <td>{teacher.teacher_name}</td>
              <td style={{ whiteSpace: 'pre-line' }}>{teacher.subjects}</td>
              <td>
                <Button variant="primary" onClick={() => showTeacher(teacher)}>View</Button>
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(teacher)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteTeacher(teacher.teacher_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back</Button>
      
      {/* THIS IS FOR ADDING TEACHERS GUYS*/}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-teacher-form" onSubmit={handleAddTeacher}>
            <Form.Group>
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control
                name="teacher_id"
                value={newTeacher.teacher_id}
                onChange={handleNewTeacherChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Teacher Name </Form.Label>
              <Form.Control
                name="teacher_name"
                value={newTeacher.teacher_name}
                onChange={handleNewTeacherChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Subjects</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-subjects">
                  {newTeacher.subjects.length > 0
                    ? newTeacher.subjects.join(", ")
                  : "Select subjects"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {allSubjects.map(sub => (
                    <Dropdown.Item
                      key={sub.subject_code}
                      as="button"
                      className="d-flex align-items-center"
                      onClick={e => {
                        e.preventDefault();
                        handleSubjectSelect(sub.subject_code);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={newTeacher.subjects.includes(sub.subject_code)}
                        readOnly
                        style={{ marginRight: 8 }}
                      />
                      {sub.subject_code} - {sub.subject_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Close</Button>
          <Button variant="primary" type="submit" form="add-teacher-form">Add Teacher</Button>
        </Modal.Footer>
      </Modal>

      {/* THIS IS FOR EDITING TEACHERS GUYS*/}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTeacher && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="teacher_name"
                  value={editTeacher.teacher_name}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Subjects</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-subjects">
                    {editTeacher.subjects.length > 0
                      ? editTeacher.subjects.map(s => s.subject_code).join(', ')
                      : "Select subjects"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ maxHeight: 200, overflowY: 'auto' }}>
                    {allSubjects.map(sub => (
                      <Dropdown.Item
                        key={sub.subject_code}
                        as="button"
                        className="d-flex align-items-center"
                        onClick={e => {
                          e.preventDefault();
                          const updatedSubjects = toggleCheckbox(
                            editTeacher.subjects.map(s => s.subject_code),
                            sub.subject_code
                          ).map(code => allSubjects.find(s => s.subject_code === code));
                          setEditTeacher({ ...editTeacher, subjects: updatedSubjects });
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={editTeacher.subjects.some(s => s.subject_code === sub.subject_code)}
                          readOnly
                          style={{ marginRight: 8 }}
                        />
                        {sub.subject_code} - {sub.subject_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* THIS IS FOR VIEWING TEACHERS GUYS*/}
          
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Teacher</Modal.Title>
        </Modal.Header>
          <Modal.Body>
             {viewTeacherData && (
              <div>
                <p><strong>Teacher ID:</strong> {viewTeacherData.teacher_id}</p>
                <p><strong>Teacher Name:</strong> {viewTeacherData.teacher_name}</p>
                <p><strong>Subjects Taught:</strong></p>
                {viewTeacherData.subjects.split('\n').map((subject, index) => (
                <p key={index}>{subject}</p>
                ))}
              </div>
            )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProtectedRoute(TchrManagement);
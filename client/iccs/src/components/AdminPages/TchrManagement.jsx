import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import ProtectedRoute from './HOC.jsx';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './Adminlayout.jsx';
import { ReactComponent as FilterIcon} from '../../images/filtericon.svg';
import { ReactComponent as HomeIcon} from '../../images/homeicon.svg';
import { ReactComponent as AddIcon} from '../../images/addicon.svg';
import { ReactComponent as BackIcon} from '../../images/backicon.svg';
import { ReactComponent as EditIcon} from '../../images/editicon.svg';
import { ReactComponent as ViewIcon} from '../../images/viewicon.svg';
import { ReactComponent as DelIcon} from '../../images/deleteicon.svg';
import { ReactComponent as AddSub} from '../../images/addsubject.svg';
import './tables.css';

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

  const [showSubjectModal, setShowSubjectModal] = useState(false); 
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false); 
  const [showViewSubjectModal, setShowViewSubjectModal] = useState(false); 

  const [newSubject, setNewSubject] = useState({
    subject_code: '',
    subject_name: ''
  });
  const [editSubject, setEditSubject] = useState(null); 
  const [viewSubjectData, setViewSubjectData] = useState(null); 


  const columns = [
    { key: 'teacher_id', label: 'Teacher ID' },
    { key: 'teacher_name', label: 'Name' },
  ];


  useEffect(() => {
    fetchTeacher();
  }, [sortColumn, sortOrder]);

  const fetchTeacher = () => {
    axios
    .get(`http://localhost:5000/sortteacher?column=${sortColumn}&order=${sortOrder}`, { withCredentials: true })
    .then(res => setLogs(res.data))
    .catch(err => console.error(err));
  };

  const sortDirection = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  
  const fetchAllSubjects = () => {
    axios
      .get('http://localhost:5000/subjectinfo', { withCredentials: true })
      .then(res => setAllSubjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllSubjects(); 
  }, []);

  const deleteTeacher = (teacher_id) => {
    axios
      .delete(`http://localhost:5000/teacherdelete/${teacher_id}`, { withCredentials: true })
      .then(() => {
        fetchTeacher();
      })
      .catch(err => console.error(err));
  };

  const handleEditClick = (teacher) => {
    const subjectsArray = teacher.subjects
      ? teacher.subjects.split('\n').map(subject => {
          const [subject_code, subject_name] = subject.split(' - ');
          return { subject_code, subject_name };
        })
      : [];
    setEditTeacher({
      ...teacher,
      original_teacher_id: teacher.teacher_id,
      subjects: subjectsArray,
    });
    setShow(true);
  };

  const handleEditChange = (e) => {
    setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const payload = {
      teacher_id: editTeacher.teacher_id,
      teacher_name: editTeacher.teacher_name,
      subjects: editTeacher.subjects.map(s => s.subject_code) 
    };

    axios
      .put(`http://localhost:5000/teacheredit/${editTeacher.original_teacher_id}`, payload, { withCredentials: true })
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

  const handleAddTeacher = (e) => {
    e.preventDefault();
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
        setShowAdd(false);
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error adding teacher: ${err.response.data.error}`);
        } else {
          alert("An unexpected error occurred while adding teacher.");
        }
      });
  };

  const goBack = () => {
    navigate(-1);
  };



  const handleOpenSubjectModal = () => {
    fetchAllSubjects(); 
    setShowSubjectModal(true);
  };

  const handleCloseSubjectModal = () => {
    setShowSubjectModal(false);
    setNewSubject({ subject_code: '', subject_name: '' }); 
    setEditSubject(null); 
    setViewSubjectData(null);
  };

  const handleAddSubjectClick = () => {
    setNewSubject({ subject_code: '', subject_name: '' }); 
    setShowAddSubjectModal(true);
  };

  const handleSaveNewSubject = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add_subject', newSubject, { withCredentials: true })
      .then(() => {
        fetchAllSubjects(); 
        setShowAddSubjectModal(false);
        setNewSubject({ subject_code: '', subject_name: '' }); 
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error adding subject: ${err.response.data.error}`);
        } else {
          alert("An unexpected error occurred while adding subject.");
        }
      });
  };

  const handleEditSubjectClick = (subject) => {
    console.log("Edit modal subject: ")
    setEditSubject({ ...subject, original_subject_code: subject.subject_code }); 
    setShowEditSubjectModal(true);
  };

  const handleEditSubjectChange = (e) => {
    setEditSubject({ ...editSubject, [e.target.name]: e.target.value });
  };

  const handleSaveEditedSubject = () => {
    axios.put(`http://localhost:5000/subjectedit/${editSubject.original_subject_code}`, editSubject, { withCredentials: true })
      .then(() => {
        console.log("Original: ", editSubject.original_subject_code);
        console.log("New: ", editSubject);
        fetchAllSubjects(); 
        setShowEditSubjectModal(false);
        setEditSubject(null); 
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error editing subject: ${err.response.data.error}`);
        } else {
          alert("An unexpected error occurred while editing subject.");
        }
      });
  };

  const handleDeleteSubject = (subject_code) => {
    if (window.confirm(`Are you sure you want to delete subject ${subject_code}?`)) { 
      axios.delete(`http://localhost:5000/subjectdelete/${subject_code}`, { withCredentials: true })
        .then(() => {
          fetchAllSubjects(); 
        })
        .catch(err => {
          console.error(err);
          if (err.response && err.response.data && err.response.data.error) {
            alert(`Error deleting subject: ${err.response.data.error}`);
          } else {
            alert("An unexpected error occurred while deleting subject.");
          }
        });
    }
  };

  const handleViewSubjectClick = (subject) => {
    setViewSubjectData(subject);
    setShowViewSubjectModal(true);
  };

  return (
    <AdminLayout title="Teacher Information">
      <div className='button-group'>
        <div className='essential-buttons'>
          <HomeIcon onClick={() => navigate('/dashboard')} style={{cursor:'pointer'}}></HomeIcon>
          <BackIcon onClick={goBack} style={{cursor:'pointer'}}></BackIcon>
          <AddIcon onClick={() => setShowAdd(true)} style={{cursor:'pointer'}}></AddIcon>
          <Button className="opensubject" onClick={handleOpenSubjectModal}>Manage Subjects</Button>
        </div>
        <div className='sort-buttons'>
          <Button className='sortupdown' onClick={() => sortDirection()}>  
             {sortOrder === "asc" ? " ↑↓" : " ↓↑"}
          </Button>
          <DropdownButton
            id="dropdown-sort-column"
            title={<FilterIcon></FilterIcon>}
            className='filterdrop'
          >
            {columns.map(col => (
              <Dropdown.Item
                key={col.key}
                active={sortColumn === col.key} 
                className={sortColumn === col.key ? "selected-filter" : ""}
                onClick={() => {
                  setSortColumn(col.key);
                  fetchTeacher();
                }}
              >
                {col.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>

      {/* TABLES */}
      <div className='table-container2'>
        <table className="tchr-title">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Teacher Name</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className='tchr-table-scroll'>
          <table className='tchr-table'>
            <tbody>
              {teachers.map((teacher, idx) => (
                <tr key={teacher.teacher_id}>
                  <td>{teacher.teacher_id}</td>
                  <td>{teacher.teacher_name}</td>
                  <td style={{ whiteSpace: 'pre-line' }}>{teacher.subjects}</td>
                  <td>
                    <div className='config-buttons'> 
                      <ViewIcon className='config-button'onClick={() => showTeacher(teacher)}></ViewIcon>
                      <EditIcon className='config-button' onClick={() => handleEditClick(teacher)}></EditIcon>
                      <DelIcon className='config-button' onClick={() => deleteTeacher(teacher.teacher_id)}></DelIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {/* ADD TEACHER MODAL */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} backdrop="static">
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

      {/* EDIT TEACHER MODAL */}
      <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTeacher && (
            <Form>
              <Form.Group>
                <Form.Label>Teacher ID</Form.Label>
                <Form.Control
                  name="teacher_id"
                  value={editTeacher.teacher_id}
                  onChange={handleEditChange}
                />
              </Form.Group>
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

      {/* VIEW TEACHER MODAL */}
      <Modal show={showView} onHide={() => setShowView(false)} backdrop="static">
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

      {/* SUBJECT MODAL */}
      <Modal show={showSubjectModal} onHide={handleCloseSubjectModal} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Manage Subjects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end mb-3">
            <AddSub style={{cursor:'pointer'}} onClick={handleAddSubjectClick}></AddSub>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allSubjects.map(subject => (
                  <tr key={subject.subject_code}>
                    <td>{subject.subject_code}</td>
                    <td>{subject.subject_name}</td>
                    <td>
                      <ViewIcon onClick={() => handleViewSubjectClick(subject)}></ViewIcon>
                      <EditIcon  onClick={() => handleEditSubjectClick(subject)}></EditIcon>
                      <DelIcon onClick={() => handleDeleteSubject(subject.subject_code)}></DelIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSubjectModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* ADD SUBJECT */}
      <Modal show={showAddSubjectModal} onHide={() => setShowAddSubjectModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveNewSubject}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Code</Form.Label>
              <Form.Control
                type="text"
                name="subject_code"
                value={newSubject.subject_code}
                onChange={(e) => setNewSubject({ ...newSubject, subject_code: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                name="subject_name"
                value={newSubject.subject_name}
                onChange={(e) => setNewSubject({ ...newSubject, subject_name: e.target.value })}
                required
              />
            </Form.Group>
            <Button className='save-button' type="submit">Add Subject</Button>
            <Button variant="secondary" className="ms-2" onClick={() => setShowAddSubjectModal(false)}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* EDIT SUBJECT  */}
      <Modal show={showEditSubjectModal} onHide={() => setShowEditSubjectModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSubject && (
            <Form onSubmit={handleSaveEditedSubject}>
              <Form.Group className="mb-3">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_code"
                  value={editSubject.subject_code}
                  onChange={handleEditSubjectChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_name"
                  value={editSubject.subject_name}
                  onChange={handleEditSubjectChange}
                  required
                />
              </Form.Group>
              <Button className='save-button' type="submit">Save Changes</Button>
              <Button variant="secondary" className="ms-2" onClick={() => setShowEditSubjectModal(false)}>Cancel</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* VIEW SUBJECT */}
      <Modal show={showViewSubjectModal} onHide={() => setShowViewSubjectModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewSubjectData && (
            <div>
              <p><strong>Subject Code:</strong> {viewSubjectData.subject_code}</p>
              <p><strong>Subject Name:</strong> {viewSubjectData.subject_name}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewSubjectModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </AdminLayout>
  );
}

export default ProtectedRoute(TchrManagement);

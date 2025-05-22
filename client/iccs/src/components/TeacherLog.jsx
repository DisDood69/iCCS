import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SuccesIcon } from '../images/succes.svg';
import { ReactComponent as ErrorIcon } from '../images/error.svg';
import { ReactComponent as Logo } from '../images/iccsicon.svg';
import { ReactComponent as BackIcon } from '../images/backicon.svg';
import design from '../images/teacherpic.jpg';
import './TeacherLog.css';

function TeacherLog() {
  const [allSubjects, setAllSubjects] = useState([]);
  const navigate = useNavigate();
  const [teachinfo, setTeachinfo] = useState({
    teacher_id: '',
    subject_code: null,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAllSubjects = () => {
    axios
      .get('http://localhost:5000/subjectlist', { withCredentials: true })
      .then(res => setAllSubjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  const confirmSuccess = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const subjectOptions = allSubjects.map(sub => ({
    value: sub.subject_code,
    label: `${sub.subject_code} - ${sub.subject_name}`
  }));

  const selectedSubjectOption = subjectOptions.find(
    option => option.value === teachinfo.subject_code
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/teacher_log', teachinfo)
      .then((res) => {
        console.log(res);
        setTeachinfo({
          teacher_id: '',
          subject_code: null,
        });
        setShowSuccessModal(true);
      })
      .catch((err) => {
        console.error(err);
        let msg = "An unexpected error occurred.";
        if (err.response && err.response.data && err.response.data.error) {
          msg = `Error: ${err.response.data.error}`;
        }
        setErrorMessage(msg);
        setShowErrorModal(true);
      });
  };

  return (
    <div className='teacherlog-container'>

      <div className="Tchrlog-container">
        <div className='logo-container'>
          <div className='logo-iccs'>
            <Logo></Logo>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className='label'>Teacher ID</Form.Label>
            <Form.Control
              placeholder="Enter teacher ID"
              value={teachinfo.teacher_id}
              className='field'
              onChange={(e) => setTeachinfo({ ...teachinfo, teacher_id: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className='label'>Subject Code</Form.Label>
            <Select
              options={subjectOptions}
              value={selectedSubjectOption}
              onChange={(selected) => setTeachinfo({ ...teachinfo, subject_code: selected ? selected.value : null })}
              placeholder="Type or select a subject"
              isClearable={true}
             
            />
          </Form.Group>

          <div className='save-button'>
            <Button type='submit' className='submit-button'>
              SAVE DETAILS
            </Button>

            <div className='back'>
          <Button onClick={() => navigate('/')} className='back-button'>
            <BackIcon className='back-icon'></BackIcon>
            <h3>GO HOME</h3>
          </Button>
        </div>
          </div>
        </Form>

        

      </div>
      <div className='design-container'>

        <div className='image-container'>
          <h1>Teacher Login</h1>
          <img src={design} className='image' stle={{height:'626px'}}></img>
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SuccesIcon></SuccesIcon>
          Teacher log saved successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => confirmSuccess()}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorIcon></ErrorIcon>
          {errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeacherLog;
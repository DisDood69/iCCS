import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button, Modal } from 'react-bootstrap'; // Import Modal
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as SuccesIcon} from '../images/succes.svg';
import {ReactComponent as ErrorIcon} from '../images/error.svg';
import {ReactComponent as Logo} from '../images/iccsicon.svg';
import { ReactComponent as BackIcon} from '../images/backicon.svg';
import design from '../images/Education.jpg';
import './StudentLog.css';


function StudentLog() {
  const [allSubjects, setAllSubjects] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    student_num: '',
    subject_code: null,
    unit_num: '',
  });

  // New states for confirmation and error modals
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
  }

  const subjectOptions = allSubjects.map(sub => ({
    value: sub.subject_code,
    label: `${sub.subject_code} - ${sub.subject_name}`
  }));

  const selectedSubjectOption = subjectOptions.find(
    option => option.value === values.subject_code
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/student_log', values)
      .then((res) => {
        console.log(res);
        setValues({
          student_num: '',
          subject_code: null,
          unit_num: '',
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
    <div className='studentlog-container'>
      
    <div className="Stdlog-container">
      <div className='logo-container'>
      <div className='logo-iccs'>
        <Logo ></Logo>
      </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className='label'>Student Number</Form.Label>
          <Form.Control
            placeholder="Enter student number"
            value={values.student_num}
            className='field'
            onChange={(e) => setValues({ ...values, student_num: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='label'>Subject Code</Form.Label>
          <Select

            options={subjectOptions}
            value={selectedSubjectOption}
            onChange={(selected) => setValues({ ...values, subject_code: selected ? selected.value : null })}
            placeholder="Type or select a subject"
            isClearable={true}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='label'>Unit Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter unit number"
            className='field'
            value={values.unit_num}
            onChange={(e) => setValues({ ...values, unit_num: e.target.value })}
          />
        </Form.Group>
    <div className='save-button1'>
        <Button className='submit-button' type="submit" variant="success">
          SAVE DETAILS
        </Button>
        <div className='back'>
          <Button onClick= {() => navigate('/')}className='back-button'>
          <BackIcon className='back-icon'></BackIcon>
          <h3>GO HOME</h3>
        </Button>
      
    </div>
    
    </div>
      </Form>
    
    </div>
    <div className='design-container'>
        
        <div className='image-container'> 
          <h1>Student Login</h1>
          <img src={design}></img>
        </div>
    </div>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SuccesIcon></SuccesIcon>
          Student log saved successfully.
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

export default StudentLog;

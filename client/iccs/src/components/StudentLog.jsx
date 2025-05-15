import React, { useState } from 'react';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLog() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    student_num: '',
    subject_code: '',
    unit_num: '',
  });

  const subjectOptions = [
    { value: 'IMGT211', label: 'IMGT 211' },
    { value: 'INPR111', label: 'INPR 111' },
    { value: 'LFAD211', label: 'LFAD 211' },
    { value: 'WEBDEV111', label: 'WEBDEV 111' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/student_log', values)
      .then((res) => console.log(res))
      .catch((err) => {

        if (err.response && err.response.data && err.response.data.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {  
        alert("An unexpected error occurred.");
      }
        console.error(err);
      });
    };
  

  return (
    <>
      <Button variant="dark" onClick={() => navigate('/')} style={{ marginBottom: '30px' }}>
        HOME
      </Button>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter student number"
            onChange={(e) => setValues({ ...values, student_num: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject Code</Form.Label>
          <Select
            options={subjectOptions}
            onChange={(selected) => setValues({ ...values, subject_code: selected.value })}
            placeholder="Type or select a subject"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Unit Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter unit number"
            onChange={(e) => setValues({ ...values, unit_num: e.target.value })}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          SAVE DETAILS
        </Button>
      </Form>
    </>
  );
}

export default StudentLog;

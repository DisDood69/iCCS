import React, { useState } from 'react';
import Select from 'react-select';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function TeacherLog() {

   const subjectOptions = [
    { value: 'IMGT211', label: 'IMGT 211' },
    { value: 'INPR111', label: 'INPR 111' },
    { value: 'LFAD211', label: 'LFAD 211' },
    { value: 'WBDV111', label: 'WBDV 112' },
  ];
   
  const navigate = useNavigate();
  const [teachinfo, setTeachinfo] = useState({
    teacher_id: '',
    subject_code:'',
  })

  const goHome = () => {
    navigate('/')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/teacher_log', teachinfo)
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
      <Button variant='dark' onClick={goHome}>HOME</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="InsertName">
        <Form.Label>Teacher Number</Form.Label>
        <Form.Control type="text" placeholder="id" onChange={(e) => setTeachinfo({...teachinfo, teacher_id: e.target.value})}/>
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Subject Code</Form.Label>
          <Select
            options={subjectOptions}
            onChange={(selected) => setTeachinfo({ ...teachinfo, subject_code: selected.value })}
            placeholder="Type or select a subject"
          />
        </Form.Group>

        <Button type='submit' className='btn btn-success'>SAVE DETAILS</Button>
      </Form>
      
    </>

  );
}

export default TeacherLog;
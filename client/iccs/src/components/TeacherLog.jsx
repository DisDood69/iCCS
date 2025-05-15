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
    { value: 'WEBDEV111', label: 'WEBDEV 111' },
  ];
   
  const navigate = useNavigate();
  const [values, setValues] = useState({
    teacher_id: '',
    subject_code:'',
  })

  const goHome = () => {
    navigate('/')
  }


  function handleSubmit (e){
    e.preventDefault()
    axios.post("http://localhost:5000/teacher_log", values)
    .then((res) =>{
      console.log(res)
    }).catch((err) => console.log(err))
    }
  


  return (
    <>
      <Button variant='dark' onClick={goHome}>HOME</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="InsertName">
        <Form.Label>Teacher Number</Form.Label>
        <Form.Control type="text" placeholder="id" onChange={(e) => setValues({...values, id: e.target.value})}/>
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Subject Code</Form.Label>
          <Select
            options={subjectOptions}
            onChange={(selected) => setValues({ ...values, subject_code: selected.value })}
            placeholder="Type or select a subject"
          />
        </Form.Group>

        <Button type='submit' className='btn btn-success'>SAVE DETAILS</Button>
      </Form>
      
    </>

  );
}

export default TeacherLog;
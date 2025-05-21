import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Adminlogin() {


  const navigate = useNavigate();
  const [admininfo, setAdminInfo] = React.useState({
    username: '',
    password: '',
  })


    const handleSubmit = (e) => {
    
    e.preventDefault();
    axios
      .post('http://localhost:5000/admin_login', admininfo, {withCredentials:true})
      .then((res) => navigate('/dashboard'))
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
    <div>
       <Button variant="dark" onClick={() => navigate('/')} style={{ marginBottom: '30px' }}>
        HOME
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setAdminInfo({ ...admininfo, username: e.target.value })}
          />
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setAdminInfo({ ...admininfo, password: e.target.value })}
            placeholder="Enter password"
          />
        </Form.Group>

        <Button type="submit" variant="success">
          SAVE DETAILS
        </Button>
      </Form>
    </div>
  )
}

export default Adminlogin

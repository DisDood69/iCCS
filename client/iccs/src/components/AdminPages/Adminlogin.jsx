import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/iccsicon.svg'; 
import { ReactComponent as HomeIcon} from '../../images/homeicon.svg';
import { ReactComponent as ErrorIcon } from '../../images/error.svg';
import './Adminlogin.css'; 

function Adminlogin() {
  const navigate = useNavigate();
  const [admininfo, setAdminInfo] = React.useState({
    username: '',
    password: '',
  });

   const [showErrorModal, setShowErrorModal] = React.useState(false); 
  const [errorMessage, setErrorMessage] = React.useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/admin_login', admininfo, { withCredentials: true })
      .then((res) => navigate('/dashboard'))
      .catch((err) => {
        let msg = "An unexpected error occurred.";
        if (err.response && err.response.data && err.response.data.error) {
          msg = `Error: ${err.response.data.error}`;
        }
        setErrorMessage(msg);
        setShowErrorModal(true);
        console.error(err);
      });
  };

  return (
  <div className='admin-login'>
    
    <div className='admin-login-container'>
      <div className='logo-container1'>
        <div className='logo-iccs1'>
          <Logo></Logo>
          
        </div>
        <h6 className='admin-title'> Administrator Log In </h6>
      </div>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group className="mb-3">
          <Form.Label className='form-label1'>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className='field'
            onChange={(e) => setAdminInfo({ ...admininfo, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='form-label1'>Password</Form.Label>
          <Form.Control
            type="password"
            className='field'
            onChange={(e) => setAdminInfo({ ...admininfo, password: e.target.value })}
            placeholder="Enter password"
          />
        </Form.Group>

        <Button type="submit" className='submit-button'>
          LOGIN
        </Button>
      </Form>
      <HomeIcon onClick={() => navigate('/')} className='home-button'></HomeIcon>
    </div>

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

export default Adminlogin;
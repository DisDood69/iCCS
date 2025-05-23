import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Home.css';
import { ReactComponent as Logo2 } from '../images/iccsicon2.svg';
import {ReactComponent as UserIcon} from '../images/usericon.svg';

function Home() {
  const navigate = useNavigate();

  const gotoStudentLog = () => {
    navigate('/studentlog');
  };

  const gotoTeacherLog = () => {
    navigate('/teacherlog');
  };

  return (
    <div className='home-container'>
      <div className='home-button-container'>
        <Logo2 className='home-logo'></Logo2>
      </div>
      <h2 className='title'> iCCS: A Computer Laboratory Management System</h2>

    <div className='button container'>
    
      <Button className="adminnav"  onClick={() => navigate('/adminlogin')}>
        <UserIcon className='usericon' style={{width:'40px'}}></UserIcon>
        Administrator
      </Button>
      <div className='cards'>
        <Button className='choice-button' onClick={gotoStudentLog}>
          Student
        </Button>
        <Button className='choice-button' onClick={gotoTeacherLog}>
          Teacher
        </Button>
      </div>
      </div>
    </div>
  );
}

export default Home;
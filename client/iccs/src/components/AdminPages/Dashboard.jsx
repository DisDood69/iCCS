import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { ReactComponent as StudentIcon } from '../../images/studenticon.svg';
import { ReactComponent as TeacherIcon } from '../../images/teachericon.svg';
import { ReactComponent as StudentLogIcon } from '../../images/slogicon.svg';
import { ReactComponent as TeacherLogIcon } from '../../images/tlogicon.svg';
import { useEffect } from 'react';
import ProtectedRoute from './HOC.jsx';


function Dashboard() {

 

    const navigate = useNavigate();
    const gotoStudentTracking = () => {
        navigate('/dashboard/studentlogs')
    }
    const logOut = () => {
      axios.post('http://localhost:5000/admin_logout', {}, {withCredentials:true})
      .then(() => navigate('/'));
    }
    const gotoTeacherTracking = () => {
        navigate('/dashboard/teacherlogs')
    }

    const gotoTeacherInfo = () => {
        navigate('/dashboard/teachermanagement')
    }

    const gotoStudentInfo = () => {
        navigate('/dashboard/studentmanagement')
    }

    return(
        <>
        
        

        <div className='dashboard'>
          <div className = 'sidebar'>
            <h1 className='logo'>Dashboard</h1>
            <div className = 'sidebar-items'>
                <span onClick={gotoStudentInfo}> 
                  <StudentIcon className='sidebar-icon'/>
                  <p>Students</p> 
                </span>
                <span onClick={gotoTeacherInfo}> 
                  <TeacherIcon className='sidebar-icon'/>
                  <p>Teachers</p> 
                </span>
                <span onClick={gotoStudentTracking}>
                  <StudentLogIcon className='sidebar-icon'/>
                  <p>Student Logs</p> 
                </span>
                <span onClick={gotoTeacherTracking}> 
                  <TeacherLogIcon className='sidebar-icon'/> 
                  <p>Teacher Logs</p> 
                </span> 
            </div>
          </div> 

           <header className="dashboard-header">
            <h1>Hello, Administrator!</h1>
            <Button className="logout" onClick={logOut}> Log Out </Button>
          </header>





        </div>
         
        </>
       ) 
}export default ProtectedRoute(Dashboard);
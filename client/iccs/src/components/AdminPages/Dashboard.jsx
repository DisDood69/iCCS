import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { ReactComponent as StudentIcon } from '../../images/studenticon.svg';
import { ReactComponent as TeacherIcon } from '../../images/teachericon.svg';
import { ReactComponent as StudentLogIcon } from '../../images/slogicon.svg';
import { ReactComponent as TeacherLogIcon } from '../../images/tlogicon.svg';
import {ReactComponent as UserIcon} from '../../images/usericon.svg';
import { useEffect,useState } from 'react';
import ProtectedRoute from './HOC.jsx';


function Dashboard() {
    const [metrics, setMetrics] = useState({
    teachersLoggedIn: 0,
    studentsLoggedIn: 0,
    totalTeachers: 0,
    totalStudents: 0
    });
    //For showing the metrics
    useEffect(() => {
    axios.get('http://localhost:5000/dashboard/metrics', { withCredentials: true })
      .then((res) => {
        setMetrics(res.data);
      })
      .catch((err) => {
        console.error('Error fetching metrics:', err);
      });
    }, []);

    //Navigation stuff
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

                <Button className="logout" onClick={logOut}> Log Out </Button> 
       
            </div>
          </div>

          <div className='dashboard-body'>
           <header className="dashboard-header">
            <h1 className='greetings'>Hello, Administrator!</h1>
            <div className='user'>
              <UserIcon className='usericon'></UserIcon>
              <h3 className='username'> admin1 </h3>
            </div>
           </header>

            <div className='metrics'>
              <div className="metric-card">
                <div className="metric-header">
                  <h4>Total Students</h4>
                </div>
                <div className="metric-value">{metrics.totalStudents}</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <h4>Total Teachers</h4>
                </div>
                <div className="metric-value">{metrics.totalTeachers}</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <h4>Recent Students</h4>
                </div>
                <div className="metric-value">{metrics.studentsLoggedIn}</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <h4>Recent Teachers</h4>
                </div>
                <div className="metric-value">{metrics.teachersLoggedIn}</div>
              </div>
            </div>

            <div className='recentlogs'>

            </div>

          </div>
        </div>
         
        </>
       ) 
}export default ProtectedRoute(Dashboard);
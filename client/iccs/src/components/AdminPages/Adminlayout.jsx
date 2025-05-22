
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Dashboard.css'; 
import { ReactComponent as StudentIcon } from '../../images/studenticon.svg';
import { ReactComponent as TeacherIcon } from '../../images/teachericon.svg';
import { ReactComponent as StudentLogIcon } from '../../images/slogicon.svg';
import { ReactComponent as TeacherLogIcon } from '../../images/tlogicon.svg';
import {ReactComponent as UserIcon} from '../../images/usericon.svg';
import {ReactComponent as Logoout} from '../../images/logout.svg';
import {ReactComponent as Logo} from '../../images/iccsiconwhite.svg';
import axios from 'axios';


const AdminLayout = ({ children, title }) => {
    const navigate = useNavigate();
    const goDashboard = () => navigate('/dashboard');
    const gotoStudentTracking = () => navigate('/dashboard/studentlogs');
    const gotoTeacherTracking = () => navigate('/dashboard/teacherlogs');
    const gotoTeacherInfo = () => navigate('/dashboard/teachermanagement');
    const gotoStudentInfo = () => navigate('/dashboard/studentmanagement');
    const logOut = () => {
        axios.post('http://localhost:5000/admin_logout', {}, { withCredentials: true })
            .then(() => navigate('/'));
    };

    const [userName, setUserName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/admin_username', { withCredentials: true })
            .then((res) => {
                setUserName(res.data.username);
            })
            .catch((err) => {
                console.error("Error fetching admin username:", err);
            });
    }, []);

    return (
        <div className="dashboard">
           
            <div className="sidebar">
                    <Logo className='logo' onClick={goDashboard}></Logo>
                <div className="sidebar-items">
                    <span onClick={gotoStudentInfo}>
                        <StudentIcon className="sidebar-icon" />
                        <p>Students</p>
                    </span>
                    <span onClick={gotoTeacherInfo}>
                        <TeacherIcon className="sidebar-icon" />
                        <p>Teachers</p>
                    </span>
                    <span onClick={gotoStudentTracking}>
                        <StudentLogIcon className="sidebar-icon" />
                        <p>Student Logs</p>
                    </span>
                    <span onClick={gotoTeacherTracking}>
                        <TeacherLogIcon className="sidebar-icon" />
                        <p>Teacher Logs</p>
                    </span>
                    <div className="logout" onClick={logOut}>
                        <Logoout></Logoout>
                        <h5>Log Out</h5>
                    </div>
                    
                </div>
            </div> 
            <div className='main-content'>
            <header className="dashboard-header">
                    <h1 className='greetings'>{title}</h1>
                    <div className='user'>
                    <UserIcon className='usericon'></UserIcon>
                    <h3 className='username'> {userName} </h3>
                    </div>
                </header>
            <div className='dashboard-body'>
                
                    {children}
            </div>
            </div>
          
        </div>
    );
};

export default AdminLayout;
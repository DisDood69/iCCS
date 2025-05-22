import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { useEffect,useState } from 'react';
import ProtectedRoute from './HOC.jsx';
import AdminLayout from './Adminlayout.jsx'


function Dashboard() {
    const [recentStudentLogs, setRecentStudentLogs] = useState([]);
    const [recentTeacherLogs, setRecentTeacherLogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/recentstudentlogs', { withCredentials: true })
            .then((res) => {
                setRecentStudentLogs(res.data);
            })
            .catch((err) => {
                console.error('Error fetching recent student logs:', err);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/recentteacherlogs', { withCredentials: true })
            .then((res) => {
                setRecentTeacherLogs(res.data);
            })
            .catch((err) => {
                console.error('Error fetching recent teacher logs:', err);
            });
    }, []);

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

    return(
        <>
  
          <AdminLayout title={`Hello, ${userName}!`}>         
            <div className='metrics'>
              <div className="metric-card">
                <div className='metric-field'>
                  <div className='design_line'> </div>
                  <div className="metric-header">
                    <h4>Total Students</h4>
                    <div className="metric-value">{metrics.totalStudents}</div>
                  </div>
                  
                  </div>
              </div>

              <div className="metric-card">
                <div className='metric-field'>
                <div className='design_line'> </div>
                <div className="metric-header">
                  <h4>Total Teachers</h4>
                  <div className="metric-value">{metrics.totalTeachers}</div>
                </div>
                
                </div>
              </div>

              <div className="metric-card">
                <div className='metric-field'>
                  <div className='design_line'> </div>
                  <div className="metric-header">
                    <h4>Recent Students</h4>
                    <div className="metric-value">
                      <h1>{metrics.studentsLoggedIn}</h1>
                      <p>Last <br></br>24 Hours</p>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div className="metric-card">
                <div className='metric-field'>
                  <div className='design_line'> </div>
                  <div className="metric-header">
                    <h4>Recent Teachers</h4>
                    <div className="metric-value">
                      <h1>{metrics.teachersLoggedIn}</h1>
                      <p>Last <br></br>24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='recentlogs'>
              <div className='recent-student'>
                <div className='table-container'>
                <h3 onClick={gotoStudentTracking}>Recent Student Logs</h3>
                <table className='student-table'>
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Student Number</th>
                            <th>Subject Code</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentStudentLogs.map((log) => (
                            <tr className='rows' onClick={gotoStudentTracking} key={log.log_id}>
                                <td>{log.log_id}</td>
                                <td>{log.student_number}</td>
                                <td>{log.subject_code}</td>
                                <td>{new Date(log.log_timestamp).toLocaleString()}</td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
                  </div>
              </div>

              <div className='recent-teacher'>
                <div className='table-container'>
                <h3 onClick={gotoTeacherTracking}>Recent Teacher Logs</h3>
                <table className='teacher-table'>
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Teacher ID</th>
                            <th>Subject Code</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTeacherLogs.map((log) => (
                            <tr className='rows' onClick={gotoTeacherTracking} key={log.log_id}>
                                <td>{log.log_id}</td>
                                <td>{log.teacher_id}</td>
                                <td>{log.subject_code}</td>
                                <td>{new Date(log.log_timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
              </div>
            </div>

      
          </AdminLayout>

         
        </>
       ) 
}export default ProtectedRoute(Dashboard);
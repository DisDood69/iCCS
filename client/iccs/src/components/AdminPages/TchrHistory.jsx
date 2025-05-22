import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProtectedRoute from './HOC.jsx';
import { Button, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './Adminlayout.jsx';
import { ReactComponent as FilterIcon} from '../../images/filtericon.svg';
import { ReactComponent as HomeIcon} from '../../images/homeicon.svg';
import { ReactComponent as BackIcon} from '../../images/backicon.svg';
import './tchrlog.css';

function TchrHistory() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortColumn, setSortColumn] = useState('log_timestamp');
  const [selectedLog, setSelectedLog] = useState(null);

  const columns = [
    { key: 'log_id', label: 'Log ID' },
    { key: 'teacher_id', label: 'Teacher ID' },
    { key: 'teacher_name', label: 'Name' },
    { key: 'subject_code', label: 'Subject' },
    { key: 'log_timestamp', label: 'Timestamp ' }

  ];

  useEffect(() => {
    fetchTeacherLog();
  }, [sortColumn, sortOrder]);

  const fetchTeacherLog = () => {
     axios
    .get(`http://localhost:5000/sortteacherlog?column=${sortColumn}&order=${sortOrder}`, { withCredentials: true })
    .then(res => setLogs(res.data))
    .catch(err => console.error(err));
  }
  const sortDirection = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    fetchTeacherLog();
  }

  const handleRowClick = (log) => {
    setSelectedLog(log); 
    setShow(true); 
  };

  const goBack = () => {
    navigate(-1);
  }

  
  
  return (
    <div>
      <AdminLayout title="Teacher Logs">     
      <div className='button-group'>
              <div className='essential-buttons'>
                <HomeIcon onClick={() => navigate('/dashboard')} style={{cursor:'pointer'}}></HomeIcon>
                <BackIcon onClick={goBack} style={{cursor:'pointer'}}></BackIcon>
              </div>
              <div className='sort-buttons'>
                <Button className='sortupdown' onClick={() => sortDirection()}>  
                   {sortOrder === "asc" ? " ↑↓" : " ↓↑"}
                </Button>
                <DropdownButton
                  id="dropdown-sort-column"
                  title={<FilterIcon></FilterIcon>}
                  className='filterdrop'
                >
                  {columns.map(col => (
                    <Dropdown.Item
                      key={col.key}
                      active={sortColumn === col.key} 
                      className={sortColumn === col.key ? "selected-filter" : ""}
                      onClick={() => {
                        setSortColumn(col.key);
                        fetchTeacherLog();
                      }}
                    >
                      {col.label}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </div>
        </div>
    <div className='table-container2'>
      <table className="tchlog-title">
        <thead>
          <tr>
              <th>Log ID</th>
              <th>Student Number</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Time</th>
             
          </tr>
          </thead>
        </table>
      <div className='tchlog-table-scroll'>
       <table className='tchlog-table'>
        <tbody>
          {logs.map((log, idx) => (
          typeof log === 'object' && log !== null ? ( 
          <tr key={idx} onClick={() => handleRowClick(log)} style={{ cursor: 'pointer' }}>
            {Object.entries(log).map(([key, val], i) => (
              <td key={i}>
                {key === 'log_timestamp' ? new Date(val).toLocaleString() : val}
              </td>
            ))}
          </tr>
            ) : null 
            ))}
        </tbody>
      </table>
      </div>
      </div>
      

       
                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Log Details</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                  {selectedLog ? (
                    <div>
                      {selectedLog && Object.entries(selectedLog).map(([key, value]) => (
                        <p key={key}>
                        <strong>{key}:</strong>{" "}
                        {key === 'log_timestamp'
                        ? new Date(value).toLocaleString()
                        : value}
                        </p>
                        ))}
                    </div>
                ) : (
                  <p>No data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </AdminLayout>
    </div>
  )
}

export default ProtectedRoute(TchrHistory);

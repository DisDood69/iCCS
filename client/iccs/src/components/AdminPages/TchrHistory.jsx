import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProtectedRoute from './HOC.jsx';
import { Button, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TchrHistory() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('log_id');
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
  
  return (
    <div>
      <h1>Teacher Logs</h1>
      <Button variant="secondary" onClick={() => sortDirection()}>
              Sort {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
      <DropdownButton
        id="dropdown-sort-column"
        title={`Sort by: ${columns.find(col => col.key === sortColumn)?.label || 'Select Column'}`}
        variant="secondary"
        >
        {columns.map(col => (
        <Dropdown.Item
          key={col.key}
          onClick={() => {
                    setSortColumn(col.key);
                    fetchTeacherLog();
                  }}
                >
                  {col.label}
                </Dropdown.Item>
              ))}
      </DropdownButton>
      <table>
        <thead>
          <tr>
            {logs[0] && Object.keys(logs[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody className='rows'>
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
       <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back</Button>

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
    </div>
  )
}

export default ProtectedRoute(TchrHistory);

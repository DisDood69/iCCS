import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import StudentLog from "./components/StudentLog.jsx"
import TeacherLog from "./components/TeacherLog.jsx"
import Home from "./components/Home.jsx"
import Adminlogin from './components/AdminPages/Adminlogin.jsx'
import Dashboard from './components/AdminPages/Dashboard.jsx'
import StudentManagement from './components/AdminPages/StdntManage.jsx'
import TeacherManagement from './components/AdminPages/TchrManagement.jsx'
import StudentHistory from './components/AdminPages/StdntHistory.jsx'
import TeacherHistory from './components/AdminPages/TchrHistory.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />      
        <Route path="/studentlog" element={<StudentLog />} />
        <Route path="/teacherlog" element={<TeacherLog />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/studentmanagement" element={<StudentManagement />} />
        <Route path="/dashboard/teachermanagement" element={<TeacherManagement />} />
        <Route path="/dashboard/studentlogs" element={<StudentHistory />} />
        <Route path="/dashboard/teacherlogs" element={<TeacherHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

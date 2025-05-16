import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import StudentLog from "./components/StudentLog.jsx"
import TeacherLog from "./components/TeacherLog.jsx"
import Home from "./components/Home.jsx"
import Adminlogin from './components/Adminlogin.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/studentlog" element={<StudentLog />} />
        <Route path="/teacherlog" element={<TeacherLog />} />
        <Route path="/adminlogin" element={<Adminlogin />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
import studentImg from '../images/studentcard.jpg'
import teacherImg from '../images/teacher.jpg'
import { Button } from 'react-bootstrap'


function Home() {
  const navigate = useNavigate()

  const gotoStudentLog = () => {
    navigate('/studentlog')
  } 

  const gotoTeacherLog = () => {
    navigate('/teacherlog')
  }

  return (
    <>

     <div className='cards'>
      <Card className='student'>
        <Card.Img variant="" src={studentImg} />
        <Card.Body className="text-start">
          <Card.Title>Student Login</Card.Title>
          <Card.Text>
            CCS students login
          </Card.Text>
        </Card.Body>
        <Card.Body className="text-center">
          <Card.Link className='button' as='button' onClick={gotoStudentLog}>Log in</Card.Link>
        </Card.Body>
      </Card>

      <Card className='teacher'>
        <Card.Img variant="" src={teacherImg} />
        <Card.Body className="text-start">
          <Card.Title>Teacher Login</Card.Title>
          <Card.Text>
            Teacher login to their account and view their details.
          </Card.Text>
        </Card.Body>
        <Card.Body className="text-center">
          <Card.Link className='button' as='button' onClick={gotoTeacherLog}>Log in</Card.Link>
        </Card.Body>
      </Card>
      <Button className="adminnav" variant="dark" onClick={() => navigate('/adminlogin')} style={{ marginTop: '30px' }}>ADMIN</Button>

    </div>
    

    </>
  );
}

export default Home;
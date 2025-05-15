import React from 'react'

function Adminlogin() {

    const handleSubmit = (e) => {
    
    e.preventDefault();
    axios
      .post('http://localhost:5000/adminlogin', values)
      .then((res) => console.log(res))
      .catch((err) => {

        if (err.response && err.response.data && err.response.data.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("An unexpected error occurred.");
      }
        console.error(err);
      });
    };


  return (
    <div>
      
    </div>
  )
}

export default Adminlogin

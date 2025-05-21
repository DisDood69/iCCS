import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = (WrappedComponent) => {
  return function Protected(props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:5000/dashboard", { withCredentials: true })
        .then(() => setLoading(false))
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            navigate("/adminlogin");
          }else {
            setLoading(false); 
            console.error("An unexpected error occurred:", err);
        }
        });
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
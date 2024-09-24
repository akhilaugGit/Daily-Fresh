import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate,Link } from 'react-router-dom';
import './Login.css';  // Import the CSS file

// import ForgotPassword from '../ForgotPassword/ForgotPassword';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "success") {
          navigate('/dashboard'); 
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="bg-image">
      <div className="container">
        <div className="left-section">
          
        </div>
        <div className="right-section">
          <h5>Login</h5>
          <h4>Login to your account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
             
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" type="submit">
              Login
            </button>
          </form>
          <p>Already have an account</p>
          <p><Link to="/forgotpassword">Forgot your password?</Link></p>
          
        </div>
      </div>
    </div>
  );
}

export default Login;

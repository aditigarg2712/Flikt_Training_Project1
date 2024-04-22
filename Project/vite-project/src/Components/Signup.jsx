import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setUsernameError("Username is required");
    
    }
    if (email === "") {
      setEmailError("Email is required");
      
    }
    if (password === "") {
      setPasswordError("Password is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if(!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/.test(password))
    {
      setPasswordError("Password should be alphanumeric and only between 8-10 characters")
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      });
      if (response.data.status) {
        navigate("/login");
      }
      else{
        setError("Email already exists")
      }
    } catch (err) {
      console.log(err);
      setError("An error occured. Please try again.")

    }
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  };
  

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {/* {error && <p className="error-message">{error}</p>} */}
        {error && <span style={{ color: "red" }}>{error}</span>}
        {/* <div> className="social-container"
        <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </div>
        {usernameError && <span style={{ color: "red" }}>{usernameError}</span>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

        <button type="submit">Sign Up</button>

         <p className="forgot-password"> 
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
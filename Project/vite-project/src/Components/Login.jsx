import {useState} from "react";

import "../App.css";
import Axios from "axios";
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  
  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "")
    {
      setEmailError("Email is required");
    }
    if(password === "")
    {
      setPasswordError("Password is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if(!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/.test(password)){
      setPasswordError("Incorrect password");
      return;
    }

    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    }).then(Response => {
        if(Response.data.status){
            navigate('/dashboard')
        }
        else{
          setError("Invalid credentials")

        }
    }).catch(err =>{
        console.log(err)
    })
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        {error && <span style={{ color: "red" }}>{error}</span>}

        <label htmlFor="email">Email</label>
        <input
          
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}


        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}


        <button type="submit">Login</button>
        <Link to='/ForgotPassword'>Forgot Password?</Link>
        <p>Do not have an Account? <Link to ="/">Sign Up</Link></p> 
      </form>
    </div>
  );
};

export default Login;

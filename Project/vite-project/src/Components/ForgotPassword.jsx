import {useState} from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "")
    {
      setEmailError("Email is required");
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email))
    {
      setEmailError("Enter a valid email address");
      return;
    }
    if(e)
    Axios.post("http://localhost:3000/auth/forgot-password", {
      email,
    })
      .then((Response) => {
        if (Response.data.status) {
            alert("Please check your email for reset password Link")
          navigate("/login");
        }
        else{
          setEmailError("User not registered");
          console.log(Response.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setEmailError("");
    
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <label htmlFor="email">Email :</label>
        <input
          
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

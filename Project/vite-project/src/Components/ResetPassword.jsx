import {useState} from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {token} = useParams()
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === "")
    {
      setPasswordError("Enter new password");
      return;
    }
    if(!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/.test(password)){
      setPasswordError("Password should be alphanumeric and 8-10 characters long");
      return;
    }
    Axios.post("http://localhost:3000/auth/reset-password/"+token, {
      password,
    }).then(Response => {
        if(Response.data.status){
            navigate('/login')
        }
        else{
          setPasswordError("Inalid token");
          console.log(Response)
          console.log(Response.data)
        }
    }).catch(err =>{
        console.log(err)
    })
    setPasswordError("");
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <label htmlFor="password">New Password :</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword

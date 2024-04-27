import {useState, useEffect} from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import "../App.css";
import Axios from "axios";
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [user, setUser] = useState("");
  
  const [error, setError] = useState("");

  
  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if((email === "" && password === "") || (email !== "" && password === "") || (email === "" && password !== ""))
    {
      setError("Invalid login or password. Please try again");
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
    
  };
const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});
useEffect(
    () => {
        if (user) {
            Axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    navigate('/login');
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

// log out function to log the user out of google and set the profile array to null
const logOut = () => {
    googleLogout();
    setProfile(null);
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
        


        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        


        <button type="submit">Login</button>
        <Link to='/ForgotPassword'>Forgot Password?</Link>
        <p>Do not have an Account? <Link to ="/">Sign Up</Link></p> 
<h6>or sign in with</h6>
        <div className="social-container">
          <a href="#" className="social">
          <i className={`fab fa-facebook-f`} />
          </a>
          <a href="#"  className="social" onClick={handleGoogleLogin}>
          <i className={`fab fa-google-plus-g`} />
          
          </a>
          <a href="#" className="social">
          <i className={`fab fa-linkedin-in`} />
          </a>
        </div>

      </form>
    </div>
  );
};

export default Login;
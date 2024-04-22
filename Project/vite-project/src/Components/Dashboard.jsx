import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('hhtp://localhost:3000/auth/verify')
        .then(res =>
        {
            if(res.data.status){

            }
            else{
                navigate('/signup')
            }
        })
    })
    axios.defaults.withCredentials = true;
    const handleLogout = () =>{
        axios.get('http://localhost:3000/auth/logout')
        .then(res => {
            if(res.data.status){
                navigate('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div> Dashboard
            <br></br>
            <button onClick={handleLogout}> Logout </button>
            <br></br>

            
        </div>
    )
}
export default Dashboard
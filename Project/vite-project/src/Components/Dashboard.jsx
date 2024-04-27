import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from '../Components/Navbar';
import '../Table.css';
import AddUser from '../Components/AddUser'; // Import the AddUser component


const Dashboard = ({userData, setUserData}) => {
    const navigate = useNavigate();
    const isRendered = useRef(false);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false); // State variable for controlling the visibility of the Add User popup
    const [users, setUsers] = useState([
        // Initialize with some default users
        
      ]);

      useEffect(() => {
        const verifyUser = async () => {
            if (token)
            {
                const response = await Axios.get("http://localhost:3000/auth/verify", { token })
                if(response.status === 200){
                    setUserData(response.data)
                    isRendered.current = true

                }
                else{
                    const data = response.data
                }
            }
        }
        verifyUser()
    },[])

    useEffect( () => {
        let res
        const fetchUserData = async () => {
            if (userData)
            {
                res= await Axios.get('http://localhost:3000/auth/user-data/${userData.userId}')
            }
        }
    })
            
    const fetchUserData = () => {
        // console.log(userId)
        console.log("hi")
        Axios.get('http://localhost:3000/auth/user-data').then((res) => {
            setUsers(res.data); // Update state with the fetched user data
            console.log("hello")
        }).catch((error) => {
            console.error(error);
        });
    };

    Axios.defaults.withCredentials = true;

    const handleAddUser = (newUser) => {
        setUsers([...users, newUser]); // Update state with the new user
        
    };
    
        
    
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <div className="container">

                <table className="table mt-7">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                          <tr key={index}>
                            <td className="text-center">{user.name}</td>
                            <td className="text-center">{user.age}</td>
                            <td className="text-center">{user.phoneNumber}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{user.address}</td>
                            <td className="text-center">
                                <a href="" className='table-edit-link'>Edit</a>
                                <a href="" className='table-delete-link'>Delete</a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={() => setShowAddUserPopup(true)}>+ Add New User</button>
                </div>
                {/* {showAddUserPopup && (
                    <div className ="add-user-popup">
                        <div className="add-user-popup-inner">
                            <span className="close-popup" onClick={() => setShowAddUserPopup(false)}>×</span>
                            {/* Pass handleAddUser function to AddUser component */}
                            {/* <AddUser onAddUser={handleAddUser} />
                        </div>
                </div> */}
                    {showAddUserPopup && (
                <div className="add-user-modal">
                    <div className="add-user-popup">
                        {/* <span className="close-popup" onClick={() => setShowAddUserPopup(false)}>×</span> */}
                        <AddUser onAddUser={handleAddUser} setShowAddUserPopup={setShowAddUserPopup} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
export const handleLogout = () => {
    localStorage.removeItem("token");
    Axios.get("http://localhost:3000/auth/logout")
        .then(() => 
                navigate("/login"))
                
            
        
        .catch(err => {
            console.log(err);
        });
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../Components/Navbar';
import '../Table.css';
import AddUser from '../Components/AddUser'; // Import the AddUser component

const Dashboard = () => {
    const navigate = useNavigate();
    const [showAddUserPopup, setShowAddUserPopup] = useState(false); // State variable for controlling the visibility of the Add User popup
    const [users, setUsers] = useState([
        // Initialize with some default users
        
      ]);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/verify").then((res) => {
            console.log(res.data);
            if (!res.data.status) {
                navigate("/login");
                return;
            }
                
        });
    }, []);

    axios.defaults.withCredentials = true;

    // const handleLogout = () => {
    //     axios.get("http://localhost:3000/auth/logout").then((res) => {
    //         if (res.data.status) {
    //             navigate("/login");
    //             return;
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    const handleAddUser = (newUser) => {
        
                    setUsers([...users, newUser]); // Update state with the new user
                
    };

    return (
        <>
            <Navbar />
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
                
                {showAddUserPopup && (
                    <div className ="add-user-popup">
                        <div className="add-user-popup-inner">
                            <span className="close-popup" onClick={() => setShowAddUserPopup(false)}>×</span>
                            {/* Pass handleAddUser function to AddUser component */}
                            <AddUser onAddUser={handleAddUser} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;
export const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
        .then((res) => {
            if (res.data.status) {
                navigate("/login");
                return;
            }
        })
        .catch(err => {
            console.log(err);
        });
};

// AddUser.js
import React, { useState } from "react";
import '../AddUser.css';

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleInput = async (e) => {
    e.preventDefault();
    // Create a new user object with the inputted details
    const newUser = {
      name,
      email,
      age,
      phoneNumber,
      address
    };
    // Call the onAddUser function passed from Dashboard and pass the new user object
    onAddUser(newUser);
    // Clear input fields after adding user
    setName("");
    setEmail("");
    setAge("");
    setPhoneNumber("");
    setAddress("");
  };

  return (
    <div className="add-up-container">
      <form className="add-up-form" onSubmit={handleInput}>
        <h2>Add Details</h2>
        <div className="ad-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            
          />
        </div>

        <div className="add-form-group">
          <label htmlFor="email">Email</label>
          <input
            
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>


        <div className="add-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            placeholder="Enter Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            
          />
        </div>

        <div className="add-form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            
          />
        </div>

        
        
        
        

        <button type="submit">Add</button>

         
      </form>
      </div>
  );
};
        

export default AddUser;

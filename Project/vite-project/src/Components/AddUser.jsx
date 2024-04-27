// AddUser.js
import React, { useState } from "react";
import '../AddUser.css';
import  Axios  from "axios";

const AddUser = ({ onAddUser,setShowAddUserPopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const handleInput = async (e) => {
    e.preventDefault();

    if(email==="")
    {
      setEmailError("Please enter email");
    }
    if(name === ""){
      setNameError("Please enter name");
    }
    if(age == "")
    {
      setAgeError("Please enter age");
    }
    if(phoneNumber === "")
    {
      setPhoneNumberError("Please enter phone no.")
    }
    if(address === "")
    {
      setAddressError("Please enter address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Create a new user object with the inputted details
    const newUser = {
      name,
      email,
      age,
      phoneNumber,
      address
    };

    const response = await Axios.post("http://localhost:3000/auth/create-user-data", newUser);
    // Call the onAddUser function passed from Dashboard and pass the new user object
    console.log(response.data.userData)
    onAddUser(response.data.userData);
   

    // Clear input fields after adding user
    setName("");
    setEmail("");
    setAge("");
    setPhoneNumber("");
    setAddress("");

    setShowAddUserPopup(false);

   
  };


return (
  <div className="add-up-container">
    <form className="add-up-form" onSubmit={handleInput}>
      
      <span className="close-popup" onClick={() => setShowAddUserPopup(false)}>×</span>

      <div className="ad-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <span className="error-message">{nameError}</span>}
      </div>
      <div className="add-form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}

        />
        {ageError && <span className="error-message">{ageError}</span>}
      </div>

      <div className="add-form-group">
        <label htmlFor="email">Email</label>
        <input

          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>


      <div className="add-form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="number"
          placeholder="Enter Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}

        />
        {phoneNumberError && <span className="error-message">{phoneNumberError}</span>}
      </div>

      <div className="add-form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}

        />
        {addressError && <span className="error-message">{addressError}</span>}
      </div>






      <button type="submit">Add</button>


    </form>
  </div>
);
};


export default AddUser;

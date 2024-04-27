import mongoose from "mongoose";

// Define the schema for user-specific data
const UserDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    address: {type: String, required: true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who created the data
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Create the UserData model
const UserData = mongoose.model('UserData', UserDataSchema);

export {UserData};
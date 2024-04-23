// Import Mongoose
import mongoose from 'mongoose';

// Define the schema for user-specific data
const UserDataSchema = new mongoose.Schema({
    data: { type: String, required: true }, // Example field, adjust as needed
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who created the data
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Create the UserData model
const UserData = mongoose.model('UserData', UserDataSchema);

// Define the schema for the User
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // Add reference to user-specific data
    userData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserData' }] // Array of references to UserData
});

// Create the User model
const User = mongoose.model("User", UserSchema);

// Export both models
export { User, UserData };

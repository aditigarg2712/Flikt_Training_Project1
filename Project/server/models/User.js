// Import Mongoose
import mongoose from 'mongoose';



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
export { User};

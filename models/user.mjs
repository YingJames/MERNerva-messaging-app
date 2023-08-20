import { Schema, model } from "mongoose";

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    // Additional user properties can be added here
});

const User = model("User", userSchema);
export default User;
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    // Additional user properties can be added here
});

const User = model("User", userSchema);
export default User;
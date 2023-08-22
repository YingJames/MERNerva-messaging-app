import { Schema, model } from "mongoose";

export const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    // Additional user properties can be added here
});

export const User = model("User", userSchema);
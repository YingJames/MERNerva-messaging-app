import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

export const userSchema = new Schema({
    uid: { type: String, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    rooms: [{ type: ObjectId, ref: 'Room' }]
});

export const User = model("User", userSchema);
import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const roomSchema = new Schema({
    participants: [{ type: ObjectId, ref: 'User', required: true }],
    name: { type: String, required: true },
    messages: [{ type: ObjectId, ref: 'Message' }],
    createdAt: { type: Date, default: Date.now },
    // Additional chat properties can be added here
});

const Room = model('Room', roomSchema);
export { Room };
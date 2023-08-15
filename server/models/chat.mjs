import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
    participants: [{ type: ObjectId, ref: 'User', required: true }],
    messages: [{ type: ObjectId, ref: 'Message' }],
    createdAt: { type: Date, default: Date.now },
    // Additional chat properties can be added here
});

const Chat = model('Chat', chatSchema);
export default Chat;
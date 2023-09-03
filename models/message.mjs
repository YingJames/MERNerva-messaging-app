import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    senderId: { type: ObjectId, ref: 'User', required: true },
    // receiver: { type: ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
},
    { autoCreate: false }
);

const Message = model("Message", messageSchema);
export { messageSchema, Message };
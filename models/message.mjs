import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    senderEmail: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
},
    { autoCreate: false }
);

const Message = model("Message", messageSchema);
export { messageSchema, Message };
import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const messageThreadSchema = new Schema({
  messages: [{
      type: ObjectId,
      ref: 'Message'
    }],
});

const MessageThread = model("MessageThread", messageThreadSchema);
export default MessageThread;
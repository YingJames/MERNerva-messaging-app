import { Schema, model } from "mongoose";
import { messageSchema} from "./message.mjs";

const messageThreadSchema = new Schema({
    messages: [messageSchema],
    ref: 'Message',
  });

const AllUsers = model("MessageThread", messageThreadSchema);
export default AllUsers;
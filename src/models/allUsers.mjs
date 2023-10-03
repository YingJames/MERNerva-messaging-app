import { Schema, model } from "mongoose";
import { userSchema } from "./user.mjs";

const allUsersSchema = new Schema({
    users: [userSchema],
    ref: 'User',
  });

const AllUsers = model("AllUsers", allUsersSchema);
export default AllUsers;
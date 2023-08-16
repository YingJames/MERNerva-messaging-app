import { Router } from "express";
import User from "../models/user.mjs";
import database from "../config/database.mjs";

const userRoutes = Router();

userRoutes.post('/register', async (request, response) => {
    try {
        const { email, displayName, uuid } = request.body;
        const newUser = new User({
            email,
            displayName,
            uuid,
        });
        let userBase = await database.collection("users");
        let result = await userBase.insertOne(newUser);
        response.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        response.status(500).json({ error: "User registration failed", details: error.message });
    }
});

export default userRoutes;
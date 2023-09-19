import { Router } from "express";
import { Types } from "mongoose";
import { Message } from "../models/message.mjs";
import { connection } from "../config/mongoClient.mjs"

const messageRoutes = Router();

messageRoutes.post('/findMessageThread', async (request, response) => {
    try {
        let { messageThreadId } = await request.body;
        if (typeof messageThreadId == "string") {
            messageThreadId = new Types.ObjectId(messageThreadId);
        }

        const messageDB = connection.useDb("messageDB");
        const messageThreadCollection = messageDB.collection("messagethreads");

        const messageThread = await messageThreadCollection.aggregate(
            [
                { $match: { "MessageThreads._id": messageThreadId } },
                { $unwind: "$MessageThreads" },
                { $match: { "MessageThreads._id": messageThreadId } },
                { $project: {
                    _id: "$MessageThreads._id",
                    messages: "$MessageThreads.messages"
                    } }
            ]
        ).toArray();
        // const messagesArray = messageThread[0].MessageThreads[0].messagesArray;

        response.status(200).json({ message: "MessageThread found successfully", messageThread });
    } catch (error) {
        response.status(500).json({ error: "MessageThread could not be found", details: error.message });
    }
});

messageRoutes.post('/createMessage', async (request, response) => {
    try {
        let { messageThreadId, senderId, content } = await request.body;
        if (typeof messageThreadId == "string") {
            messageThreadId = new Types.ObjectId(messageThreadId);
        }
        const newMessage = new Message({
            senderId,
            content,
        });

        const messageDB = connection.useDb("messageDB");
        const messageThreadCollection = messageDB.collection("messagethreads");

        await messageThreadCollection.updateOne(
            { "MessageThreads._id": messageThreadId },
            { $push: { "MessageThreads.$.messages": newMessage } }
        );

        response.status(201).json({ message: "Message created successfully", newMessage });
    } catch (error) {
        response.status(500).json({ error: "Message creation failed", details: error.message });
    }
});

export default messageRoutes;
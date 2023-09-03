
import { Router } from "express";
import { Message } from "../models/message.mjs";
import { connection } from "../config/mongoClient.mjs"

const messageRoutes = Router();

messageRoutes.post('/createMessage', async (request, response) => {
    try {
        const { messageThreadId, senderId, content  } = await request.body;

        const newMessage = new Message({
            senderId,
            content,
        });

        const messageDB = connection.useDb("messageDB");
        const messageThreadCollection = messageDB.collection("messagethreads");
        // const messageThreadsParentId = new Types.ObjectId("64f09c327e063247895687b0");

        await messageThreadCollection.updateOne(
            { _id: messageThreadId },
            { $push: { "MessageThreads.$": newMessage } }
        );
        

    } catch(error) {

    }
});

export default messageRoutes;
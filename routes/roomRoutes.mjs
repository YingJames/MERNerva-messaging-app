import { Router } from "express";
import { Types } from "mongoose"; // or from mongoose
import { Room } from "../models/room.mjs";
import MessageThread from "../models/messageThread.mjs";
import { connection } from "../config/mongoClient.mjs"

const roomRoutes = Router();

roomRoutes.post('/findRooms', async (request, response) => {
    try {
        let { userId } = await request.body;
        if (typeof userId == "string") {
            userId = new Types.ObjectId(userId);
        }
        console.log(`userId: ${userId}`);
        const messageDB = connection.useDb("messageDB");
        const roomCollection = messageDB.collection("rooms");
        const userCollection = messageDB.collection("users");

        // find room ids from the user collection
        const roomIdsArray = await userCollection.findOne(
            { "Users._id": userId },
            {
                projection: {
                    "Users.rooms.$": 1
                }
            },
        );
        const roomIds = roomIdsArray.Users[0].rooms;
        console.log(`roomIds: ${roomIds}`)

        // find room objects from the room collection
        const rooms = await roomCollection.find(
            { "Rooms._id": { $in: roomIds } },
        ).toArray();
        const roomsArray = rooms[0].Rooms;
        response.status(200).json({
            message: "ChatRooms found successfully",
            rooms: roomsArray
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "ChatRooms could not be found",
            error: error
        });
    }
});

roomRoutes.post('/createRoom', async (request, response) => {
    try {
        const { name, participants } = await request.body;
        const isStringsArray = arr => arr.every(i => typeof i === "string");
        if (isStringsArray(participants)) {
            participants.forEach((participant, index) => {
                participants[index] = new Types.ObjectId(participant);
            });
        }

        console.log(`name: ${name}, participants: ${participants}`);

        const newMessageThread = new MessageThread();
        const newRoom = new Room({
            name,
            participants,
            messageThread: newMessageThread._id
        });

        const messageDB = connection.useDb("messageDB");
        const roomCollection = messageDB.collection("rooms");
        const userCollection = messageDB.collection("users");
        const messageThreadCollection = messageDB.collection("messagethreads");

        // update chatrooms collection
        const existingRoomDocu = await roomCollection.findOne();
        if (existingRoomDocu) {
            await roomCollection.updateOne(
                { _id: existingRoomDocu._id },
                { $push: { Rooms: newRoom } }
            );
        } else {
            await roomCollection.insertOne({
                Rooms: [newRoom]
            });
        }

        await userCollection.updateOne(
            { "Users._id": { $in: participants } },
            { $push: { "Users.$[participant].rooms": newRoom._id } },
            { arrayFilters: [{ "participant._id": { $in: participants } }] }
        );

        // update messagethreads collection
        const existingMessageThreadDocu = await messageThreadCollection.findOne();
        if (existingMessageThreadDocu) {
            await messageThreadCollection.updateOne(
                { _id: existingMessageThreadDocu._id },
                { $push: { MessageThreads: newMessageThread } }
            );
        } else {
            await messageThreadCollection.insertOne({
                MessageThreads: [newMessageThread]
            });
        }

        response.status(200).json({
            message: "ChatRoom created successfully",
            roomId: newRoom._id,
            messageThreadId: newMessageThread._id
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "ChatRoom could not be created" });
    }
});

export default roomRoutes;
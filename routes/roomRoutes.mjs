import { Router } from "express";
import { Types } from "mongoose"; // or from mongoose
import { Room } from "../models/room.mjs";
import { connection } from "../config/mongoClient.mjs"

const roomRoutes = Router();

roomRoutes.post('/createRoom', async (request, response) => {
    try {
        const { name } = await request.body;
        const participants = [new Types.ObjectId("64e8bd022013af15c06aa387"),
                              new Types.ObjectId("64e8bce42013af15c06aa385")]
        console.log(`name: ${name}, participants: ${participants}`);
        const newRoom = new Room({
            name,
            participants,
        });
        const messageDB = await connection.useDb("messageDB");
        const userCollection = await messageDB.collection("users");
        const roomCollection = await messageDB.collection("chat-rooms");
        const parentId = new Types.ObjectId("64efd8e70068f45cae562950");

        // update chatrooms collection
        await roomCollection.updateOne(
            { _id: parentId },
            { $push: { Rooms: newRoom } }
        );

        await userCollection.updateMany(
            { "Users._id": { $in: participants }},
            { 
                $push: { 
                    "Users.$[].rooms": newRoom._id 
                } 
            }
        );
        // console.log(user);
        // update user's chatrooms
        // await userCollection.updateMany({ 
        //     Users: { 
        //         _id: { 
        //             $in: participants 
        //         }
        //     }
        // },
        // { 
        //     $push: { 
        //         "Users.$": {
        //             rooms: newRoom
        //         } 
        //     } 
        // });

        response.status(200).json({ message: "ChatRoom created successfully" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "ChatRoom could not be created" }); 
    }
});

export default roomRoutes;
import "./loadEnvironment.mjs";
import express, { json, Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import path from "path";
// import { fileURLToPath } from "url";
// import { connectToMongoClient } from "./config/mongoClient.mjs";
// import { messageRoutes, roomRoutes, userRoutes } from "./routes/index.mjs";
// import colors from "colors";
// import MessageThread from "./models/messageThread.mjs";
// import { Room } from "./models/room.mjs";
// require("./loadEnvironment.mjs");
// const express = require("express");
// const serverless = require("serverless-http");
// const cors = require("cors");
// const path = require("path");
// const { fileURLToPath } = require("url");
// const { connectToMongoClient } = require("./config/mongoClient.mjs");
// const { messageRoutes, roomRoutes, userRoutes } = require("./routes/index.mjs");
// const colors = require("colors");
// const MessageThread = require("./models/messageThread.mjs");
// const { room } = require("./models/room.mjs");

const PORT = process.env.PORT || 5050;
const app = express();
const netlifyRouter = Router();

app.use(cors());
app.use(json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// connectToMongoClient();

// netlifyRouter.get('/watchRooms', (req, res) => {
//     res.writeHead(200, {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         "Connection": "keep-alive",
//     });
//     const changeStream = Room.watch();
//     changeStream.on('change', () => {
//         const data = { message: "rerender" }
//         res.write("event: message\n");
//         res.write(`data: ${JSON.stringify(data)}\n\n`);
//     });
// });
// netlifyRouter.get('/watchMessageThread', (req, res) => {
//     res.writeHead(200, {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         "Connection": "keep-alive",
//     });
//     const changeStream = MessageThread.watch();
//     changeStream.on('change', () => {
//         const data = { message: "rerender" }
//         res.write("event: message\n");
//         res.write(`data: ${JSON.stringify(data)}\n\n`);
//     });
// });

// app.use("/.netlify/functions/api/database/users", userRoutes);
// app.use("/.netlify/functions/api/database/rooms", roomRoutes);
// app.use("/.netlify/functions/api/database/messages", messageRoutes);

/*
app.use(express.static(path.join(__dirname, '../client/build')));
netlifyRouter.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

app.use('/api/', netlifyRouter);

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

export const handler = serverless(app);
// app.listen(PORT, () => {
//     console.log(colors.yellow.bold(`Server is running on http://localhost:${PORT}`));
// });

import "./loadEnvironment.mjs";
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectToMongoClient } from "./config/mongoClient.mjs";
import { messageRoutes, roomRoutes, userRoutes } from "./routes/index.mjs";
import colors from "colors";
import MessageThread from "./models/messageThread.mjs";
import { Room } from "./models/room.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToMongoClient();

const corsOptions = {
    origin: 'http://localhost:3000'
}
app.get('/watchRooms', cors(corsOptions), (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    const changeStream = Room.watch();
    changeStream.on('change', () => {
        const data = { message: "rerender" }
        res.write("event: message\n");
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
});
app.get('/watchMessageThread', cors(corsOptions), (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    const changeStream = MessageThread.watch();
    changeStream.on('change', () => {
        const data = { message: "rerender" }
        res.write("event: message\n");
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
});

app.use("/api/database/users", userRoutes);
app.use("/api/database/rooms", roomRoutes);
app.use("/api/database/messages", messageRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server is running on http://localhost:${PORT}`));
});

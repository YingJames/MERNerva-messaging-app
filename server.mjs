import "./loadEnvironment.mjs";
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectToMongoClient } from "./config/mongoClient.mjs";
import { roomRoutes, userRoutes } from "./routes/index.mjs";

import colors from "colors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build/index.html'));
});

connectToMongoClient();
app.use("/api/database/users", userRoutes);
app.use("/api/database/rooms", roomRoutes);

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server is running on http://localhost:${PORT}`));
});

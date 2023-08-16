import "./loadEnvironment.mjs";
import express, { json } from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import colors from "colors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(json());

app.use("/record", records);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server is running on port: ${PORT}`));
});

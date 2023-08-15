import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import colors from "colors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server is running on port: ${PORT}`));
});

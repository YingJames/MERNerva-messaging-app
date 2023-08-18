import mongoose from "mongoose";
import colors from "colors";

const connectionString = process.env.ATLAS_URI || "";

export const connectToMongoClient = async () => {
    try {
        const conn = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));

    } catch(error) {
        console.error(error);
        process.exit();
    }
};

export const connection = mongoose.connection;

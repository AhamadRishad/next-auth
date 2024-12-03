import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        connection.on("error", (error) => {
            console.error(`Error connecting to MongoDB: ${error}`);
            process.exit();
        });

    } catch (error) {
        console.error(`Failed to connect to MongoDB`);
        console.log(error);
    }
}
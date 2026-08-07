import mongoose from "mongoose";

const MONGODB_URI= process.env.mongoDB_Key;

export async function connectMongoDB(){ // To connect to the mongoDB Database
    if(mongoose.connection.readyState===1)return;
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
}


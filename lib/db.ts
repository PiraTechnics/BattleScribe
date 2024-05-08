import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_STRING || "";

export default async function dbConnect() {
	await mongoose.connect(MONGODB_URI);
	console.log("connected!");
	return mongoose;
}

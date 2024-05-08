import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_STRING!;

if (!MONGODB_URI) {
	throw new Error(
		"No DB String found, Please define DB_STRING in environment varaible file"
	);
}

export default async function dbConnect() {
	await mongoose.connect(MONGODB_URI);
	console.log("Connected to Database");
	//return mongoose;
}

export async function dbDisconnect() {
	await mongoose.disconnect();
	console.log("Disconnected from Database");
}

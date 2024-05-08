import mongoose from "mongoose";
import Monster from "../models/Monster";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

mongoose
	.connect(process.env.DB_STRING!)
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(err.message));

const MONGODB_URI = process.env.DB_STRING;

if (!MONGODB_URI) {
	throw new Error(
		"No DB String found, Please define DB_STRING in environment varaible file"
	);
}

async function main() {
	try {
		await Monster.deleteMany(); //clear db

		console.log("Database Cleared");
	} catch (error) {
		console.log(error);
	}

	mongoose.disconnect();
	console.log("Disconnected from Database");
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to clear the database:",
		err
	);
});

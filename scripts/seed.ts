import mongoose from "mongoose";
//import { monsters } from "../lib/placeholder-data.js";
import Monster from "../models/monsters/Monster";
import { Monster as MonsterType } from "../models/monsters/types";
import dotenv from "dotenv";
import { readFile } from "fs";
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
		await Monster.deleteMany();
		console.log("Database Cleared");

		readFile("scripts/converted-monsters.json", "utf8", async (error, data) => {
			if (error) console.error(error.message);

			const monsters: MonsterType[] = JSON.parse(data);
			let count = 0;
			const dbEntries = monsters.map(async (entry) => {
				await new Monster(entry).save();
				console.log(`Entry saved to Database: ${entry.name}`);
				count++;
			});
			await Promise.all(dbEntries);
			console.log(
				`Successfully seeded ${count} out of ${monsters.length} entries`
			);
			mongoose.disconnect();
			console.log("Database Disconnected");
		});
	} catch (error) {
		console.log(error);
	}
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to seed the database:",
		err
	);
});

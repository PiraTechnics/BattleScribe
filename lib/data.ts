import Monster from "@/models/Monster";
import connectDB from "./db";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchMonster(name: string) {
	try {
		await connectDB();
		console.log(`fetching: ${name}`);

		const raw = await Monster.findOne({ index: name });
		const data = JSON.parse(JSON.stringify(raw));
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchFilteredMonsters(query: string) {
	noStore(); //don't cache results

	try {
		await connectDB();
		const raw = await Monster.find(
			{ index: { $regex: query } },
			"index name size type challenge_rating" //need to search "inclusively" -- ie "dragon" should return all monsters with "dragon" in the name, and/or all of type "dragon"
			//"index name size type challenge_rating"
		);
		const data = JSON.parse(JSON.stringify(raw));
		return data;
	} catch (error) {
		console.log(error);
	}
}

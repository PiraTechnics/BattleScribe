import Monster from "@/models/monsters/Monster";
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

const ITEMS_PER_PAGE = 20;

export async function fetchFilteredMonsters(
	query: string,
	currentPage: number
) {
	noStore(); //don't cache results

	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		await connectDB();
		const raw = await Monster.find(
			{ index: { $regex: query } },
			"index name size type challenge_rating" //need to search "inclusively" -- ie "dragon" should return all monsters with "dragon" in the name, and/or all of type "dragon"
			//"index name size type challenge_rating"
		)
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		const data = JSON.parse(JSON.stringify(raw));
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchMonstersPages(query: string) {
	noStore();

	try {
		//wait to see the skeleton
		//await new Promise((resolve) => setTimeout(resolve, 3000));

		await connectDB();
		const totalItems = await Monster.find({
			index: { $regex: query },
		}).countDocuments();

		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
		//console.log(totalPages);
		return totalPages;
	} catch (error) {
		console.log(error);
	}
}

"use server";

import Encounter from "@/models/encounters/Encounter";
import { Types } from "mongoose";
/* import { fetchMonster } from "./data";
import { Monster } from "@/models/monsters/types";
import { MonsterEncounterEntry } from "@/models/encounters/types"; */

export interface MonsterFormInfo {
	index: string;
	name: string;
	hp: number;
	_id: Types.ObjectId;
}

export interface EncounterFormData {
	name: string;
	participants: MonsterFormInfo[];
}

export async function createEncounter(formData: EncounterFormData) {
	/* 	let entries: {
		monster: Types.ObjectId;
		initiative: number;
		max_hp: number;
		current_hp: number;
		active_effects: string[];
	}[] = [];
	formData.participants.forEach(async (participant) => {
		const reference: Monster = await fetchMonster(participant.index);
		const newEntry = {
			monster: reference._id,
			initiative: 0,
			max_hp: reference.hp,
			current_hp: reference.hp,
			active_effects: [],
		};
		
		entries.push(newEntry);
	}); */

	let entries: {
		monster: Types.ObjectId;
		initiative: number;
		max_hp: number;
		current_hp: number;
		active_effects: string[];
	}[] = [];

	formData.participants.forEach((participant) => {
		console.log(participant);

		const newEntry = {
			monster: participant._id,
			initiative: 0,
			max_hp: participant.hp,
			current_hp: participant.hp,
			active_effects: [],
		};
		entries.push(newEntry);
	});

	console.log(entries);

	const newEcounter = await Encounter.create({
		name: formData.name,
		participants: entries,
		active: false,
	});

	/* state: {
			current_round: 0,
			currentTurn: entries[0]._id,
		}, */

	try {
		await newEcounter.save();
		console.log(`successfully saved Encounter: ${newEcounter.name}`);
	} catch (error) {
		console.log(error);
	}
}

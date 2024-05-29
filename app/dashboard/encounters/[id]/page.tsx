import { fetchMonster } from "@/lib/data";
import { Encounter, MonsterEncounterEntry } from "@/models/encounters/types";
import { Monster } from "@/models/monsters/types";
import { Types } from "mongoose";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const monsters: Monster[] = await Promise.all([
		fetchMonster("skeleton"),
		fetchMonster("zombie"),
	]);

	/*** COMBAT UTIL FUNCTIONS ***/
	// TO-DO: Migrate these to utils, or a specific combat utils file
	const rollInitiative = (dex: number) => {
		//Initiative is 1d20 + DEX Modifier
		const initBonus = Math.floor((dex - 10) / 2);
		const d20 = Math.floor(20 * Math.random()) + 1;

		console.log(d20);
		console.log(initBonus);
		return d20 + initBonus; //This CAN be negative, with negative modifiers -- this is intended, and consistent with the rules
	};

	const nextTurn = (encounter: Encounter) => {
		//must be active encounter
		if (!encounter.active) {
			throw new Error("Encounter Inactive, cannot move turn");
		}
	};

	/*** ***/

	let entries: MonsterEncounterEntry[] = [];
	monsters.forEach((monster) => {
		let entry: MonsterEncounterEntry = {
			_id: new Types.ObjectId("sdfsdf213"),
			monster: monster,
			initiative: rollInitiative(monster.ability_scores.dexterity) || 0, //0 is default in case our function fails
			max_hp: monster.hp,
			current_hp: monster.hp,
			active_effects: [],
		};

		entries.push(entry);
	});
	//sort by initiative order
	entries.sort((a, b) => (a.initiative > b.initiative ? -1 : 1));

	const testEncounter: Encounter = {
		_id: new Types.ObjectId("sdfsdf334"),
		name: "test encounter",
		participants: entries,
		active: false,
		state: {
			current_round: 0,
			current_turn: entries[0], //first in the sorted array
		},
	};

	//console.log(testEncounter.participants);

	return (
		<main>
			<div id="encounter">
				<h1>Encounter: {testEncounter.name}</h1>
				{/* <h1>mongoose ID: {testEncounter._id.toString()}</h1> */}
				<div>
					<h2>Active: {testEncounter.active.toString()}</h2>
					<h3>Current Round: {testEncounter.state.current_round}</h3>
					<h3>Current Turn: {testEncounter.state.current_turn.monster.name}</h3>
				</div>
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
							>
								Initiative
							</th>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
							>
								Name
							</th>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
							>
								Hit Points
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{entries.map((entry) => (
							<tr key={"sdfasdfsdfsd"}>
								<td>{entry.initiative}</td>
								<td>{entry.monster.name}</td>
								<td>
									{entry.current_hp}/{entry.max_hp}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}

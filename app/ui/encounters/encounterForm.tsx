"use client";

import { MonsterFormInfo } from "@/lib/actions";
import { createEncounter } from "@/lib/actions";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface EncounterFormParams {
	monsters: MonsterFormInfo[];
}

export default function EncounterForm({ monsters }: EncounterFormParams) {
	const [participants, setParticipants] = useState<MonsterFormInfo[]>([]);
	const [name, setName] = useState<string>("");

	function handleAddMonster(event: FormEvent) {
		const e = event.target as HTMLSelectElement;
		console.log(JSON.parse(e.value));
		setParticipants([...participants, JSON.parse(e.value)]);
	}

	async function handleSubmit() {
		createEncounter({ name, participants });
	}

	return (
		<form action={handleSubmit}>
			<div className="flex flex-col gap-2">
				<label
					htmlFor="encounter-name"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Encounter Name
				</label>
				<div className="mt-2">
					<input
						type="text"
						name="encounter-name"
						id="encounter-name"
						required
						className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
						placeholder="name your encounter"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label
						htmlFor="encounter-monsters"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Monsters
					</label>
					<select
						id="encounter-monsters"
						name="encounter-monsters"
						className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
						onChange={handleAddMonster}
					>
						{monsters.map((entry: MonsterFormInfo) => (
							<option key={entry.index} value={JSON.stringify(entry)}>
								{entry.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div>
				Current Participants:
				{participants.map((entry) => (
					<div key={uuidv4()}>{entry.name}</div>
				))}
			</div>
			<button
				type="submit"
				className="rounded-md bg-blue-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				Create Encounter
			</button>
		</form>
	);
}

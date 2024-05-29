import { getAllEncounters } from "@/lib/data";
import { Encounter } from "@/models/encounters/types";

export default async function Page() {
	const encounters: Encounter[] = await getAllEncounters();
	console.log(encounters);
	encounters.forEach((entry) => {
		console.log(entry.participants);
	});

	return (
		encounters && (
			<main>
				<h1>All Encounters</h1>
				{encounters.map((entry) => {
					return (
						<div key={entry._id.toString()}>
							<h1>Encounter: {entry.name}</h1>
							Participants:
							<ul>
								{entry.participants.map((monster) => {
									return (
										<li key={monster._id.toString()}>{monster.monster.name}</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</main>
		)
	);
}

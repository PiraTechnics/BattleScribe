import EncounterForm from "@/app/ui/encounters/encounterForm";
import { fetchAllMonsters } from "@/lib/data";

export default async function Page() {
	const monsters = await fetchAllMonsters();

	return (
		<main>
			<EncounterForm monsters={monsters} />
		</main>
	);
}

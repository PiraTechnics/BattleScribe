import MonsterCard from "@/app/ui/monsters/monsterCard";
//import { fetchMonster } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	//const monster = await fetchMonster(id);

	return (
		<main>
			<MonsterCard index={id} />
		</main>
	);
}

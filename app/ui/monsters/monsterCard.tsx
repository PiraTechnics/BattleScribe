import { fetchMonster } from "@/lib/data";

interface MonsterCardProps {
	index: string;
}

export default async function MonsterCard({ index }: MonsterCardProps) {
	const monster = await fetchMonster(index);

	if (!monster) {
		return <p className="mt-4 text-gray-400">No data available.</p>;
	}

	return (
		<article
			id={`monster-${monster.index}`}
			className="grid grid-flow-row divide-y-2 divide-red-500 gap-1"
		>
			<section id="heading">
				<h1>{monster.name}</h1>
				<h2>
					{monster.size} {monster.type}
					{", "}
					{monster.alignment}
				</h2>
			</section>
		</article>
	);
}

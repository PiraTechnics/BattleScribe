import { fetchMonster } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const monster = await fetchMonster(id);

	return (
		<main>
			<h1>Monster Info</h1>
			<p>{monster && monster.name}</p>
		</main>
	);
}

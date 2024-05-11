import { fetchFilteredMonsters } from "@/lib/data";
import { MonsterTableEntry } from "@/lib/definitions/monster";
import { capitalize, formatChallengeRating } from "@/lib/utils";
import Link from "next/link";

export default async function MonsterTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const monsters = await fetchFilteredMonsters(query, currentPage);

	/* 	if (!monsters) {
		return <p>No Data Available</p>;
	} */

	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
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
						Type
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						Size
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						CR
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{monsters.map((monster: MonsterTableEntry) => (
					<tr key={monster.index}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							<Link href={`/dashboard/monsters/${monster.index}`}>
								{monster.name}
							</Link>
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{capitalize(monster.type)}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{monster.size}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{formatChallengeRating(monster.challenge_rating)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

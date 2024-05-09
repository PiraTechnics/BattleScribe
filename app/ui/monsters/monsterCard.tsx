import { fetchMonster } from "@/lib/data";
import {
	Monster,
	creatureSpeed,
	dice,
	rollableDice,
} from "@/lib/definitions/monster";

interface MonsterCardProps {
	index: string;
}

const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const commaSeparatedList = (array: Array<string>) => {
	let string = "";
	array.forEach((entry, i) => {
		string += entry;
		if (i + 1 !== array.length) string += ", ";
	});

	return string;
};

const formatSpeeds = (speeds: creatureSpeed) => {
	let formattedArr: Array<string> = [];
	const speedsArr: [string, string | boolean][] = Object.entries(speeds);
	speedsArr.forEach((entry) => {
		const speedType = capitalize(entry[0]);
		const speedVal = typeof entry[1] === `string` ? entry[1] : "";

		formattedArr.push(`${speedType} ${speedVal}`);
	});

	return formattedArr;
};

const diceRoll = (dice: rollableDice) => {
	return `${dice.amount}${dice.type} + ${dice.modifier}`;
};

export default async function MonsterCard({ index }: MonsterCardProps) {
	const monster: Monster = await fetchMonster(index);

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
			<section id="base-stats">
				<div className="flex gap-1">
					<span className="font-bold">Armor Class:</span>
					<span>{monster.armor_class[0].value}</span>
				</div>
				<div className="flex gap-1">
					<span className="font-bold">Hit Points:</span>
					<span>{monster.hp}</span>
					<span>({diceRoll(monster.hp_dice)})</span>
				</div>
				<div className="flex gap-1">
					<span className="font-bold">Speed:</span>
					{commaSeparatedList(formatSpeeds(monster.speed))}
				</div>
			</section>
		</article>
	);
}

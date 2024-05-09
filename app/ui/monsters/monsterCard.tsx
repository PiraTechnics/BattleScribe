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

const formatAbilityModifier = (score: number) => {
	if (!score || score > 30 || score < 0) {
		throw new Error("Invalid Ability Score"); //TODO: properly catch this somewhere
	}
	const result = Math.floor((score - 10) / 2);
	return `(${result >= 0 ? "+" : ""}${result})`;
};

export default async function MonsterCard({ index }: MonsterCardProps) {
	const monster: Monster = await fetchMonster(index);

	if (!monster) {
		return <p className="mt-4 text-gray-400">No data available.</p>;
	}

	return (
		<article
			id={`monster-${monster.index}`}
			className="grid grid-flow-row divide-y-2 divide-red-500 gap-1 max-w-xl"
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
			<section id="ability-scores" className="flex justify-between md:px-2">
				<div id="strength" className="text-center">
					<p className="font-bold">STR</p>
					<p>
						{monster.strength} {formatAbilityModifier(monster.strength)}
					</p>
				</div>
				<div id="dexterity" className="text-center">
					<p className="font-bold">DEX</p>
					<p>
						{monster.dexterity} {formatAbilityModifier(monster.dexterity)}
					</p>
				</div>
				<div id="constitution" className="text-center">
					<p className="font-bold">CON</p>
					<p>
						{monster.constitution} {formatAbilityModifier(monster.constitution)}
					</p>
				</div>
				<div id="intelligence" className="text-center">
					<p className="font-bold">INT</p>
					<p>
						{monster.intelligence} {formatAbilityModifier(monster.intelligence)}
					</p>
				</div>
				<div id="wisdom" className="text-center">
					<p className="font-bold">WIS</p>
					<p>
						{monster.wisdom} {formatAbilityModifier(monster.wisdom)}
					</p>
				</div>
				<div id="charisma" className="text-center">
					<p className="font-bold">CHA</p>
					<p>
						{monster.charisma} {formatAbilityModifier(monster.charisma)}
					</p>
				</div>
			</section>
		</article>
	);
}

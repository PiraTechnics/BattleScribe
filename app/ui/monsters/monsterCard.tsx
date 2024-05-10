import { fetchMonster } from "@/lib/data";
import { Monster } from "@/lib/definitions/monster";
import {
	commaSeparatedList,
	diceRoll,
	formatAbilityModifier,
	formatSavingThrows,
	formatSkills,
	formatSpeeds,
	formatSenses,
	formatChallengeRating,
	formatXP,
} from "@/lib/utils";

interface MonsterCardProps {
	index: string;
}

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
			<section id="attributes">
				{monster.saving_throws.length > 0 && (
					<div id="saving-throws" className="flex gap-2">
						<span className="font-bold">Saving Throws</span>
						<span>
							{commaSeparatedList(formatSavingThrows(monster.saving_throws))}
						</span>
					</div>
				)}
				{monster.skills.length > 0 && (
					<div id="skills" className="flex gap-2">
						<span className="font-bold">Skills</span>
						<span>{commaSeparatedList(formatSkills(monster.skills))}</span>
					</div>
				)}
				{monster.damage_vulnerabilities.length > 0 && (
					<div id="damage-vulnerabilities" className="flex gap-1">
						<span className="font-bold">Damage Vulnerabilities</span>
						<span>{commaSeparatedList(monster.damage_vulnerabilities)}</span>
					</div>
				)}
				{monster.damage_resistances.length > 0 && (
					<div id="damage-resistances" className="flex gap-1">
						<span className="font-bold">Damage Resistances</span>
						<span>{commaSeparatedList(monster.damage_resistances)}</span>
					</div>
				)}
				{monster.damage_immunities.length > 0 && (
					<div id="damage-immunities" className="flex gap-1">
						<span className="font-bold">Damage Immunities</span>
						<span>{commaSeparatedList(monster.damage_immunities)}</span>
					</div>
				)}
				{monster.condition_immunities.length > 0 && (
					<div id="comdition-immunities" className="flex gap-1">
						<span className="font-bold">Condition Immunities</span>
						<span>{commaSeparatedList(monster.condition_immunities)}</span>
					</div>
				)}
				<div id="senses" className="flex gap-1">
					<span className="font-bold">Senses</span>
					<span>{commaSeparatedList(formatSenses(monster.senses))}</span>
				</div>
				<div id="challenge-rating" className="flex gap-1">
					<span className="font-bold">Challenge</span>
					<span>{`${formatChallengeRating(monster.challenge_rating)} ${formatXP(
						monster.xp
					)}`}</span>
				</div>
				<div id="proficiency-bonus" className="flex gap-1">
					<span className="font-bold">Proficiency Bonus</span>
					<span>+{monster.proficiency_bonus}</span>
				</div>
			</section>
		</article>
	);
}

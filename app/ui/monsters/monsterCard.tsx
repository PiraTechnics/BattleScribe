import { fetchMonster } from "@/lib/data";
import { Action, Monster, SpecialAbility } from "@/models/monsters/types";
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
	legendaryActionsHeader,
	abbreviationFromAbility,
} from "@/lib/utils";
import { Ability } from "@/models/common/types";

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
			className="grid grid-flow-row gap-1 max-w-xl"
		>
			<section id="heading">
				<h1 className="font-semibold text-xl">{monster.name}</h1>
				<h2>
					{monster.size} {monster.type}
					{", "}
					{monster.alignment}
				</h2>
			</section>
			<section id="base-stats">
				<hr className="h-1 bg-gradient-to-r from-red-600 mb-1" />
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
				{Object.entries(monster.ability_scores).map((ability) => (
					<div
						key={`${monster.index}-${ability[0]}`}
						id="strength"
						className="text-center"
					>
						<p className="font-bold">
							{abbreviationFromAbility(ability[0] as Ability)}
						</p>
						<p>
							{ability[1]} {formatAbilityModifier(ability[1])}
						</p>
					</div>
				))}
			</section>
			<section id="attributes">
				<hr className="h-1 bg-gradient-to-r from-red-600 mb-1" />
				{monster.saving_throws.length > 0 && (
					<div id="saving-throws">
						<span className="font-bold pe-2">Saving Throws</span>
						<span>
							{commaSeparatedList(formatSavingThrows(monster.saving_throws))}
						</span>
					</div>
				)}
				{monster.skills.length > 0 && (
					<div id="skills">
						<span className="font-bold pe-2">Skills</span>
						<span>{commaSeparatedList(formatSkills(monster.skills))}</span>
					</div>
				)}
				{monster.damage_vulnerabilities.length > 0 && (
					<div id="damage-vulnerabilities">
						<span className="font-bold pe-2">Damage Vulnerabilities</span>
						<span>{commaSeparatedList(monster.damage_vulnerabilities)}</span>
					</div>
				)}
				{monster.damage_resistances.length > 0 && (
					<div id="damage-resistances">
						<span className="font-bold pe-2">Damage Resistances</span>
						<span>{commaSeparatedList(monster.damage_resistances)}</span>
					</div>
				)}
				{monster.damage_immunities.length > 0 && (
					<div id="damage-immunities">
						<span className="font-bold pe-2">Damage Immunities</span>
						<span>{commaSeparatedList(monster.damage_immunities)}</span>
					</div>
				)}
				{monster.condition_immunities.length > 0 && (
					<div id="comdition-immunities">
						<span className="font-bold pe-2">Condition Immunities</span>
						<span>{commaSeparatedList(monster.condition_immunities)}</span>
					</div>
				)}
				<div id="senses">
					<span className="font-bold pe-2">Senses</span>
					<span>{commaSeparatedList(formatSenses(monster.senses))}</span>
				</div>
				<div id="challenge-rating">
					<span className="font-bold pe-2">Challenge</span>
					<span>{`${formatChallengeRating(monster.challenge_rating)} ${formatXP(
						monster.xp
					)}`}</span>
				</div>
				{monster.proficiency_bonus && (
					<div id="proficiency-bonus">
						<span className="font-bold pe-2">Proficiency Bonus</span>
						<span>+{monster.proficiency_bonus}</span>
					</div>
				)}
			</section>
			{monster.special_abilities && monster.special_abilities.length > 0 && (
				<section id="special-abilities">
					<hr className="h-1 bg-gradient-to-r from-red-600 mb-1" />
					{monster.special_abilities.map((entry: SpecialAbility) => (
						<div key={`${monster.index}-${entry.name}`} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}
			<section id="actions">
				<h2 className="font-semibold text-xl text-red-700 border-b-4  border-b-red-700 mb-2">
					Actions
				</h2>
				{monster.actions.map((entry: Action) => (
					<div key={`${monster.index}-${entry.name}`} className="mb-2">
						<span className="font-semibold italic">{entry.name}. </span>
						<span>{entry.desc}</span>
					</div>
				))}
			</section>
			{monster.reactions && monster.reactions.length > 0 && (
				<section id="reactions">
					<hr className="h-1 bg-gradient-to-r from-red-600 mb-1" />
					{monster.reactions.map((entry: Action) => (
						<div key={`${monster.index}-${entry.name}`} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}
			{monster.legendary_actions && monster.legendary_actions.length > 0 && (
				<section id="legendary-actions">
					<hr className="h-1 bg-gradient-to-r from-red-600 mb-1" />
					<div className="mt-1 mb-2">
						{legendaryActionsHeader(monster.name)}
					</div>
					{monster.legendary_actions.map((entry: Action) => (
						<div key={`${monster.index}-${entry.name}`} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}
		</article>
	);
}

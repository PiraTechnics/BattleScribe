import {
	Ability,
	Skill,
	RollableDice,
	Dice,
	Damage,
	DamageType,
	Condition,
	DifficultyClass,
	AbilityScores,
	Armor,
	RestType,
	ActionOption,
	Choice,
	DamageChoice,
} from "../common/types";
import { Spell } from "../spells/types";

/*** Monster Heading ***/
type Size = "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";

type Type =
	| "beast"
	| "humanoid"
	| "dragon"
	| "monstrosity"
	| "undead"
	| "fiend"
	| "elemental"
	| "plant"
	| "construct"
	| "celestial"
	| "fey"
	| "aberration"
	| "giant"
	| "ooze"
	| "swarm of tiny beasts";

/*** Base Stats ***/
type ArmorClass =
	| ArmorClassDex
	| ArmorClassNatural
	| ArmorClassArmor
	| ArmorClassSpell
	| ArmorClassCondition;

type ArmorClassDex = {
	type: "dex";
	value: number;
	desc?: string;
};

type ArmorClassNatural = {
	type: "natural";
	value: number;
	desc?: string;
};

type ArmorClassArmor = {
	type: "dex";
	value: number;
	armor?: string[]; //TO-DO: change to armor reference
	desc?: string;
};

type ArmorClassSpell = {
	type: "spell";
	value: number;
	spell: string; //TO-DO: change to spell reference
	desc?: string;
};

type ArmorClassCondition = {
	type: "condition";
	value: number;
	condition: Condition;
	desc?: string;
};

interface Speed {
	walk?: string;
	fly?: string;
	climb?: string;
	swim?: string;
	burrow?: string;
	hover?: boolean;
}

/*** Ability Scores ***/

/*** Attributes ***/
//type Proficiency = SkillProficiency | SavingThrowProficiency;

interface SkillProficiency {
	ability: Skill;
	modifier: number;
}

interface SavingThrowProficiency {
	ability: Ability;
	modifier: number;
}

interface Senses {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
}

type ChallengeRating =
	| 0.125
	| 0.25
	| 0.5
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30;

/*** Special Abilities ***/
interface AbilityUsage {
	//type: "recharge on roll" | "per day" | "recharge after rest";
	type: string;
	times?: number;
	dice?: Dice;
	min_value?: Number;
	rest_types?: RestType[];
}

type SpecialAbilitySpell = {
	name: string;
	level: number;
	notes?: string;
	usage?: AbilityUsage;
};

type SpecialAbilitySpellcasting = {
	level?: number;
	ability: Ability; //this is the monster's spellcasting ability
	dc?: number; //only a number because it just describes the dc for the monster's spells at large
	modifier?: number;
	components_required: string[];
	school?: string; //TO-DO: convert to magic school type
	slots?: Record<string, number>;
	spells: SpecialAbilitySpell[];
};

interface SpecialAbility {
	name: string;
	desc: string;
	attack_bonus?: number;
	damage?: Damage[];
	usage?: AbilityUsage;
	dc?: DifficultyClass;
	spellcasting?: SpecialAbilitySpellcasting;
}

/*** Actions, etc ***/

interface ActionUsage {
	//type: "recharge on roll" | "per day" | "recharge after rest";
	type: string;
	times?: number;
	dice?: Dice;
	min_value?: Number;
}

interface Action {
	name: string;
	desc: string;
	attack_bonus?: number;
	damage?: Damage[];
	damage_choice?: DamageChoice[];
	dc?: DifficultyClass;
	usage?: ActionUsage;
	/* multiattack_type?: "actions" | "action_options";
	actions?: ActionOption[];
	action_options?: Choice; */
}

/*** Misc ***/

export interface Monster {
	index: string;
	name: string;
	size: Size;
	type: Type;
	alignment: string;
	armor_class: ArmorClass[];
	hp: number;
	hp_dice: RollableDice;
	speed: Speed;
	ability_scores: AbilityScores;
	saving_throws: SavingThrowProficiency[];
	skills: SkillProficiency[];
	damage_vulnerabilities: DamageType[];
	damage_resistances: DamageType[];
	damage_immunities: DamageType[];
	condition_immunities: Condition[];
	senses: Senses;
	languages?: string[]; //TO-DO: source languages list?
	proficiency_bonus?: number;
	challenge_rating: ChallengeRating;
	xp: number;
	special_abilities?: SpecialAbility[];
	actions: Action[];
	reactions?: Action[];
	legendary_actions?: Action[];
}

interface MonsterTableEntry {
	index: string;
	name: string;
	size: Size;
	type: Type;
	challenge_rating: ChallengeRating;
}

//Note: Should we include subtypes or nah?

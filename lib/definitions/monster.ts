import {
	Ability,
	Skill,
	AbilityScore,
	RollableDice,
	Dice,
	Damage,
} from "./common";

export interface Monster {
	index: string;
	name: string;
	size: CreatureSize;
	type: CreatureType;
	alignment: string;
	armor_class: [CreatureArmorClass];
	hp: number;
	hp_dice: RollableDice;
	speed: CreatureSpeeds;
	ability_scores: {
		strength: AbilityScore;
		dexterity: AbilityScore;
		constitution: AbilityScore;
		intelligence: AbilityScore;
		wisdom: AbilityScore;
		charisma: AbilityScore;
	};
	saving_throws: [Proficiency];
	skills: [Proficiency];
	damage_vulnerabilities: [string]; //should this and the other damage arrays be a list of possible damage types, loaded from db?
	damage_resistances: [string];
	damage_immunities: [string];
	condition_immunities: [string]; //should be a list of possible conditions, loaded from db?
	senses: CreatureSenses;
	languages?: [string]; //TO-DO: source languages list?
	proficiency_bonus?: number;
	challenge_rating: ChallengeRating;
	xp: number;
	special_abilities: [SpecialAbility];
	actions: [CreatureAction];
	reactions: [CreatureAction];
	legendary_actions: [CreatureAction];
	desc?: string;
}

export type CreatureSize =
	| "Tiny"
	| "Small"
	| "Medium"
	| "Large"
	| "Huge"
	| "Gargantuan";

export type CreatureType =
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

//Note: Should we include subtypes or nah?

export type ChallengeRating =
	| 0.2
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

export interface CreatureArmorClass {
	type: "natural" | "dex" | "armor" | "spell" | "condition";
	value: number;
	armor?: string;
	spell?: string;
	condition?: string;
}

export interface CreatureSpeeds {
	walk?: string;
	fly?: string;
	climb?: string;
	swim?: string;
	burrow?: string;
	hover?: boolean;
}

export interface Proficiency {
	//TO-DO: modify this to enforce what can be a saving throw and what can be a skill proficiency
	ability: Ability | Skill;
	modifier: Number;
}

export interface CreatureAction {
	name: string;
	desc: string;
	attack_bonus: number;
	damage: [
		{
			damage_type: string;
			damage_dice: RollableDice;
		}
	];
}

export interface CreatureSenses {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
}

export interface AbilityUsage {
	type: "recharge on roll" | "per day" | "recharge on rest";
	times: Number;
	dice: Dice;
	min_value: Number;
}

export interface SpecialAbility {
	name: string;
	desc: string;
	usage: AbilityUsage;
	//note: might be more to add here, spellcasting, damage etc -- worth reconsidering action vs ability schema
}

export interface action {
	name: string;
	desc: string;
	attack_bonus: Number;
	damage: Damage;
}

export interface Monster {
	index: string;
	name: string;
	size: creatureSize;
	type: creatureType;
	alignment: string;
	armor_class: [monsterArmorClass];
	hp: number;
	hp_dice: rollableDice;
	speed: creatureSpeed;
	strength: abilityScore;
	dexterity: abilityScore;
	constitution: abilityScore;
	intelligence: abilityScore;
	wisdom: abilityScore;
	charisma: abilityScore;
	saving_throws?: [proficiency];
	skills?: [proficiency];
	damage_vulnerabilities?: [string]; //should this and the other damage arrays be a list of possible damage types, loaded from db?
	damage_resistances?: [string];
	damage_immunities?: [string];
	condition_immunities?: [string]; //should be a list of possible conditions, loaded from db?
	senses?: monsterSenses;
	languages?: [string]; //TO-DO: source languages list?
	challenge_rating: number;
	proficiency_bonus: number;
	xp: number;
	special_abilities?: [specialAbility];
	actions: [monsterAction];
	reactions?: [monsterAction];
	legendary_actions?: [monsterAction];
	desc?: string;
}

export type creatureSize =
	| "Tiny"
	| "Small"
	| "Medium"
	| "Large"
	| "Huge"
	| "Gargantuan";

export type creatureType =
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

export type basicAbility =
	| "strength"
	| "dexterity"
	| "constitution"
	| "intelligence"
	| "wisdom"
	| "charisma";

export type skill =
	| "athletics"
	| "acrobatics"
	| "sleight of hand"
	| "stealth"
	| "Arcana"
	| "History"
	| "investigation"
	| "nature"
	| "religion"
	| "animal handling"
	| "insight"
	| "medicine"
	| "perception"
	| "survival"
	| "deception"
	| "intimidation"
	| "performance"
	| "persuasion";

export type abilityScore =
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

export interface monsterArmorClass {
	type: "natural" | "dex" | "armor" | "spell" | "condition";
	value: number;
	armor?: string;
	spell?: string;
	condition?: string;
}

export interface creatureSpeed {
	walk?: string;
	fly?: string;
	climb?: string;
	swim?: string;
	burrow?: string;
	hover?: boolean;
}

export interface proficiency {
	//TO-DO: modify this to enforce what can be a saving throw and what can be a skill proficiency
	ability: basicAbility | skill;
	modifier: Number;
}

export type dice = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

export interface rollableDice {
	type: dice;
	amount: Number;
	modifier: Number;
}

export interface monsterAction {
	name: string;
	desc: string;
	attack_bonus: number;
	damage: [
		{
			damage_type: string;
			damage_dice: rollableDice;
		}
	];
}

export interface monsterSenses {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
}

export interface abilityUsage {
	type: "recharge on roll" | "per day" | "recharge on rest";
	times: Number;
	dice: dice;
	min_value: Number;
}

export interface specialAbility {
	name: string;
	desc: string;
	usage: abilityUsage;
	//note: might be more to add here, spellcasting, damage etc -- worth reconsidering action vs ability schema
}

export interface damage {
	damage_type: string;
	damage_dice: rollableDice;
}

export interface action {
	name: string;
	desc: string;
	attack_bonus: Number;
	damage: damage;
}

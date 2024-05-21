import { Encounter, MonsterEncounterEntry } from "@/models/encounters/types";
import { Monster } from "@/models/monsters/types";
//import { v4 as uuidv4 } from "uuid";

const testMonster: Monster = {
	name: "Giant Octopus",
	index: "giant-octopus",
	size: "Large",
	type: "beast",
	alignment: "unaligned",
	armor_class: [{ type: "dex", value: 11 }],
	hp: 52,
	hp_dice: { type: "d10", amount: 8, modifier: 8 },
	speed: { walk: "10 ft.", swim: "60 ft." },
	ability_scores: {
		strength: 17,
		dexterity: 13,
		constitution: 13,
		intelligence: 4,
		wisdom: 10,
		charisma: 4,
	},
	saving_throws: [],
	skills: [
		{ ability: "perception", modifier: 4 },
		{ ability: "stealth", modifier: 5 },
	],
	damage_vulnerabilities: [],
	damage_resistances: [],
	damage_immunities: [],
	condition_immunities: [],
	senses: { darkvision: "60 ft.", passive_perception: 14 },
	proficiency_bonus: 2,
	challenge_rating: 1,
	xp: 200,
	actions: [
		{
			name: "Tentacles",
			desc: "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can't use its tentacles on another target.",
			attack_bonus: 5,
			damage: [
				{
					damage_type: "bludgeoning",
					damage_dice: { type: "d6", amount: 2, modifier: 3 },
				},
			],
		},
		{
			name: "Ink Cloud",
			desc: "A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.",
		},
	],
	special_abilities: [
		{
			name: "Hold Breath",
			desc: "While out of water, the octopus can hold its breath for 1 hour.",
		},
		{
			name: "Underwater Camouflage",
			desc: "The octopus has advantage on Dexterity (Stealth) checks made while underwater.",
		},
		{
			name: "Water Breathing",
			desc: "The octopus can breathe only underwater.",
		},
	],
};

let testEncounter: Encounter;

beforeEach(() => {
	testEncounter = {
		participants: [],
		active: false,
		state: {
			current_round: 0,
			current_turn: "",
		},
	};
});

test("Encounters can be created", () => {
	expect(testEncounter.participants.length).toBe(0);
});

test("Monster Entry can be created", () => {
	let testEntry: MonsterEncounterEntry = {
		monster: testMonster,
		initiative: 15,
		max_hp: testMonster.hp,
		current_hp: testMonster.hp,
		active_effects: [],
	};
	testEncounter.participants.push(testEntry);
	expect(testEncounter.participants).toContain(testEntry);
	expect(testEncounter.participants.length).toBe(1);
});

/* test("Monster Entries are unique in the Encounter", () => {
	let testEntry1: MonsterEncounterEntry = {
		monster: testMonster,
		initiative: 15,
		max_hp: testMonster.hp,
		current_hp: testMonster.hp,
		active_effects: [],
	};
	let testEntry2: MonsterEncounterEntry = {
		monster: testMonster,
		initiative: 15,
		max_hp: testMonster.hp,
		current_hp: testMonster.hp,
		active_effects: [],
	};
	
	testEncounter.participants.push(testEntry1);
	testEncounter.participants.push(testEntry2);
	expect(testEncounter.participants[0]).not.toEqual(
		testEncounter.participants[1]
	);
}); */

/* describe("Monster Encounter Entries", () => {
	test("An entry can be created from a monster reference, and added to an encounter", () => {});
}); */

/* test("Encounter can be created", () => {
	let testEncounter: Encounter = {
		participants: [],
		active: true,
		state: {
			current_round: 1,
			current_turn: "boblin",
		},
	};
	
	expect(testEncounter.participants.length).toBe(0);
}); */

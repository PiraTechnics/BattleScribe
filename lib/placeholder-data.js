// Temp data to seed our DB with for testing

export const monsters = [
	{
		index: "skeleton",
		name: "Skeleton",
		size: "Medium",
		type: "undead",
		alignment: "lawful evil",
		armor_class: [
			{
				type: "armor",
				value: 13,
				desc: "armor scraps",
			},
		],
		hp: 13,
		hp_dice: {
			type: "d8",
			amount: 2,
			modifier: 4,
		},
		speed: {
			walk: "30 ft.",
		},
		ability_scores: {
			strength: 10,
			dexterity: 14,
			constitution: 15,
			intelligence: 6,
			wisdom: 8,
			charisma: 5,
		},
		damage_vulnerabilities: ["bludgeoning"], // a ref to damage_type?
		damage_resistances: [],
		damage_immunities: ["poison"],
		condition_immunities: ["poisoned", "exhaustion"], //maybe make this a ref to the condition?
		saving_throws: [],
		skills: [],
		senses: {
			darkvision: "60 ft.",
			passive_perception: 9,
		},
		languages: ["understands all languages it spoke in life but can't speak"],
		challenge_rating: 0.25,
		xp: 50,
		actions: [
			{
				name: "Shortsword",
				desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
				attack_bonus: 4,
				damage: [
					{
						damage_type: "piercing", //a ref to damage_type?
						damage_dice: { type: "d6", amount: 1, modifier: 2 },
					},
				],
			},
			{
				name: "Shortbow",
				desc: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
				attack_bonus: 4,
				damage: [
					{
						damage_type: "piercing",
						damage_dice: { type: "d6", amount: 1, modifier: 2 },
					},
				],
			},
		],
	},
	{
		index: "zombie",
		name: "Zombie",
		size: "Medium",
		type: "undead",
		alignment: "neutral evil",
		armor_class: [
			{
				type: "dex",
				value: 8,
			},
		],
		hp: 22,
		hp_dice: {
			type: "d8",
			amount: 3,
			modifier: 9,
		},
		speed: {
			walk: "20 ft.",
		},
		ability_scores: {
			strength: 13,
			dexterity: 6,
			constitution: 16,
			intelligence: 3,
			wisdom: 6,
			charisma: 5,
		},
		saving_throws: [{ ability: "wisdom", modifier: 0 }], //modifiers should use proficiency by default but can be overridden, I think?
		skills: [],
		damage_vulnerabilities: [],
		damage_resistances: [],
		damage_immunities: ["poison"],
		condition_immunities: ["poisoned"],
		senses: {
			darkvision: "60 ft.",
			passive_perception: 8,
		},
		languages: "understands all languages it spoke in life but can't speak",
		challenge_rating: 0.25,
		proficiency_bonus: 2,
		xp: 50,
		special_abilities: [
			{
				name: "Undead Fortitude",
				desc: "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.",
			},
		],
		actions: [
			{
				name: "Slam",
				desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.",
				attack_bonus: 3,
				damage: [
					{
						damage_type: "bludgeoning",
						damage_dice: { type: "d6", amount: 1, modifier: 1 },
					},
				],
			},
		],
	},
];

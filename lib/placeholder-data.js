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
		strength: 10,
		dexterity: 14,
		constitution: 15,
		intelligence: 6,
		wisdom: 8,
		charisma: 5,
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
		strength: 13,
		dexterity: 6,
		constitution: 16,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
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
	{
		index: "bandit-captain",
		name: "Bandit Captain",
		desc: "It takes a strong personality, ruthless cunning, and a silver tongue to keep a gang of bandits in line. The **bandit captain** has these qualities in spades.\n\nIn addition to managing a crew of selfish malcontents, the **pirate captain** is a variation of the bandit captain, with a ship to protect and command. To keep the crew in line, the captain must mete out rewards and punishment on a regular basis.\n\nMore than treasure, a bandit captain or pirate captain craves infamy. A prisoner who appeals to the captain’s vanity or ego is more likely to be treated fairly than a prisoner who does not or claims not to know anything of the captain’s colorful reputation.",
		size: "Medium",
		type: "humanoid",
		subtype: "any race",
		alignment: "any non-lawful alignment",
		armor_class: [
			{
				type: "armor",
				value: 15,
				armor: "Studded Leather Armor",
			},
		],
		hp: 65,
		hp_dice: { type: "d8", amount: 10, modifier: 20 },
		speed: {
			walk: "30 ft.",
		},
		strength: 15,
		dexterity: 16,
		constitution: 14,
		intelligence: 14,
		wisdom: 11,
		charisma: 14,
		saving_throws: [
			{
				ability: "strength",
				modifier: 4,
			},
			{
				ability: "dexterity",
				modifier: 5,
			},
			{
				ability: "wisdom",
				modifier: 2,
			},
		],
		skills: [
			{
				ability: "athletics",
				modifier: 4,
			},
			{
				ability: "deception",
				modifier: 4,
			},
		],
		damage_vulnerabilities: [],
		damage_resistances: [],
		damage_immunities: [],
		condition_immunities: [],
		senses: {
			passive_perception: 10,
		},
		languages: "any two languages",
		challenge_rating: 2,
		proficiency_bonus: 2,
		xp: 450,
		actions: [
			{
				name: "Multiattack",
				desc: "The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.",
			},
			{
				name: "Scimitar",
				desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
				attack_bonus: 5,
				damage: [
					{
						damage_type: "slashing",
						damage_dice: { type: "d6", amount: 1, modifier: 3 },
					},
				],
			},
			{
				name: "Dagger",
				desc: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
				attack_bonus: 5,
				damage: [
					{
						damage_type: "piercing",
						damage_dice: { type: "d4", amount: 1, modifier: 3 },
					},
				],
			},
		],
		reactions: [
			{
				name: "Parry",
				desc: "The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon.",
			},
		],
	},
	{
		index: "adult-red-dragon",
		name: "Adult Red Dragon",
		size: "Huge",
		type: "dragon",
		alignment: "chaotic evil",
		armor_class: [
			{
				type: "natural",
				value: 19,
			},
		],
		hp: 256,
		hp_dice: {
			type: "d12",
			amount: 19,
			modifier: 133,
		},
		speed: {
			walk: "40 ft.",
			climb: "40 ft.",
			fly: "80 ft.",
		},
		strength: 27,
		dexterity: 10,
		constitution: 25,
		intelligence: 16,
		wisdom: 13,
		charisma: 21,
		saving_throws: [
			{
				ability: "dexterity",
				modifier: 6,
			},
			{
				ability: "constitution",
				modifier: 13,
			},
			{
				ability: "wisdom",
				modifier: 7,
			},
			{
				ability: "charisma",
				modifier: 11,
			},
		],
		skills: [
			{
				ability: "perception",
				modifier: 13,
			},
			{
				ability: "stealth",
				modifier: 6,
			},
		],
		damage_vulnerabilities: [],
		damage_resistances: [],
		damage_immunities: ["fire"],
		condition_immunities: [],
		senses: {
			blindsight: "60 ft.",
			darkvision: "120 ft.",
			passive_perception: 23,
		},
		languages: ["Common", "Draconic"],
		challenge_rating: 17,
		proficiency_bonus: 6,
		xp: 18000,
		special_abilities: [
			{
				name: "Legendary Resistance",
				desc: "If the dragon fails a saving throw, it can choose to succeed instead.",
				usage: {
					type: "per day",
					times: 3,
				},
			},
		],
		actions: [
			{
				name: "Multiattack",
				desc: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
			},
			{
				name: "Bite",
				desc: "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage.",
				attack_bonus: 14,
				damage: [
					{
						damage_type: "piercing",
						damage_dice: { type: "d10", amount: 2, modifier: 8 },
					},
					{
						damage_type: "fire",
						damage_dice: { type: "d6", amount: 2 },
					},
				],
			},
			{
				name: "Claw",
				desc: "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
				attack_bonus: 14,
				damage: [
					{
						damage_type: "slashing",
						damage_dice: { type: "d6", amount: 2, modifier: 8 },
					},
				],
			},
			{
				name: "Tail",
				desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
				attack_bonus: 14,
				damage: [
					{
						damage_type: "bludgeoning",
						damage_dice: { type: "d8", amount: 2, modifier: 8 },
					},
				],
			},
			{
				name: "Frightful Presence",
				desc: "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
				dc: {
					ability: "wisdom",
					value: 19,
					success_type: "none",
				},
			},
			{
				name: "Fire Breath",
				desc: "The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one.",
				usage: {
					type: "recharge on roll",
					dice: "1d6",
					min_value: 5,
				},
				dc: {
					ability: "dexterity",
					value: 21,
					success_type: "none",
				},
				damage: [
					{
						damage_type: "fire",
						damage_dice: { type: "d6", amount: 18 },
					},
				],
			},
		],
		legendary_actions: [
			{
				name: "Detect",
				desc: "The dragon makes a Wisdom (Perception) check.",
			},
			{
				name: "Tail Attack",
				desc: "The dragon makes a tail attack.",
			},
			{
				name: "Wing Attack (Costs 2 Actions)",
				desc: "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
				dc: {
					ability: "dexterity",
					value: 22,
					success_type: "none",
				},
				damage: [
					{
						damage_type: "bludgeoning",
						damage_dice: { type: "d6", amount: 2, modifier: 8 },
					},
				],
			},
		],
	},
];

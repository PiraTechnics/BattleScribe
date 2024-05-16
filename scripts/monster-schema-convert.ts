import {
	ArmorClassArmor,
	ArmorClassCondition,
	ArmorClassDex,
	ArmorClassNatural,
	ArmorClassSpell,
	Action,
	ArmorClass,
	Monster,
	SavingThrowProficiency,
	SkillProficiency,
	SpecialAbility,
	SpecialAbilitySpellcasting,
	SpecialAbilitySpell,
} from "../models/monsters/types";
import {
	AbilityShort,
	Condition,
	Damage,
	DamageChoice,
	DifficultyClass,
	RollableDice,
	Skill,
} from "../models/common/types";
import { abilityFromAbbreviation, rollableFromDiceRoll } from "../lib/utils";
import { readFile, writeFile } from "fs";

export async function main() {
	//read json file
	readFile("scripts/5e-monsters-seed.json", "utf8", (error, data) => {
		if (error) throw error;
		//console.log(data);

		let retArr: Monster[] = [];

		const monsters = JSON.parse(data);
		monsters.forEach((entry: any) => {
			//console.log(`Entry found: ${entry.name}`);

			//Schema Conversion
			// separate ability scores -> under "ability_scores" object
			const ability_scores = {
				strength: entry.strength,
				dexterity: entry.dexterity,
				constitution: entry.constitution,
				intelligence: entry.intelligence,
				wisdom: entry.wisdom,
				charisma: entry.charisma,
			};

			let armor_class: ArmorClass[] = [];
			entry.armor_class.forEach((entry: any) => {
				switch (entry.type) {
					case "natural":
						const natArmor: ArmorClassNatural = {
							type: entry.type,
							value: entry.value,
							desc: entry.desc,
						};
						armor_class.push(natArmor);
						break;

					case "dex":
						const dexArmor: ArmorClassDex = {
							type: entry.type,
							value: entry.value,
							desc: entry.desc,
						};
						armor_class.push(dexArmor);
						break;
					case "armor":
						const armor: ArmorClassArmor = {
							type: entry.type,
							value: entry.value,
							desc: entry.desc,
						};
						let armor_list: string[] = [];
						entry.armor &&
							entry.armor.forEach((entry: any) => {
								//armor: entry.armor.name, //Note: might want index instead
								armor_list.push(entry.name);
							});
						armor.armor = armor_list;
						armor_class.push(armor);
						break;
					case "spell":
						const spellArmor: ArmorClassSpell = {
							type: entry.type,
							value: entry.value,
							desc: entry.desc,
							spell: entry.spell.name, //Note: might want index instead
						};
						armor_class.push(spellArmor);
						break;
					case "condition":
						const conditionArmor: ArmorClassCondition = {
							type: entry.type,
							value: entry.value,
							desc: entry.desc,
							condition: entry.condition.index,
						};
						armor_class.push(conditionArmor);
						break;
					default:
						throw new Error("Invalid armor class type");
				}
			});

			// hp_dice string -> object with math-able values
			const hp_dice: RollableDice = rollableFromDiceRoll(entry.hit_points_roll);

			// saving_throws -> split from combined proficiency list
			let saving_throws: SavingThrowProficiency[] = [];
			let skills: SkillProficiency[] = [];
			entry.proficiencies.forEach(
				(entry: {
					value: number;
					proficiency: { index: string; name: string; url: string };
				}) => {
					//check if skill or saving throw
					const splitString = entry.proficiency.name.split(": ");

					switch (splitString[0]) {
						case "Saving Throw":
							//do something with saves
							saving_throws.push({
								ability: abilityFromAbbreviation(
									splitString[1] as AbilityShort
								),
								modifier: entry.value,
							});
							break;
						case "Skill":
							skills.push({
								ability: splitString[1].toLocaleLowerCase() as Skill,
								modifier: entry.value,
							});

							break;
						default:
							throw new Error(
								`Error converting proficiency: ${splitString[0]}`
							);
					}
				}
			);

			let condition_immunities: Condition[] = [];
			entry.condition_immunities.forEach(
				(entry: { index: Condition; name: string; url: string }) => {
					condition_immunities.push(entry.index);
				}
			);

			const actions: Action[] = []; //actions CAN be not included (see tiny beasts like Frog), but should we always define the array?
			entry.actions &&
				entry.actions.forEach((entry: any) => {
					let migrated: Action = {
						name: entry.name,
						desc: entry.desc,
					};

					if (entry.attack_bonus) migrated.attack_bonus = entry.attack_bonus;
					if (entry.dc) {
						const migrated_dc: DifficultyClass = {
							ability: abilityFromAbbreviation(entry.dc.dc_type.name),
							value: entry.dc.dc_value,
							success_type: entry.dc.success_type,
						};
						migrated.dc = migrated_dc;
					}

					if (entry.damage) {
						let migratedDamageArray: Damage[] = [];
						let migratedDamageChoiceArray: DamageChoice[] = [];

						entry.damage.forEach((damage: any) => {
							// Add to damage array if type 'Damage'
							if (damage.damage_type) {
								const migratedDamage: Damage = {
									damage_type: damage.damage_type.index,
									damage_dice: rollableFromDiceRoll(damage.damage_dice),
									notes: damage.notes,
								};

								migratedDamageArray.push(migratedDamage);
							}

							// Add to damage_choice array if type 'DamageChoice'
							if (damage.choose) {
								let migratedDamageOptionsArray: Damage[] = [];
								damage.from.options.forEach((option: any) => {
									const migratedDamageOption: Damage = {
										damage_type: option.damage_type.index,
										damage_dice: rollableFromDiceRoll(option.damage_dice),
										notes: option.notes,
									};
									migratedDamageOptionsArray.push(migratedDamageOption);
								});
								const migratedDamageChoice: DamageChoice = {
									choose: damage.choose,
									from: migratedDamageOptionsArray,
								};
								migratedDamageChoiceArray.push(migratedDamageChoice);
							}
						});

						if (migratedDamageArray.length > 0)
							migrated.damage = migratedDamageArray;
						if (migratedDamageChoiceArray.length > 0)
							migrated.damage_choice = migratedDamageChoiceArray;
					}

					/* if (entry.multiattack_type)
						migrated.multiattack_type = entry.multiattack_type;
					if (entry.actions) {
						let migrated_actions: ActionOption[] = [];
						entry.actions.forEach((entry: any) => {
							let migratedEntry: ActionOption = {
								option_type: entry.option_type,
								action_name: entry.action_name,
								count: entry.count,
								type: entry.type,
								notes: entry.notes,
							};
							migrated_actions.push(migratedEntry);
						});
						migrated.actions = migrated_actions;
					}

					if (entry.action_options) {
						migrated.action_options = entry.action_options;
					} */

					actions.push(migrated);
				});

			let convertedEntry: Monster = {
				name: entry.name,
				index: entry.index,
				size: entry.size,
				type: entry.type,
				alignment: entry.alignment,
				armor_class: armor_class,
				hp: entry.hit_points,
				hp_dice: hp_dice,
				speed: entry.speed,
				ability_scores: ability_scores,
				saving_throws: saving_throws,
				skills: skills,
				damage_vulnerabilities: entry.damage_vulnerabilities,
				damage_resistances: entry.damage_resistances,
				damage_immunities: entry.damage_immunities,
				condition_immunities: condition_immunities,
				senses: entry.senses,
				proficiency_bonus: entry.proficiency_bonus,
				challenge_rating: entry.challenge_rating,
				xp: entry.xp,
				actions: actions,
			};

			if (entry.languages)
				convertedEntry.languages = entry.languages.split(", ");

			if (entry.special_abilities) {
				let special_abilities: SpecialAbility[] = [];
				entry.special_abilities.forEach((entry: any) => {
					let migrated: SpecialAbility = {
						name: entry.name,
						desc: entry.desc,
					};
					if (entry.usage) migrated.usage = entry.usage;

					//must convert dc if exists
					if (entry.dc) {
						let migrated_dc: DifficultyClass = {
							ability: abilityFromAbbreviation(entry.dc.dc_type.name),
							value: entry.dc.dc_value,
							success_type: entry.dc.success_type,
						};
						migrated.dc = migrated_dc;
					}

					//spellcasting conversion
					if (entry.spellcasting) {
						let migrated_spellcasting: SpecialAbilitySpellcasting = {
							level: entry.spellcasting.level,
							ability: abilityFromAbbreviation(entry.spellcasting.ability.name),
							dc: entry.spellcasting.dc,
							modifier: entry.spellcasting.modifier,
							components_required: entry.spellcasting.components_required,
							school: entry.spellcasting.school,
							slots: entry.spellcasting.slots,
							spells: [],
						};
						entry.spellcasting.spells.forEach((spell: any) => {
							const migrated_spell: SpecialAbilitySpell = {
								name: spell.name,
								level: spell.level,
								notes: spell.notes,
								usage: spell.usage,
							};
							migrated_spellcasting.spells.push(migrated_spell);
						});
						migrated.spellcasting = migrated_spellcasting;
					}

					special_abilities.push(migrated);
				});

				convertedEntry.special_abilities = special_abilities;
			}

			if (entry.reactions) {
				const reactions: Action[] = [];

				//conversion here

				convertedEntry.reactions = reactions;
			}
			if (entry.legendary_actions) {
				const legendary_actions: Action[] = [];

				//conversion here

				convertedEntry.legendary_actions = legendary_actions;
			}

			retArr.push(convertedEntry);
			//console.log(JSON.stringify(convertedEntry));
			//console.log(`Sucessfully parsed: ${convertedEntry.name}`);
			//console.log(retArr);
		});

		/* console.log(retArr);
		//when finished, either seed the db directly, or write out to our own json file
		return retArr; */

		writeFile(
			"scripts/converted-monsters.json",
			JSON.stringify(retArr),
			(err) => {
				if (err) console.error(err.message);
			}
		);
	});
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to convert monster data",
		err
	);
});

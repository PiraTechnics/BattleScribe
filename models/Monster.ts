import dbConnect from "@/lib/db";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

//TODO: connect to database from schema, if needed?
dbConnect();

const ArmorClassSchema = new Schema({
	type: { type: String, required: true },
	value: { type: Number, required: true },
	desc: { type: String },
});
const DiceSchema = new Schema({
	type: { type: String, required: true },
	amount: { type: Number, required: true },
	modifier: { type: Number },
});

DiceSchema.virtual("dice_roll").get(function () {
	return `${this.amount}${this.type} + ${this.modifier}`;
});

const SpeedSchema = new Schema({
	walk: { type: String },
	fly: { type: String },
	climb: { type: String },
	swim: { type: String },
	burrow: { type: String },
	hover: { type: Boolean },
});
const AbilityScoresSchema = new Schema({
	strength: { type: Number, required: true },
	dexterity: { type: Number, required: true },
	constitution: { type: Number, required: true },
	intelligence: { type: Number, required: true },
	wisdom: { type: Number, required: true },
	charisma: { type: Number, required: true },
});
const ProficiencySchema = new Schema({
	ability: { type: String, required: true },
	modifier: { type: Number, required: true },
});
const SenseSchema = new Schema({
	//Note: might want to redesign this as a name, number pair
	passive_perception: { type: Number },
	blindsight: { type: String },
	darkvision: { type: String },
	tremorsense: { type: String },
	truesight: { type: String },
});
const SpecialAbilitySchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
});
const DamageSchema = new Schema({
	damage_type: { type: String, required: true },
	damage_dice: { type: DiceSchema, required: true },
});
const ActionSchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	attack_bonus: { type: Number, reqired: true },
	damage: { type: [DamageSchema], required: true },
});

// TO-DO: Add in more esoteric sub-schema:
// ie Legendary Actions, Reactions, etc ..

const MonsterSchema = new Schema({
	index: { type: String, required: true },
	name: { type: String, required: true },
	size: { type: String, required: true },
	type: { type: String, required: true },
	alignment: { type: String, required: true },
	armor_class: { type: [ArmorClassSchema], required: true },
	hp: { type: Number, required: true }, // should be at least 1
	hp_dice: { type: DiceSchema, required: true },
	speed: { type: SpeedSchema, required: true },
	ability_scores: { type: AbilityScoresSchema, required: true },
	damage_vulnerabilities: { type: [String] },
	damage_resistances: { type: [String] },
	damage_immunities: { type: [String] },
	condition_immunities: { type: [String] },
	saving_throws: { type: [ProficiencySchema] },
	skills: { type: [ProficiencySchema] },
	senses: { type: SenseSchema },
	languages: { type: [String] },
	challenge_rating: { type: Number, required: true },
	xp: { type: Number, required: true },
	special_abilities: { type: [SpecialAbilitySchema] },
	actions: { type: [ActionSchema], required: true },
});

// TO-DO: Image support? How to source, etc?

export default mongoose.models.Monster ||
	mongoose.model("Monster", MonsterSchema);

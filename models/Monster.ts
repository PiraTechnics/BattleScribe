//import dbConnect from "@/lib/db";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

//TODO: connect to database from schema, if needed?
//dbConnect();

const ArmorClassSchema = new Schema(
	{
		type: { type: String, required: true },
		value: { type: Number, required: true },
		desc: { type: String },
		armor: { type: String },
		spell: { type: String },
		condition: { type: String },
	},
	{ _id: false }
);
const DiceSchema = new Schema(
	{
		type: { type: String, required: true },
		amount: { type: Number, required: true },
		modifier: { type: Number },
	},
	{ _id: false }
);

/* DiceSchema.virtual("dice_roll").get(function () {
	return `${this.amount}${this.type} + ${this.modifier}`;
}); */

const SpeedSchema = new Schema(
	{
		walk: { type: String },
		fly: { type: String },
		climb: { type: String },
		swim: { type: String },
		burrow: { type: String },
		hover: { type: Boolean },
	},
	{ _id: false }
);
const ProficiencySchema = new Schema(
	{
		ability: { type: String, required: true },
		modifier: { type: Number, required: true },
	},
	{ _id: false }
);
const SenseSchema = new Schema(
	{
		//Note: might want to redesign this as a name, number pair
		passive_perception: { type: Number },
		blindsight: { type: String },
		darkvision: { type: String },
		tremorsense: { type: String },
		truesight: { type: String },
	},
	{ _id: false }
);
const AbilityUsageSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ["recharge on roll", "per day", "recharge on rest"],
		},
		times: { type: Number },
		dice: { type: String },
		min_value: { type: Number },
	},
	{ _id: false }
);
const DifficultyClassSchema = new Schema(
	{
		ability: { type: String, required: true },
		value: { type: Number, required: true },
		success_type: {
			type: String,
			required: true,
			enum: ["none", "half", "other"],
		},
	},
	{ _id: false }
);
const SpecialAbilitySchema = new Schema(
	{
		name: { type: String, required: true },
		desc: { type: String, required: true },
		usage: { type: AbilityUsageSchema },
		//TO-DO: need to add in breakdown for spells and reference spell schema when created
	},
	{ _id: false }
);
const DamageSchema = new Schema(
	{
		damage_type: { type: String, required: true },
		damage_dice: { type: DiceSchema, required: true },
	},
	{ _id: false }
);
const ActionSchema = new Schema(
	{
		name: { type: String, required: true },
		desc: { type: String, required: true },
		attack_bonus: { type: Number },
		damage: { type: [DamageSchema] },
		usage: { type: AbilityUsageSchema },
		dc: { type: DifficultyClassSchema },
	},
	{ _id: false }
);

const AbilityScoresSchema = new Schema(
	{
		strength: { type: Number, required: true },
		dexterity: { type: Number, required: true },
		constitution: { type: Number, required: true },
		intelligence: { type: Number, required: true },
		wisdom: { type: Number, required: true },
		charisma: { type: Number, required: true },
	},
	{ _id: false }
);

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
	proficiency_bonus: { type: Number }, //TO-DO: figure out if this is required, and how we'd use it generally
	special_abilities: { type: [SpecialAbilitySchema] },
	actions: { type: [ActionSchema], required: true },
	reactions: { type: [ActionSchema] },
	legendary_actions: { type: [ActionSchema] },
	desc: { type: String }, //TO-DO: should sanitize this since it can contain newlines and such
});

//TO-DO get a generic 'Legendary Actions' descriptor, filling in name of monster -- virtual?
//addendum: do all mosnters with Legendary actions get 3?

// TO-DO: Image support? How to source, etc?

export default mongoose.models.Monster ||
	mongoose.model("Monster", MonsterSchema);

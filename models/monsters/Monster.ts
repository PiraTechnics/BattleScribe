import mongoose from "mongoose";
import {
	DamageSchema,
	RollableDiceSchema,
	DifficultyClassSchema,
	DamageChoiceSchema,
} from "../common/Schema";
import {
	ArmorClassArmor,
	ArmorClassCondition,
	ArmorClassDex,
	ArmorClassNatural,
	ArmorClassSpell,
	Action,
	ArmorClass,
	Senses,
	Speed,
	Monster,
	SpecialAbility,
	AbilityUsage,
	SpecialAbilitySpellcasting,
	SpecialAbilitySpell,
} from "./types";
import { AbilityScores } from "../common/types";
const Schema = mongoose.Schema;

const AbilityScoresSchema = new Schema<AbilityScores>(
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

const ArmorClassSchema = new Schema<ArmorClass>(
	{
		type: {
			type: String,
			required: true,
			enum: ["dex", "natural", "armor", "spell", "condition"],
		},
		value: { type: Number, required: true },
		desc: { type: String },
	},
	{ discriminatorKey: "type", _id: false } //double check this is needed
);

ArmorClassSchema.discriminators = {};
ArmorClassSchema.discriminators.dex = new Schema<ArmorClassDex>({});
ArmorClassSchema.discriminators.natural = new Schema<ArmorClassNatural>({});
ArmorClassSchema.discriminators.armor = new Schema<ArmorClassArmor>({
	armor: { type: [String], required: true },
});
ArmorClassSchema.discriminators.spell = new Schema<ArmorClassSpell>({
	spell: { type: String, required: true },
});
ArmorClassSchema.discriminators.condition = new Schema<ArmorClassCondition>({
	condition: {
		type: String,
		required: true,
		enum: [
			"blinded",
			"charmed",
			"deafened",
			"exhaustion",
			"frightened",
			"grappled",
			"incapacitated",
			"invisible",
			"paralyzed",
			"petrified",
			"poisoned",
			"prone",
			"restrained",
			"stunned",
			"unconscious",
		],
	},
});

const SpeedSchema = new Schema<Speed>(
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
const SenseSchema = new Schema<Senses>(
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

const AbilityUsageSchema = new Schema<AbilityUsage>(
	{
		type: {
			type: String,
			required: true,
			//enum: ["recharge on roll", "per day", "recharge after rest"],
		},
		times: { type: Number },
		dice: { type: String, enum: ["d4", "d6", "d8", "d10", "d12", "d20"] },
		min_value: { type: Number },
	},
	{ _id: false }
);

const SpecialAbilitySpellSchema = new Schema<SpecialAbilitySpell>(
	{
		name: { type: String },
		level: { type: Number },
		notes: { type: String },
		usage: AbilityUsageSchema,
	},
	{ _id: false }
);

const SpecialAbilitySpellcastingSchema = new Schema<SpecialAbilitySpellcasting>(
	{
		level: { type: Number },
		ability: { type: String },
		dc: { type: Number, index: true },
		modifier: { type: Number, index: true },
		components_required: { type: [String], index: true },
		school: { type: String, index: true },
		// As this has keys that are numbers, we have to use an `Object`, which you can't query subfields
		slots: Object,
		spells: [SpecialAbilitySpellSchema],
	},
	{ _id: false }
);

const SpecialAbilitySchema = new Schema<SpecialAbility>(
	{
		name: { type: String, required: true },
		desc: { type: String, required: true },
		attack_bonus: { type: Number },
		damage: { type: [DamageSchema], default: undefined },
		usage: AbilityUsageSchema,
		dc: DifficultyClassSchema,
		spellcasting: SpecialAbilitySpellcastingSchema,

		//TO-DO: need to add in breakdown for spells and reference spell schema when created
	},
	{ _id: false }
);

const ActionSchema = new Schema<Action>(
	{
		name: { type: String, required: true },
		desc: { type: String, required: true },
		attack_bonus: { type: Number },
		damage: { type: [DamageSchema], default: undefined },
		damage_choice: { type: [DamageChoiceSchema], default: undefined },
		usage: AbilityUsageSchema,
		dc: DifficultyClassSchema,
		/* multiattack_type: {
			type: String,
			enum: ["actions", "action_options"],
		},
		action_options: ChoiceSchema,
		actions: { type: [ActionOptionSchema] },*/
	},
	{ _id: false }
);

const MonsterSchema = new Schema<Monster>(
	{
		index: { type: String, required: true },
		name: { type: String, required: true },
		size: { type: String, required: true },
		type: { type: String, required: true },
		alignment: { type: String, required: true },
		armor_class: { type: [ArmorClassSchema], required: true },
		hp: { type: Number, required: true }, // should be at least 1
		hp_dice: { type: RollableDiceSchema, required: true },
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
		proficiency_bonus: { type: Number },
		special_abilities: { type: [SpecialAbilitySchema] },
		actions: { type: [ActionSchema] },
		reactions: { type: [ActionSchema] },
		legendary_actions: { type: [ActionSchema] },
	},
	{ toJSON: { virtuals: true } }
);

// TO-DO: Image support? How to source, etc?

export default mongoose.models.Monster ||
	mongoose.model("Monster", MonsterSchema);

import mongoose, { Types } from "mongoose";
import { ActiveEffect, Encounter, MonsterEncounterEntry } from "./types";
import Monster from "../monsters/Monster";
const Schema = mongoose.Schema;

const ActiveEffectSchema = new Schema<ActiveEffect>({
	name: { type: String, required: true },
	remaining_duration: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: `{VALUE} is not a positive integer value`,
		},
	},
	condition: {
		type: String,
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
	//TO-DO: Add Spell active effect type
});

const MonsterEntrySchema = new Schema<MonsterEncounterEntry>({
	monster: { type: Schema.Types.ObjectId, ref: Monster, required: true }, //this must be populated into a full monster, but held as a reference in DB
	initiative: { type: Number },
	max_hp: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: `{VALUE} is not a positive integer value`,
		},
	},
	current_hp: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: `{VALUE} is not a positive integer value`,
		},
	},
	active_effects: { type: [ActiveEffectSchema], default: [] },
});

/* const EncounterStateSchema = new Schema(
	{
		current_round: {
			type: Number,
			min: 0,
			validate: {
				validator: Number.isInteger,
				message: `{VALUE} is not a positive integer value`,
			},
		},
		current_turn: { type: Schema.Types.ObjectId, ref: MonsterEntrySchema },
	},
	{ _id: false }
); */

/* export const MonsterEntryModel =
	mongoose.models.MonsterEntryModel ||
	mongoose.model("MonsterEntry", MonsterEntrySchema); */

const EncounterSchema = new Schema<Encounter>({
	name: { type: String, required: true, unique: true },
	participants: { type: [MonsterEntrySchema], required: true },
	active: { type: Boolean, default: false },
	//state: EncounterStateSchema,
});

/* export const EncounterModel =
	mongoose.models.EncounterModel ||
	mongoose.model("Encounter", EncounterSchema);
 */
export default mongoose.models.Encounter ||
	mongoose.model("Encounter", EncounterSchema);

import mongoose from "mongoose";
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

const EncounterStateSchema = new Schema({
	current_round: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: `{VALUE} is not a positive integer value`,
		},
	},
	current_turn: { type: String, required: true }, //this should be name, index, or some unique id of the participant in question --- leaving it a string FOR NOW
});

const MonsterEntrySchema = new Schema<MonsterEncounterEntry>({
	monster: { type: Schema.Types.ObjectId, ref: Monster, required: true },
	initiative: { type: Number, required: true },
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

const EncounterSchema = new Schema<Encounter>({
	participants: { type: [MonsterEntrySchema], required: true },
	active: { type: Boolean, default: false },
	state: { type: EncounterStateSchema },
});

export default mongoose.models.Encounter ||
	mongoose.model("Encounter", EncounterSchema);

import mongoose from "mongoose";
import { DamageSchema, DifficultyClassSchema } from "../common/Schema";
const Schema = mongoose.Schema;

const AreaOfEffectSchema = new Schema({
	type: { type: String, required: true },
	range: { type: Number, required: true },
});

const SpellSchema = new Schema({
	index: { type: String, required: true },
	name: { type: String, required: true },
	desc: { type: [String], required: true },
	higher_level: { type: [String] },
	range: { type: String },
	components: { type: [String] },
	material: { type: String },
	duration: { type: String, required: true },
	ritual: { type: Boolean, required: true },
	concentration: { type: Boolean, required: true },
	casting_time: { type: String, required: true },
	level: { type: Number, required: true },
	area_of_effect: { type: AreaOfEffectSchema },
	attack_type: { type: String },
	dc: { type: DifficultyClassSchema },
	damage: { type: DamageSchema },
	damage_at_slot_level: { type: [String] },
	heal_at_slot_level: { type: [String] },
	school: { type: String, reqired: true }, //changed from obj
	classes: { type: [String], required: true },
});

export default mongoose.models.Spell || mongoose.model("Spell", SpellSchema);

import mongoose from "mongoose";
import { Damage, DamageChoice } from "./types";
const Schema = mongoose.Schema;

export const RollableDiceSchema = new Schema(
	{
		type: { type: String, required: true },
		amount: { type: Number, required: true },
		modifier: { type: Number },
	},
	{ _id: false }
);

export const DamageSchema = new Schema<Damage>(
	{
		damage_type: { type: String, required: true },
		damage_dice: { type: RollableDiceSchema, required: true },
		notes: { type: String },
	},
	{ _id: false }
);

export const DamageChoiceSchema = new Schema<DamageChoice>(
	{
		choose: { type: Number, required: true },
		from: { type: [DamageSchema], required: true },
	},
	{ _id: false }
);

export const DifficultyClassSchema = new Schema(
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

import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const DiceSchema = new Schema(
	{
		type: { type: String, required: true },
		amount: { type: Number, required: true },
		modifier: { type: Number },
	},
	{ _id: false }
);

export const DamageSchema = new Schema(
	{
		damage_type: { type: String, required: true },
		damage_dice: { type: DiceSchema, required: true },
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

import { CharacterClass, Damage, DifficultyClass } from "../common/types";

type MagicSchool =
	| "abjuration"
	| "conjuration"
	| "evocation"
	| "divination"
	| "enchantment"
	| "illusion"
	| "necromancy"
	| "transmutation";

type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SpellComponentType = "V" | "S" | "M";

type AreaOfEffect = {
	type: string; //ex. sphere, cube, etc...
	size: number; //in feet
};

export interface Spell {
	index: string;
	name: string;
	desc: [string];
	higher_level?: [string];
	range: string;
	components?: [SpellComponentType];
	material?: string;
	ritual: boolean;
	concentration: boolean;
	casting_time: string;
	level: SpellLevel;
	school: MagicSchool;
	classes: [CharacterClass];
	area_of_effect?: AreaOfEffect;
	attack_type?: string; //should be either ranged or melee, ye?
	dc?: DifficultyClass;
	damage?: Damage;
	damage_at_slot_level?: [string];
	heal_at_slot_level?: [string];
}

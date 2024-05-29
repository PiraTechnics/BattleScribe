import { Types } from "mongoose";
import { Condition } from "../common/types";
import { Monster } from "../monsters/types";
import { Spell } from "../spells/types";
import { Types } from "mongoose";

interface Effect {
	name: string;
	remaining_duration?: number; //duration left in rounds, not defined if not applicable
	//perhaps include any recurring things, like taking damage, here?
	// note: this could be reworked into monster abilities, spells, items, etc to store those effects and be accessed in combat -- this is solidly 'nice to have'
}

interface ConditionEffect extends Effect {
	condition: Condition;
}

interface SpellEffect extends Effect {
	spell: Spell;
}

type ActiveEffect = Effect | ConditionEffect | SpellEffect;

interface MonsterEncounterEntry {
	_id: Types.ObjectId;
	monster: Monster; //this must be populated in when an entry is queried from our DB (as the schema holds an ObjectID)
	initiative: number; //only applies if encounter is active
	max_hp: number; //comes from monster ref, but can be overridden
	current_hp: number;
	active_effects: ActiveEffect[];
}

interface Encounter {
	_id: Types.ObjectId;
	name: string;
	participants: MonsterEncounterEntry[]; //TO-DO: Expand to include players when possible
	active: boolean;
	state: {
		current_round: number;
		current_turn: MonsterEncounterEntry;
	};
}

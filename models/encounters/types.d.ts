import { Condition } from "mongoose";
import { Monster } from "../monsters/types";
import { Spell } from "../spells/types";

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
	monster: Monster; //reference to monster, do we need it all?
	initiative: number;
	max_hp: number; //comes from monster ref, but can be overridden
	current_hp: number;
	active_effects: ActiveEffect[];
}

interface Encounter {
	participants: MonsterEncounterEntry[]; //TO-DO: Expand to players when possible
	active: boolean;
	state: {
		current_round: number;
		current_turn: string; //monster or player name/reference
	};
}

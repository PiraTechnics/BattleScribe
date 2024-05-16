import {
	AbilityShort,
	Dice,
	DiceRoll,
	RollableDice,
} from "@/models/common/types";
import {
	ChallengeRating,
	Speed,
	Senses,
	SkillProficiency,
	SavingThrowProficiency,
} from "@/models/monsters/types";

export const capitalizeWords = (string: string) => {
	let capitalized = "";
	const arr = string.split(" ");
	arr.forEach((word, i) => {
		capitalized += capitalize(word);
		if (i + 1 !== arr.length) capitalized += " ";
	});

	return capitalized;
};

export const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const abbreviate = (string: string) => {
	return string.slice(0, 3).toUpperCase();
};

export const abilityFromAbbreviation = (short: AbilityShort) => {
	switch (short) {
		case "STR":
			return "strength";
		case "DEX":
			return "dexterity";
		case "CON":
			return "constitution";
		case "INT":
			return "intelligence";
		case "WIS":
			return "wisdom";
		case "CHA":
			return "charisma";
		default:
			throw new Error("Invalid ability abbreviation!");
	}
};

export const diceRollFromRollable = (rollable: RollableDice) => {
	const diceRoll: DiceRoll = (rollable.amount +
		rollable.type +
		(rollable.modifier && rollable.modifier > 0
			? `+${rollable.modifier}`
			: `${rollable.modifier}`)) as DiceRoll;

	return diceRoll;
};

export const rollableFromDiceRoll = (diceRoll: DiceRoll) => {
	const arr = diceRoll.split(/[d]|[+]|[-]/);

	const type: Dice = ("d" + arr[1]) as Dice;
	const amount: number = parseInt(arr[0]);
	//account for negative modifiers
	const modifier = diceRoll.includes("-")
		? parseInt(`-${arr[2]}`)
		: parseInt(arr[2]); //potentially undefined?

	const rollable: RollableDice = {
		type: type,
		amount: amount,
		modifier: modifier,
	};

	return rollable;
};

export const commaSeparatedList = (array: Array<string>) => {
	let string = "";
	array.forEach((entry, i) => {
		string += capitalize(entry);
		if (i + 1 !== array.length) string += ", ";
	});

	return string;
};

export const formatChallengeRating = (cr: ChallengeRating) => {
	if (cr === 0.125) return "1/8";
	else if (cr === 0.25) return "1/4";
	else if (cr === 0.5) return "1/2";
	else return cr.toString();
};

export const formatXP = (xp: number) => {
	return `(${xp.toString()} XP)`;
};

export const formatSpeeds = (speeds: Speed) => {
	let formattedArr: Array<string> = [];
	const speedsArr: [string, string | boolean][] = Object.entries(speeds);
	speedsArr.forEach((entry) => {
		const speedType = capitalize(entry[0]);
		const speedVal = typeof entry[1] === `string` ? entry[1] : "";

		formattedArr.push(`${speedType} ${speedVal}`);
	});

	return formattedArr;
};

export const formatSkills = (proficiences: Array<SkillProficiency>) => {
	let formattedArr: Array<string> = [];
	proficiences.forEach((entry) => {
		formattedArr.push(`${capitalize(entry.ability)} +${entry.modifier}`);
	});

	return formattedArr;
};

export const formatSavingThrows = (
	proficiences: Array<SavingThrowProficiency>
) => {
	let formattedArr: Array<string> = [];
	proficiences.forEach((entry) => {
		formattedArr.push(`${abbreviate(entry.ability)} +${entry.modifier}`);
	});

	return formattedArr;
};

export const formatSenses = (senses: Senses) => {
	let formattedSenses: Array<string> = [];
	const sensesArray = Object.entries(senses);

	sensesArray.forEach((entry) => {
		const senseName = capitalizeWords(entry[0].replace("_", " "));
		const senseVal = entry[1].toString();
		formattedSenses.push(`${senseName} ${senseVal}`);
	});

	return formattedSenses;
};

export const diceRoll = (dice: RollableDice) => {
	return `${dice.amount}${dice.type} + ${dice.modifier}`;
};

export const formatAbilityModifier = (score: number) => {
	if (!score || score > 30 || score < 0) {
		throw new Error("Invalid Ability Score"); //TODO: properly catch this somewhere
	}
	const result = Math.floor((score - 10) / 2);
	return `(${result >= 0 ? "+" : ""}${result})`;
};

export const shortName = (name: string) => {
	const nameArr = name.split(" ");
	return nameArr[nameArr.length - 1];
	//TO-DO: check for cases where the final word in the name is not appropriate for shortened naming -- see what we can do here (perhaps have it be a schema field sourced by the author?)
};

export const legendaryActionsHeader = (name: string) => {
	return `The ${shortName(
		name
	).toLowerCase()} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${shortName(
		name
	).toLowerCase()} regains spent legendary actions at the start of its turn.`;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

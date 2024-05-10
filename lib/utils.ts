import {
	challengeRating,
	creatureSpeed,
	monsterSenses,
	proficiency,
	rollableDice,
} from "./definitions/monster";

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

export const commaSeparatedList = (array: Array<string>) => {
	let string = "";
	array.forEach((entry, i) => {
		string += capitalize(entry);
		if (i + 1 !== array.length) string += ", ";
	});

	return string;
};

export const formatChallengeRating = (cr: challengeRating) => {
	if (cr === 0.2) return "1/8";
	else if (cr === 0.25) return "1/4";
	else if (cr === 0.5) return "1/2";
	else return cr.toString();
};

export const formatXP = (xp: number) => {
	return `(${xp.toString()} XP)`;
};

export const formatSpeeds = (speeds: creatureSpeed) => {
	let formattedArr: Array<string> = [];
	const speedsArr: [string, string | boolean][] = Object.entries(speeds);
	speedsArr.forEach((entry) => {
		const speedType = capitalize(entry[0]);
		const speedVal = typeof entry[1] === `string` ? entry[1] : "";

		formattedArr.push(`${speedType} ${speedVal}`);
	});

	return formattedArr;
};

export const formatSkills = (proficiences: Array<proficiency>) => {
	let formattedArr: Array<string> = [];
	proficiences.forEach((entry) => {
		formattedArr.push(`${capitalize(entry.ability)} +${entry.modifier}`);
	});

	return formattedArr;
};

export const formatSavingThrows = (proficiences: Array<proficiency>) => {
	let formattedArr: Array<string> = [];
	proficiences.forEach((entry) => {
		formattedArr.push(`${abilityAbbrev(entry.ability)} +${entry.modifier}`);
	});

	return formattedArr;
};

export const formatSenses = (senses: monsterSenses) => {
	let formattedSenses: Array<string> = [];
	const sensesArray = Object.entries(senses);

	sensesArray.forEach((entry) => {
		const senseName = capitalizeWords(entry[0].replace("_", " "));
		const senseVal = entry[1].toString();
		formattedSenses.push(`${senseName} ${senseVal}`);
	});

	return formattedSenses;
};

export const diceRoll = (dice: rollableDice) => {
	return `${dice.amount}${dice.type} + ${dice.modifier}`;
};

export const formatAbilityModifier = (score: number) => {
	if (!score || score > 30 || score < 0) {
		throw new Error("Invalid Ability Score"); //TODO: properly catch this somewhere
	}
	const result = Math.floor((score - 10) / 2);
	return `(${result >= 0 ? "+" : ""}${result})`;
};

export const abilityAbbrev = (ability: string) => {
	return ability.slice(0, 3).toUpperCase();
};

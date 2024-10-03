export function wait(timeout: number): Promise<any> {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

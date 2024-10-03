import { Movie, MoviePosterSizes } from '@/types/schemas';
import { capitalizeFirstLetter, getRandomNumber } from './helpers';

const words = [
	'lorems',
	'ipsum',
	'simply',
	'unknown',
	'generator',
	'theory',
	'sit',
	'amet',
	'injected',
	'non-characteristic',
];

const generateTitle = (): string => {
	const titleLength = getRandomNumber(2, 6);
	const title = Array.from(
		{ length: titleLength },
		() => words[getRandomNumber(0, words.length - 1)],
	).join(' ');
	return capitalizeFirstLetter(title);
};

const generateDescription = (): string => {
	const descriptionLength = getRandomNumber(14, 42);
	const description = Array.from(
		{ length: descriptionLength },
		() => words[getRandomNumber(0, words.length - 1)],
	).join(' ');
	return capitalizeFirstLetter(description);
};

export const generateRandomMovies = (
	count: number,
	size: MoviePosterSizes = MoviePosterSizes.SIZE_BANNER,
): Movie[] => {
	const movies: Movie[] = [];
	const [width, height] = size.split('x');

	for (let i = 1; i <= count; i++) {
		movies.push({
			id: i,
			title: generateTitle(),
			description: generateDescription(),
			imgUrl: `https://picsum.photos/${width}/${height}?random=${getRandomNumber(1, 2000)}`,
			booked: false,
			favorite: false,
		});
	}
	return movies;
};

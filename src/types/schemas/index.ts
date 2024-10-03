export interface Movie {
	id: number;
	title: string;
	description: string;
	imgUrl: string;
	booked: boolean;
	favorite: boolean;
}

export enum MoviePosterSizes {
	SIZE_BANNER = '500x750',
}

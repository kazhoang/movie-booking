import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateRandomMovies } from '@/utils/movieGenerator';
import { Movie } from '@/types/schemas';

interface MoviesState {
	movies: Movie[];
}

const initialState: MoviesState = {
	movies: generateRandomMovies(1000),
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		toggleStatusBookMovie: (state, action: PayloadAction<number>) => {
			const movie = state.movies.find(m => m.id === action.payload);
			if (movie) {
				movie.booked = true;
			}
		},
		toggleStatusFavoriteMovie: (state, action: PayloadAction<number>) => {
			const movie = state.movies.find(m => m.id === action.payload);
			if (movie) {
				movie.favorite = !movie.favorite;
			}
		},
	},
});

export const { toggleStatusBookMovie, toggleStatusFavoriteMovie } =
	moviesSlice.actions;
export default moviesSlice.reducer;

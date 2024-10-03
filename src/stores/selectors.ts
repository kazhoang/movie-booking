import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';

export const selectMovies = (state: RootState) => state.movies.movies;

const selectBookedIds = (state: RootState) => state.booked.booked;
export const selectBookedMovies = createSelector(
	[selectMovies, selectBookedIds],
	(movies, bookedIds) => {
		return movies.filter(movie => bookedIds.includes(movie.id));
	},
);

const selectFavoriteIds = (state: RootState) => state.favorites.favorites;
export const selectFavoriteMovies = createSelector(
	[selectMovies, selectFavoriteIds],
	(movies, favoriteIds) => {
		return movies.filter(movie => favoriteIds.includes(movie.id));
	},
);

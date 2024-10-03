import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
	favorites: number[];
}

const initialState: FavoritesState = {
	favorites: [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<number>) => {
			state.favorites.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<number>) => {
			state.favorites = state.favorites.filter(id => id !== action.payload);
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

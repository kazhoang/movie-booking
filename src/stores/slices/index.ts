import { combineReducers } from '@reduxjs/toolkit';

import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';
import bookedReducer from './bookedSlice';

const rootReducer = combineReducers({
	movies: moviesReducer,
	favorites: favoritesReducer,
	booked: bookedReducer,
});

export default rootReducer;

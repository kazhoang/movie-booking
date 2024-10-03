import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookedState {
	booked: number[];
}

const initialState: BookedState = {
	booked: [],
};

const bookedSlice = createSlice({
	name: 'booked',
	initialState,
	reducers: {
		addBooked: (state, action: PayloadAction<number>) => {
			if (!state.booked.includes(action.payload)) {
				state.booked.push(action.payload);
			}
		},
	},
});

export const { addBooked } = bookedSlice.actions;
export default bookedSlice.reducer;

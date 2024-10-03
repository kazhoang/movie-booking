import React from 'react';
import { View, Keyboard } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';

import { useSelector } from 'react-redux';
import { selectBookedMovies } from '@/stores/selectors';
import MovieList from '@/components/molecules/MovieList';

const HistoryBookingScreen = () => {
	const { layout, backgrounds, gutters } = useTheme();
	const bookedMovies = useSelector(selectBookedMovies);

	return (
		<SafeScreen isTopEdge>
			<View
				testID="booked-screen"
				onTouchStart={() => {
					Keyboard.dismiss();
				}}
				style={[layout.flex_1, backgrounds.base, gutters.paddingHorizontal_16]}
			>
				<View style={layout.flex_1}>
					<MovieList movies={bookedMovies} testID="booked-list" />
				</View>
			</View>
		</SafeScreen>
	);
};

export default HistoryBookingScreen;

import React from 'react';
import { View, Keyboard } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';

import { useSelector } from 'react-redux';
import { selectFavoriteMovies } from '@/stores/selectors';
import MovieList from '@/components/molecules/MovieList';

const FavoritesScreen = () => {
	const { layout, backgrounds, gutters } = useTheme();
	const favoriteMovies = useSelector(selectFavoriteMovies);

	return (
		<SafeScreen isTopEdge>
			<View
				testID="favorites-screen"
				onTouchStart={() => {
					Keyboard.dismiss();
				}}
				style={[layout.flex_1, backgrounds.base, gutters.paddingHorizontal_16]}
			>
				<View style={layout.flex_1}>
					<MovieList movies={favoriteMovies} testID="favorite-list" />
				</View>
			</View>
		</SafeScreen>
	);
};

export default FavoritesScreen;

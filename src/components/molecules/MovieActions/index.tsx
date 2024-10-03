import React, { memo, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores';
import { addFavorite, removeFavorite } from '@/stores/slices/favoritesSlice';
import { toggleStatusFavoriteMovie } from '@/stores/slices/moviesSlice';
import { Movie } from '@/types/schemas';
import { useTheme } from '@/theme';
import CheckBooked from '@/theme/assets/images/check.png';
import Favorites from '@/theme/assets/images/favorites.png';
import { useAppNavigation } from '@/navigators/Application';
import { RouteName } from '@/types/navigation';

interface MovieActionsProps {
	movie: Movie;
	style?: ViewStyle | ViewStyle[];
	testIndex?: number;
}

const MovieActions = memo(({ movie, style, testIndex }: MovieActionsProps) => {
	const { t } = useTranslation(['common']);
	const navigation = useAppNavigation();

	const dispatch = useDispatch<AppDispatch>();
	const { components, backgrounds, gutters, layout, fonts, borders } =
		useTheme();

	const onBookPress = useCallback(() => {
		navigation.navigate(RouteName.BOOKING, { movie, testIndex });
	}, [navigation, movie]);

	const onFavoritePress = useCallback(() => {
		dispatch(toggleStatusFavoriteMovie(movie.id));
		if (!movie.favorite) {
			dispatch(addFavorite(movie.id));
		} else {
			dispatch(removeFavorite(movie.id));
		}
	}, [dispatch, movie]);

	return (
		<View style={[layout.row, layout.justifyCenter, style]}>
			{!movie.booked ? (
				<TouchableOpacity
					testID={`navigate-booking-action-${testIndex}`}
					style={[
						layout.row,
						layout.itemsCenter,
						backgrounds.grayTransparent,
						gutters.paddingHorizontal_16,
						gutters.marginRight_40,
						borders.rounded_36,
					]}
					onPress={onBookPress}
				>
					<Text style={[fonts.gray800, fonts.bold]}>{t('common:book')}</Text>
				</TouchableOpacity>
			) : (
				<View
					testID={`booked-checker-${testIndex}`}
					style={[
						components.buttonCircle,
						backgrounds.primary,
						gutters.marginRight_40,
					]}
				>
					<Image
						source={CheckBooked}
						style={components.image24x28}
						tintColor="#fff"
					/>
				</View>
			)}

			<TouchableOpacity
				testID={`fav-action-${testIndex}`}
				style={[components.buttonCircle, movie.favorite && backgrounds.red500]}
				onPress={onFavoritePress}
			>
				<Image
					source={Favorites}
					style={components.image24x28}
					tintColor="#fff"
				/>
			</TouchableOpacity>
		</View>
	);
});

export default MovieActions;

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	RootStackScreenProps,
	useTabNavigation,
} from '@/navigators/Application';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme';

import { BackButton, ImageVariant } from '@/components/atoms';
import { RouteName, TabName } from '@/types/navigation';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores';
import { toggleStatusBookMovie } from '@/stores/slices/moviesSlice';
import { addBooked } from '@/stores/slices/bookedSlice';

const BookingScreen = ({
	route: {
		params: { movie, testIndex },
	},
}: RootStackScreenProps<RouteName.BOOKING>) => {
	const tabNavigation = useTabNavigation();
	const insets = useSafeAreaInsets();
	const { t } = useTranslation(['common']);
	const { layout, fonts, backgrounds, components, gutters, borders, colors } =
		useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const handleBook = () => {
		dispatch(toggleStatusBookMovie(movie.id));
		dispatch(addBooked(movie.id));
		tabNavigation.navigate(TabName.BOOKED);
	};

	return (
		<View style={[layout.flex_1, backgrounds.base]}>
			<ScrollView style={layout.flex_1} testID="booking-screen">
				<View style={components.movieBanner}>
					<ImageVariant
						imageUrl={movie.imgUrl}
						style={components.movieBanner}
					/>
					<LinearGradient
						colors={['#000', 'transparent']}
						start={{
							x: 0,
							y: 1,
						}}
						end={{
							x: 0,
							y: 0,
						}}
						style={components.linearStyle}
					/>
				</View>
				<View style={[gutters.padding_16]}>
					<View
						style={[backgrounds.card, gutters.padding_16, borders.rounded_36]}
					>
						<Text
							style={[
								fonts.alignCenter,
								fonts.gray900,
								fonts.bold,
								gutters.marginBottom_16,
								fonts.size_24,
							]}
						>
							{movie.title}
						</Text>
						<Text
							style={[
								fonts.gray800,
								fonts.size_16,
								fonts.alignCenter,
								fonts.lineHeight24,
								gutters.marginBottom_16,
							]}
						>
							{movie.description}
						</Text>
					</View>
					<TouchableOpacity
						testID={`booking-action-${testIndex}`}
						style={[components.button, gutters.marginTop_16]}
						onPress={handleBook}
						hitSlop={10}
					>
						<Text style={[fonts.size_16, fonts.white, fonts.bold]}>
							{t('common:book')}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ height: insets.bottom + 16 }} />
			</ScrollView>
			<BackButton />
		</View>
	);
};

export default BookingScreen;

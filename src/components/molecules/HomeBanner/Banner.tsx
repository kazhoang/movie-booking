import React, { memo } from 'react';
import { Text, View } from 'react-native';
import ImageVariant from '../../atoms/ImageVariant';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme';
import { Movie } from '@/types/schemas';
import { useTranslation } from 'react-i18next';
import { BANNER_CARD_WIDTH } from '@/constants';

import MovieActions from '../MovieActions';

interface BannerProps {
	movie: Movie;
	testIndex?: number;
}

const Banner = memo(({ movie, testIndex }: BannerProps) => {
	const { t } = useTranslation(['common']);
	const { components, gutters, layout, fonts, borders } = useTheme();

	return (
		<View style={{ width: BANNER_CARD_WIDTH }} testID={`banner-${testIndex}`}>
			<View>
				<ImageVariant
					imageUrl={movie.imgUrl}
					style={components.movieBanner}
					testID={`banner-image-${testIndex}`}
				/>
				<LinearGradient
					colors={['#000', 'transparent']}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
					style={components.linearStyle}
				/>
				<MovieActions
					testIndex={testIndex}
					movie={movie}
					style={[
						layout.absolute,
						layout.bottom0,
						layout.z100,
						gutters.padding_16,
						layout.fullWidth,
					]}
				/>
			</View>
			<View style={[gutters.padding_16, borders.rounded_36]}>
				<Text
					testID={`banner-title-${testIndex}`}
					style={[
						fonts.gray800,
						fonts.size_32,
						fonts.bold,
						gutters.marginVertical_16,
					]}
				>
					{movie.title}
				</Text>
				<Text style={[fonts.gray400, fonts.size_16]}>
					{movie.description || t('common:noData')}
				</Text>
			</View>
		</View>
	);
});

export default Banner;

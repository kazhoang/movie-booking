import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import ImageVariant from '../../atoms/ImageVariant';
import { useTranslation } from 'react-i18next';
import { Movie } from '@/types/schemas';
interface ItemProps {
	movie: Movie;
	testID?: string;
}

const MovieItem = memo(({ movie, testID }: ItemProps) => {
	const { t } = useTranslation(['common']);
	const { fonts, backgrounds, layout, borders, components, gutters } =
		useTheme();

	return (
		<View
			testID={testID}
			style={[
				layout.row,
				layout.overflowHidden,
				backgrounds.grayTransparent,
				borders.rounded_8,
				gutters.marginVertical_16,
			]}
		>
			<ImageVariant
				imageUrl={movie.imgUrl}
				style={components.movieImg}
				borderRadius={8}
			/>
			<View style={[layout.flex_1, gutters.margin_16]}>
				<Text
					style={[
						fonts.size_16,
						fonts.bold,
						gutters.marginBottom_8,
						fonts.gray800,
					]}
				>
					{movie.title}
				</Text>
				<Text style={[fonts.size_14, fonts.gray400]} numberOfLines={5}>
					{movie.description || t('common:noData')}
				</Text>
			</View>
		</View>
	);
});

export default MovieItem;

import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';
import { moderateScale, screenWidth } from '@/types/theme/responsive';
import {
	ASPECT_RATIO_BANNER,
	BANNER_CARD_WIDTH,
	REVIEW_HEIGHT,
	REVIEW_WIDTH,
	THUMBNAIL_CARD_WIDTH,
} from '@/constants';

export default ({
	layout,
	backgrounds,
	fonts,
	gutters,
	borders,
	colors,
}: ComponentTheme) => {
	return {
		button: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.primary,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(48),
			width: '100%',
		},
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.grayTransparent,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(56),
			width: moderateScale(56),
		},
		movieBanner: {
			width: BANNER_CARD_WIDTH,
			aspectRatio: ASPECT_RATIO_BANNER,
			opacity: 0.9,
		},
		movieImg: {
			width: THUMBNAIL_CARD_WIDTH,
			aspectRatio: ASPECT_RATIO_BANNER,
		},
		linearStyle: {
			height: '40%',
			...layout.absolute,
			...layout.bottom0,
			...layout.left0,
			...layout.right0,
			...layout.z10,
		},
		image24: {
			height: moderateScale(24),
			width: moderateScale(24),
		},
		image24x28: {
			height: moderateScale(24),
			width: moderateScale(28),
		},
		image32: {
			height: moderateScale(32),
			width: moderateScale(32),
			tintColor: colors.gray800,
		},
		card: {
			...gutters.padding_16,
			...gutters.marginBottom_16,
			...borders.rounded_8,
			...backgrounds.card,
		},
		divider: {
			...borders.bottom_1,
			...borders.gray400,
			...gutters.marginVertical_16,
			...gutters.marginHorizontal_16,
		},
	} as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};

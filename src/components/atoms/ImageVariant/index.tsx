import React, { useState } from 'react';
import { ImageStyle, ImageResizeMode, View, Image } from 'react-native';
import Skeleton from './Skeleton';
import { CachedImage } from './CachedImage';
import { MOVIE_NOT_FOUND_URL } from '@/constants';

type ImageVariantProps = {
	imageUrl: string;
	style: ImageStyle;
	borderRadius?: number;
	resizeMode?: ImageResizeMode;
	placeholder?: string;
	fallback?: string;
	loadingIndicator?: boolean;
	testID?: string;
};

const ImageVariant: React.FC<ImageVariantProps> = ({
	imageUrl,
	style,
	borderRadius,
	resizeMode = 'cover',
	fallback = MOVIE_NOT_FOUND_URL,
	loadingIndicator = true,
	testID,
}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleLoadEnd = () => {
		setLoading(false);
	};

	const handleError = () => {
		setLoading(false);
		setError(true);
	};

	return (
		<View style={[style, { borderRadius, overflow: 'hidden' }]}>
			{loading && loadingIndicator && (
				<Skeleton style={style} borderRadius={borderRadius} />
			)}
			<CachedImage
				style={[style, { borderRadius }]}
				source={error && fallback ? { uri: fallback } : { uri: imageUrl }}
				resizeMode={resizeMode}
				onLoadEnd={handleLoadEnd}
				onError={handleError}
				testID={testID}
			/>
		</View>
	);
};

export default ImageVariant;

import {
	CachedImageProps,
	CachedImageURISource,
	CacheHandler,
	ImageCache,
} from '@/utils/imageHandler';
import React, { useEffect, useState } from 'react';
import { Image, Platform } from 'react-native';
const FILE_PREFIX = Platform.OS === 'ios' ? '' : 'file://';

export const CachedImage: React.FC<CachedImageProps> = ({
	source,
	mutable,
	...props
}) => {
	const [path, setPath] = useState<string | undefined>(undefined);
	const uri = typeof source === 'object' && 'uri' in source ? source.uri : '';

	const handler: CacheHandler = (path: string) => {
		setPath(path);
	};

	useEffect(() => {
		if (uri) {
			ImageCache.get().on(source as CachedImageURISource, handler, !mutable);
		}

		return () => {
			if (uri) {
				ImageCache.get().dispose(uri, handler);
			}
		};
	}, [uri, mutable]);

	return (
		<Image {...props} source={path ? { uri: FILE_PREFIX + path } : source} />
	);
};

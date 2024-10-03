import React from 'react';
import Banner from './Banner';
import { Movie } from '@/types/schemas';
import { FlatList } from 'react-native';

const HomeBanner = ({ data }: { data: Movie[] }) => {
	const renderMovieBanner = ({
		item,
		index,
	}: {
		item: Movie;
		index: number;
	}) => {
		return <Banner movie={item} testIndex={index} />;
	};

	return (
		<FlatList
			testID="home-banner"
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			horizontal
			data={data}
			renderItem={renderMovieBanner}
			removeClippedSubviews
			maxToRenderPerBatch={5}
			initialNumToRender={3}
			keyExtractor={item => `home-banner'-${item.id.toString()}-${item}`}
		/>
	);
};

export default HomeBanner;

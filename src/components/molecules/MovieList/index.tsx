import React, { memo } from 'react';
import MovieItem from './MovieItem';
import { FlatList } from 'react-native';
import { Movie } from '@/types/schemas';

interface MovieListProps {
	movies: Movie[];
	testID?: string;
}

const MovieList = memo(({ movies, testID }: MovieListProps) => {
	const renderItem = ({ item, index }: { item: Movie; index: number }) => (
		<MovieItem movie={item} testID={`${testID}-item-${index}`} />
	);

	return (
		<FlatList
			testID={testID}
			showsVerticalScrollIndicator={false}
			data={movies}
			renderItem={renderItem}
			keyExtractor={item => `${testID}-${item.id.toString()}-${item.imgUrl}`}
			nestedScrollEnabled
		/>
	);
});

export default MovieList;

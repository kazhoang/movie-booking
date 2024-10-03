import React from 'react';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { ScrollView } from 'react-native';
import { HomeBanner } from '@/components/molecules';

const MoviesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
	const { backgrounds } = useTheme();
	const movies = useSelector((state: RootState) => state.movies.movies);

	return (
		<SafeScreen isTopEdge={false}>
			<ScrollView
				style={backgrounds.base}
				showsVerticalScrollIndicator={false}
				testID="movies-screen"
			>
				<HomeBanner data={movies} />
			</ScrollView>
		</SafeScreen>
	);
};

export default MoviesScreen;

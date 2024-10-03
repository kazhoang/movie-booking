import React, { useCallback } from 'react';

import { useTheme } from '@/theme';

import { RouteName, TabName } from '@/types/navigation';
import { BookingScreen, MoviesScreen, FavoritesScreen } from '@/screens';
import {
	NavigationContainer,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
	BottomTabBarProps,
	BottomTabNavigationProp,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Movie } from '@/types/schemas';
import AnimatedTabBar from '@/components/atoms/AnimatedTabBar';
import HistoryBookingScreen from '@/screens/HistoryBookingScreen';

export type RootStackParamList = {
	[RouteName.HOME]: undefined;
	[RouteName.BOOKING]: {
		movie: Movie;
		testIndex?: number;
	};
};

export type TabParamList = {
	[TabName.TOP]: undefined;
	[TabName.FAVORITES]: undefined;
	[TabName.BOOKED]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
	NativeStackScreenProps<TabParamList, T>;

export const useAppNavigation = () => {
	return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};

export const useTabNavigation = () => {
	return useNavigation<BottomTabNavigationProp<TabParamList>>();
};

export function useAppRouteParam<T extends keyof RootStackParamList>() {
	const route = useRoute<RouteProp<RootStackParamList, T>>();
	return route.params;
}

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	const renderTabBar = useCallback((props: BottomTabBarProps) => {
		return <AnimatedTabBar {...props} />;
	}, []);

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator
				initialRouteName={RouteName.HOME} // Start with the tab bar
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name={RouteName.HOME} options={{ headerShown: false }}>
					{() => (
						<Tab.Navigator
							key={variant}
							initialRouteName={TabName.TOP}
							screenOptions={{ headerShown: false }}
							tabBar={renderTabBar}
						>
							<Tab.Screen
								name={TabName.TOP}
								component={MoviesScreen}
								options={{ tabBarTestID: 'tab-movies' }}
							/>
							<Tab.Screen
								name={TabName.FAVORITES}
								component={FavoritesScreen}
								options={{ tabBarTestID: 'tab-favorites' }}
							/>
							<Tab.Screen
								name={TabName.BOOKED}
								component={HistoryBookingScreen}
								options={{ tabBarTestID: 'tab-booked' }}
							/>
						</Tab.Navigator>
					)}
				</Stack.Screen>
				<Stack.Screen
					name={RouteName.BOOKING}
					component={BookingScreen}
					options={{
						animation: 'fade',
						presentation: 'transparentModal',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;

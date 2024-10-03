import React from 'react';
import './translations';

import { ThemeProvider } from '@/theme';

import ApplicationNavigator from './navigators/Application';
import store from './stores';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';

export const storage = new MMKV();

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider storage={storage}>
				<ApplicationNavigator />
			</ThemeProvider>
		</Provider>
	);
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
//import { Platform, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Text, View } from 'react-native';
//import { View } from 'react-native';

import AppNavigation from './src/Navigations/AppNavigation';

import { ReduxStore } from '@Redux';

export default () => (
	<Provider store={ReduxStore}>
		<AppNavigation />
	</Provider>
);

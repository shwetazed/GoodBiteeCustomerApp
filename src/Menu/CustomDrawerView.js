import React, { Component, createRef } from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ScalingDrawer from 'react-native-scaling-drawer';

import NavigationService from './NavigationService';

import Home from './screens/Home';
import Profile from './screens/Profile';
import LeftMenu from './LeftMenu';

const AppStack = createStackNavigator({
	Home: {
		screen: Home
	},
	Profile: {
		screen: Profile
	}
});

export const drawer = createRef();

const defaultScalingDrawerConfig = {
	scalingFactor: 1,
	minimizeFactor: 0.6,
	swipeOffset: 6
};
const AppStack1 = createAppContainer(AppStack);
export default class AppNavigation extends Component {
	render() {
		return (
			<ScalingDrawer
				ref={drawer}
				content={<LeftMenu drawer={drawer} />}
				{...defaultScalingDrawerConfig}
				onClose={() => console.log('close')}
				onOpen={() => console.log('open')}
			>
				<AppStack1
					ref={navigatorRef => {
						NavigationService.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</ScalingDrawer>
		);
	}
}

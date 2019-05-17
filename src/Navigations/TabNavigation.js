// import React from 'react';
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

// const TabBarComponent = props => <BottomTabBar {...props} />;

// const TabNavigation = createBottomTabNavigator(
// {
//     HomeScreen:HomeScreen,
//     SearchScreen:SearchScreen,
// },
//     {
//         tabBarComponent: props => (
//             <TabBarComponent {...props} style={{ borderTopColor: "#605F60" }} />
//         )

//     }
// );

// export default TabNavigation;

import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import HomeScreen from '@Screens/Home/HomeScreen';
import SearchScreen from '@Screens/Search/SearchScreen';
import * as colors from '@Utils/colors';

import ProjImages from '@res/Images';

const COLORS = {
	//tabBG: 'rgb(254, 193, 101)',
	tabBG: 'white',

	itemInactiveColor: 'rgb(55, 62, 69)',
	itemActiveColor: colors.green
};

const Images = {
	tab1: ProjImages.home,
	tab1Selected: ProjImages.homeSelected,
	tab2: ProjImages.search,
	tab2Selected: ProjImages.searchSelected
};

const getTabImage = (index, focused) => {
	const imageName = `tab${index}${focused ? 'Selected' : ''}`;
	return <Image {...Images[imageName]} />;
};

const RouteConfigs = {
	tab1: {
		screen: HomeScreen,
		navigationOptions: {
			title: 'Home',
			tabBarIcon: ({ focused }) => getTabImage(1, focused)
		}
	},
	tab2: {
		screen: SearchScreen,
		navigationOptions: {
			title: 'Search',
			tabBarIcon: ({ focused }) => getTabImage(2, focused)
		}
	}
};

class TabBarView extends React.Component {
	state = { hideTabBar: false };

	componentDidMount() {
		// hide show event based
		// requestAnimationFrame(() => this.setState({ hideTabBar }));
	}

	render() {
		if (this.state.hideTabBar) {
			return null;
		}
		return (
			<View style={{ marginTop: Dimensions.get('window').width > 414 ? -14 : -8 }}>
				<View
					style={{
						height: 24,
						width: '100%',
						marginBottom: -15,
						backgroundColor: COLORS.tabBG
					}}
				/>
				<BottomTabBar {...this.props} />
			</View>
		);
	}
}

const BottomTabNavigatorConfig = {
	initialRouteName: 'tab1',
	backBehavior: 'initialRoute',
	tabBarOptions: {
		activeTintColor: COLORS.itemActiveColor,
		inactiveTintColor: COLORS.itemInactiveColor
	},
	tabBarComponent: props => (
		<TabBarView {...props} style={{ borderTopColor: COLORS.tabBG, backgroundColor: COLORS.tabBG }} />
	)
};

export default createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);

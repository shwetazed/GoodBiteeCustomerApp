import React, { Component } from 'react';
import { Platform, Dimensions, ScrollView, Image, View } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems, TouchableOpacity } from 'react-navigation';
import ProfileScreen from '@Screens/Profile/ProfileScreen';
import TabNavigation from '@Navigations/TabNavigation';
import CustomDrawerContentComponent from './CustomDrawerContentComponent';
import HelpScreen from '@Screens//Help/HelpScreen';
import AboutScreen from '@Screens/About/AboutScreen';
import OrderScreen from '@Screens/Order/OrderScreen';
import OfferListScreen from '@Screens/Offer/OfferListScreen';
import { AsyncStorage } from 'react-native';

import Images from '@Images';

const WIDTH = Dimensions.get('window').width;
// /		<DrawerItems {...props} />

// const CustomDrawerContentComponent = props => (
// 	<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
// 		<Image
// 			style={{
// 				flex: 1,
// 				position: 'absolute',
// 				height: 175,
// 				width: '100%'
// 			}}
// 			source={Images.headerBg.source}
// 		/>

// 		<Image
// 			style={{
// 				width: 100,
// 				height: 100,
// 				borderRadius: 100 / 2,
// 				alignSelf: 'center',
// 				borderWidth: 0.2,
// 				top: 70
// 			}}
// 			source={require('@res/Images/vip.jpg')}
// 		/>

// 		<View style={{ marginTop: 100 }}>
// 			<GoodBiteFlatList
// 				arrayList={['Profile', 'Orders', 'Payment', 'Help', 'About']}
// 				listType={'drawer_list'}
// 				navigation={props}
// 			/>
// 		</View>
// 	</ScrollView>
// );
{
	/* <DrawerItems {...props} />; */
}
const DrawerNavigator = createDrawerNavigator(
	{
		Home: {
			screen: TabNavigation,
			navigationOptions: () => ({})
		},

		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: () => ({})
		},
		HelpScreen: {
			screen: HelpScreen,
			navigationOptions: () => ({})
		},
		AboutScreen: {
			screen: AboutScreen,
			navigationOptions: () => ({})
		},
		OrderScreen: {
			screen: OrderScreen,
			navigationOptions: () => ({})
		},
		OfferListScreen: {
			screen: OfferListScreen,
			navigationOptions: () => ({})
		}
	},

	{
		initialRouteName: 'Home',
		//contentComponent: CustomDrawerContentComponent,
		contentComponent: ({ navigation }) => <CustomDrawerContentComponent navigation={navigation} type="user" />,
		contentOptions: {
			activeTintColor: 'gray',
			activeBackgroundColor: 'transparent',
			inactiveTintColor: 'gray',
			itemsContainerStyle: {
				marginVertical: 0
			},
			iconContainerStyle: {
				opacity: 1
			},
			itemStyle: {
				height: 50
			}
		}
	}
	//DrawerConfig
);

export default createAppContainer(DrawerNavigator);

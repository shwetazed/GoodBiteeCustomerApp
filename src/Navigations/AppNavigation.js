import React, { Component, createRef } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
//import { StackNavigatorHelper } from "react-navigation-helper";

import LoginScreen from '@Screens/Authorization/LoginScreen';
import SignUpScreen from '@Screens/Authorization/SignUpScreen';
import WelcomeScreen from '@Screens/Home/WelcomeScreen';
import KitchenDetailScreen from '@Screens/Search/KitchenDetailScreen';
import HelpScreen from '@Screens/Help/HelpScreen';

import CartScreen from '@Screens/Cart/CartScreen';
import DrawerNavigator from './DrawerNavigator';

import HomeScreen from '@Screens/Home/HomeScreen';
import SearchScreen from '@Screens/Search/SearchScreen';
import KitchenListScreen from '@Screens/Search/KitchenListScreen';

import AddToCartScreen from '@Screens/Cart/AddToCartScreen';
import EditProfileScreen from '@Screens/Profile/EditProfileScreen';
import ProfileScreen from '@Screens/Profile/ProfileScreen';
import MessageListScreen from '@Screens/Message/MessageListScreen';
import MessageDetailScreen from '@Screens/Message/MessageDetailScreen';
import HelpGuideScreen from '@Screens/Help/HelpGuideScreen';
import HelpGuideDetailScreen from '@Screens/Help/HelpGuideDetailScreen';
import AboutScreen from '@Screens/About/AboutScreen';
import EditAccountScreen from '@Screens/Profile/EditAccountScreen';
import SetDeliveryAddressScreen from '@Screens/Address/SetDeliveryAddressScreen';
import DeliveryDetailsScreen from '@Screens/Address/DeliveryDetailsScreen';
import PopUp from '@Screens/Search/PopUp';
import OrderIssueScreen from '@Screens/Help/OrderIssueScreen';
import HelpGuideQuestionsScreen from '@Screens/Help/HelpGuideQuestionsScreen';

import TrackingScreen from '@Screens/Tracking/TrackingScreen';

import FacebookSignIn from '@Screens/FacebookSignIn';

import CustomDrawerContentComponent from '@Navigations/CustomDrawerContentComponent';
import ScalingDrawer from 'react-native-scaling-drawer';
import NavigationService from '@Menu/NavigationService';
import OfferListScreen from '@Screens/Offer/OfferListScreen';
import MySliderEx from '@Screens/MySliderEx';
import ImagePickEx from '@Screens/ImagePickEx';
import Searching from '@Screens/Searching';
import Splash from '@Screens/Splash';
import CircleShapeImage from '@Components/Common/CircleShapeImage';
import TabShow from '@Screens/TabShow';
import Feedback from '@Screens/Feedback/FeedbackScreen';
import Search from '@Screens/Searching';
import ApplyPromoScreen from '@Screens/Cart/ApplyPromoScreen';
import PastOrder from '@Screens/Order/PastOrder';

const navigationOptions = { header: null };
const AppNavigation = createStackNavigator(
	{
		DrawerNavigator,
		EditProfileScreen,
		LoginScreen: { screen: LoginScreen, navigationOptions },
		CustomDrawerContentComponent,
		SignUpScreen,
		CartScreen,
		ProfileScreen,
		HelpScreen,
		MessageListScreen,
		MessageDetailScreen,
		HelpGuideScreen,
		HelpGuideDetailScreen,
		AboutScreen,
		OrderIssueScreen,
		WelcomeScreen,
		KitchenDetailScreen,
		HomeScreen,
		SearchScreen,
		KitchenListScreen,
		AddToCartScreen,
		EditAccountScreen,
		SetDeliveryAddressScreen,
		DeliveryDetailsScreen,
		PopUp,
		TrackingScreen,
		FacebookSignIn,

		OfferListScreen,
		MySliderEx,
		ImagePickEx,
		CircleShapeImage,
		Searching,
		Splash,
		TabShow,

		Feedback,
		HelpGuideQuestionsScreen,
		ApplyPromoScreen,
		PastOrder,
		Search
	},
	{
		//initialRouteName: 'AboutScreen',
		//initialRouteName: 'CustomDrawerContentComponent',
		initialRouteName: 'Splash',
		//initialRouteName: 'AddIngredients',

		headerMode: 'none'
	}
);
export const drawer = createRef();

const defaultScalingDrawerConfig = {
	scalingFactor: 1,
	minimizeFactor: 0.8,
	swipeOffset: 1
};

//export default createAppContainer(AppNavigation);
const AppStack1 = createAppContainer(AppNavigation);

export default class AppNavigation1 extends Component {
	render() {
		return (
			<ScalingDrawer
				ref={drawer}
				content={<CustomDrawerContentComponent drawer={drawer} />}
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

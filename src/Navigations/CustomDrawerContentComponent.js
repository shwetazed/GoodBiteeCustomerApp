import React, { Component } from 'react';
import { Platform, Dimensions, ScrollView, Image, View, TouchableOpacity, FlatList, Text } from 'react-native';
import GoodBiteFlatList from '@Components/ListView/GoodBiteFlatList';
import DrawerMenuListItem from '@Components/Common/DrawerMenuListItem';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@Utils/Helper/DeviceHelper';
import * as colors from '@Utils/colors';
import CircleShapeImage from '@Components/Common/CircleShapeImage';
import NavigationService from '@Menu/NavigationService';
import { SAVE_LOCAL_DATA } from '@Core/Storage';
import SpinnerEx from '@Components/Common/SpinnerEx';
import UserManger from '@Networking/UserManager';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

import Images from '@Images';

let that;

class CustomDrawerContentComponent extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			spinner: false
		};
	}

	componentDidMount() {
		that = this;
	}
	onLogoutHandler() {
		//	this.state.spinner = true;
		UserManger.logoutUser(Config.USER_ID).then(response => {
			console.warn('response', response);
			if (response.status == 'success') {
				console.warn('in success : ', response.status);

				SAVE_LOCAL_DATA('USER', { user_id: '' });

				Config.USER_ID = '';
				this.props.setUserData(undefined);
				this.props.setCartData([]);

				NavigationService.navigate('LoginScreen');
				this.props.drawer.current.close();
			} else {
				//this.setState({ spinner: false });
				if (response.msg == 'User not available.') {
					Config.USER_ID = '';
					SAVE_LOCAL_DATA('USER', { user_id: '' });
					this.props.setUserData(undefined);
					this.props.setCartData([]);
					that.props.navigation.push('LoginScreen');
				}
				DISPLAY_ALERT('Good Bitee', response.msg);
			}
		});
	}
	renderNullImage() {
		return (
			<View
				style={{
					width: 100,
					height: 100,
					borderRadius: 100 / 2,

					justifyContent: 'center',
					alignSelf: 'center',

					backgroundColor: '#cccccc'
				}}
			>
				<Text style={{ color: '#000', alignSelf: 'center' }}>Add Photo</Text>
			</View>
		);
	}
	renderImage(image) {
		console.warn('renderImage', image);
		return (
			<Image
				style={{
					width: 100,
					height: 100,
					borderRadius: 100 / 2,

					alignSelf: 'center',
					borderWidth: 0.2
					//top: this.props.marginTop == null ? 10 : this.props.marginTop
				}}
				source={image}
			/>
		);
	}
	renderAsset(image) {
		if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
			return this.renderVideo(image);
		}

		return this.renderImage(image);
	}
	render() {
		let image;
		if (this.props.userData) {
			if (this.props.userData.image_thumb_url) {
				image = this.props.userData.image_thumb_url;
			}
		}
		console.warn('rrerender', image);

		if (this.state.spinner) {
			return <SpinnerEx />;
		}
		return (
			<View>
				<ScrollView style={{ backgroundColor: 'white' }} bounces={false} showsVerticalScrollIndicator={false}>
					<Image
						style={{
							flex: 1,
							position: 'absolute',
							height: 175,
							width: '100%'
						}}
						source={Images.headerBg.source}
					/>
					<View style={{ top: 60 }}>
						<View>{image ? this.renderAsset({ uri: image }) : this.renderNullImage()}</View>
						{/* <CircleShapeImage
								smallImage={Images.smallImage.source}
								isImageSelected={Images.default.source}
								image={{ uri: image }}
								type={'profile_image'}
							/> */}
					</View>

					<View style={{ marginTop: 80, height: SCREEN_HEIGHT - 200 }}>
						<FlatList
							showsVerticalScrollIndicator={false}
							//scrollEnabled={false}
							horizontal={false}
							data={['Home', 'Profile', 'Orders', 'Payment', 'Help', 'About', 'Offers']}
							//data={['Home', 'Offers']}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										console.warn('Test');
										console.warn(item);
										if (item == 'Home') {
											NavigationService.navigate('Home');
											this.props.drawer.current.close();
										} else if (item == 'Profile') {
											NavigationService.navigate('ProfileScreen');
											//NavigationService.navigate('AddFoodScreen');
											this.props.drawer.current.close();
										} else if (item == 'Orders') {
											NavigationService.navigate('OrderScreen');
											this.props.drawer.current.close();
										} else if (item == 'Payment') {
											NavigationService.navigate('ProfileScreen');
											this.props.drawer.current.close();
										} else if (item == 'Help') {
											NavigationService.navigate('HelpScreen');
											this.props.drawer.current.close();
										} else if (item == 'About') {
											NavigationService.navigate('AboutScreen');
											this.props.drawer.current.close();
										} else if (item == 'Offers') {
											NavigationService.navigate('OfferListScreen');
											this.props.drawer.current.close();
										}
									}}
								>
									<DrawerMenuListItem>{item}</DrawerMenuListItem>
								</TouchableOpacity>
							)}
						/>
						<TouchableOpacity
							style={{
								backgroundColor: colors.green,
								flexDirection: 'row',
								height: 55,
								width: '100%',

								alignItems: 'center'
								//justifyContent: 'center'
							}}
							onPress={
								() => this.onLogoutHandler()
								//this.signOut()
							}
						>
							<View style={{ flex: 0.3, height: '70%' }}>
								<Image
									style={{
										width: '100%',
										height: '100%',
										//borderWidth: 1,
										resizeMode: 'contain'
									}}
									source={require('@res/Images/logout.png')}
								/>
							</View>
							<View style={{ flex: 0.04 }} />
							<View
								style={{
									flex: 0.6,
									height: '100%',
									justifyContent: 'center'
								}}
							>
								<Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Sign Out</Text>
							</View>
						</TouchableOpacity>
						<View
							style={{
								...Platform.select({ android: { height: 23, width: '100%' } })
							}}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}
export default connect(
	state => ({
		userData: state.userData,
		cartData: state.cartData
	}),
	{
		setUserData: Actions.setUserData,
		setCartData: Actions.setCartData
	}
)(CustomDrawerContentComponent);

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Images } from '@Images';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

let that;
class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		that = this;
		setTimeout(() => {
			GET_LOCAL_DATA('USER').then(data => {
				console.warn('in Slash...', data);
				if (data != undefined) {
					if (data.user_id == '' || data.user_id == null || data.user_id == undefined) {
						this.props.navigation.push('LoginScreen');
					} else {
						if (data.user_id != '' || data.user_id != undefined) {
							console.warn('in Slash...2');
							GET_LOCAL_DATA('CART_DATA').then(data => {
								this.props.setCartData(data);
							});
							GET_LOCAL_DATA('USER').then(data => {
								this.props.setUserData(data);
								Config.USER_ID = data.user_id;
								that.props.navigation.push('DrawerNavigator');
							});
						} else {
							this.props.navigation.push('LoginScreen');
						}
					}
				} else {
					this.props.navigation.push('LoginScreen');
				}
			});
		}, 2000);
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ width: '%', height: '20%' }}>
					{/* <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={Images.logo.source} /> */}
					<Image style={{ height: '100%', width: '100%' }} source={require('@res/Images/GoodbiteLogo.png')} />
				</View>
			</View>
		);
	}
}
export default connect(
	state => ({
		userData: state.userData,
		kitchenData: state.kitchenData,
		cartData: state.cartData
	}),
	{
		setKitchenProfileData: Actions.setKitchenProfileData,
		setUserData: Actions.setUserData,
		setCartData: Actions.setCartData
	}
)(Splash);

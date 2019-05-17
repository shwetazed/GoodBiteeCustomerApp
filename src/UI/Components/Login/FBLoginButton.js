import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { ShareApi } from 'react-native-fbsdk';
import { SAVE_LOCAL_DATA } from '@Core/Storage';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

let that;
const device = '';

class FBLoginButton extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			pic: '',
			success: 'false',
			device: '',
			user: ''
		};
	}

	componentDidMount() {
		that = this;
		if (Platform.OS === 'ios') {
			this.setState({ device: 'ios' });
		} else {
			this.setState({ device: 'android' });
		}
	}
	SignUp(json) {
		console.warn('IN FB SIGNUP NAME ', json.name, ' PIC ', json.picture.data.url, ' APPID ', json.id);

		fetch('http://goodbitee.com/web_services/social_signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				role_id: Config.ROLE_ID,
				full_name: json.name,
				url: json.picture.data.url,
				app_id: json.id,
				signup_type: 'facebook',
				device_type: this.state.device
			})
		})
			.then(responseSend => responseSend.json())
			.then(response => {
				console.warn('message type is : ', response);

				if (response.status == 'success') {
					Config.USER_ID = response.user_id;
					SAVE_LOCAL_DATA('USER', response);
					SAVE_LOCAL_DATA('CART_DATA', response.CartDetail);

					that.props.setUserData(response);
					this.props.setCartData(response.CartDetail);

					that.props.navigation.push('DrawerNavigator');

					console.warn('Response here in end ', response.msg);
					//this.AlertBox('Good Bitee', response.msg);
				} else {
					DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(error => {
				console.warn(error);
			});
	}

	initUser = token => {
		console.warn('In the init user method-------------');
		fetch('https://graph.facebook.com/v2.5/me?fields=id,name,email,picture&access_token=' + token)
			.then(response => response.json())
			.then(json => {
				//this.setState({ user: json });
				this.SignUp(json);

				console.warn('User values Here ', ' ID ', json.id, json.name, ' Picture ', json.picture.data.url);
			})
			.catch(() => {
				Alert.alert('ERROR GETTING DATA FROM FACEBOOK');
				reject('ERROR GETTING DATA FROM FACEBOOK');
			});
	};

	AlertBox(alertTitle, response) {
		Alert.alert(
			alertTitle,
			response.msg,
			[
				{
					text: 'OK',
					onPress: () => {
						response.msg == 'This app_id is already exist.'
							? this.props.nav.push('DrawerNavigator')
							: this.props.nav.push('WelcomeScreen');
					}
				}
			],
			{ cancelable: false }
		);
	}

	handleFacebookLogin() {
		//console.warn('in ');
		LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
			function(result, error) {
				if (result.isCancelled) {
					console.warn('Login cancelled', error);
				} else {
					console.warn('Login success with permissions: ' + result.grantedPermissions.toString());
					AccessToken.getCurrentAccessToken().then(data => {
						//const infoRequest = new GraphRequest('/me?fields=id,name,picture', null, this._responseInfoCallback);
						// Start the graph request.
						//new GraphRequestManager().addRequest(infoRequest).start();
						console.warn('Token is : ' + data.accessToken);
						//that.setState({ name: data.accessToken });
						that.initUser(data.accessToken.toString());

						console.warn('Login success with permissions22222: ' + this.state.success);
					});
				}
			},
			function(error) {
				console.log('Login fail with error: ' + error);
			}
		);
	}
	render() {
		return (
			<View>
				<TouchableOpacity
					style={{ height: 60, width: 60, borderRadius: 50, justifyContent: 'center', backgroundColor: 'blue' }}
					onPress={this.handleFacebookLogin}
				>
					<Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 25 }}>f</Text>
				</TouchableOpacity>
			</View>
		);
	}

	_responseInfoCallback = (error, result) => {
		if (error) {
			alert('Error fetching data: ' + error.toString());
		} else {
			this.setState({ name: result.name, pic: result.picture.data.url });

			console.warn(result.name, ' Facebook id ', result.id, ' URL ', result.picture.data.url + ' result ', result);
		}
	};
}
const styles = StyleSheet.create({
	// container: {
	// 	flex: 0,
	// 	backgroundColor: '#fff',
	// 	alignItems: 'center',
	// 	justifyContent: 'center'
	// },
	facebookbutton: {
		height: 50,
		width: 50,
		borderRadius: 30,
		backgroundColor: 'blue'
	}
});
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
)(FBLoginButton);

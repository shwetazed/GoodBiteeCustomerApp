// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';

// export default class GPlusLoginButton extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			user: null
// 		};
// 	}

// 	async _setupGoogleSignin() {
// 		try {
// 			await GoogleSignin.hasPlayServices({ autoResolve: true });
// 			await GoogleSignin.configure({
// 				webClientId: '83044935058-5phaf7p8j7fg91pqot0b2ff2q5kavm4o.apps.googleusercontent.com',
// 				offlineAccess: false
// 			});
// 			const user = await GoogleSignin.currentUserAsync();
// 			console.warn(user);
// 			this.setState({ user });
// 		} catch (err) {
// 			console.warn('Play services error', err.code, err.message);
// 		}
// 	}
// 	_signIn() {
// 		GoogleSignin.signIn()
// 			.then(user => {
// 				console.warn(user);
// 				this.setState({ user: user });
// 			})
// 			.catch(err => {
// 				console.warn('WRONG SIGNIN', err);
// 			})
// 			.done();
// 	}

// 	SignIn = async () => {
// 		try {
// 			console.warn('Clicked : 0');
// 			await GoogleSignin.hasPlayServices();
// 			console.warn('Clicked : 1');
// 			const userInfo = await GoogleSignin.signIn();
// 			console.warn('Clicked : ', userInfo);
// 			this.setState({ user: userInfo });
// 		} catch (error) {
// 			console.warn('Errors here: ', error);
// 			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
// 				// user cancelled the login flow
// 			} else if (error.code === statusCodes.IN_PROGRESS) {
// 				// operation (f.e. sign in) is in progress already
// 			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
// 				// play services not available or outdated
// 			} else {
// 				// some other error happened
// 			}
// 		}
// 	};

// 	_signOut() {
// 		GoogleSignin.revokeAccess()
// 			.then(() => GoogleSignin.signOut())
// 			.then(() => {
// 				this.setState({ user: null });
// 			})
// 			.done();
// 	}

// 	componentDidMount() {
// 		//this._setupGoogleSignin();
// 	}

// 	render() {
// 		return (
// 			<TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this.SignIn()}>
// 				<Text style={styles.socialButtonText}>{this.props.children}</Text>
// 			</TouchableOpacity>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		width: 60,
// 		height: 60,
// 		backgroundColor: '#F03E18',
// 		borderRadius: 50,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	socialButtonText: {
// 		color: 'white',
// 		textAlign: 'center',
// 		fontSize: 20,
// 		fontWeight: 'bold'
// 	}
// });

import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
// import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import SpinnerEx from '@Components/Common/SpinnerEx';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { SAVE_LOCAL_DATA } from '@Core/Storage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

class GPLoginButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: '',
			user: '',
			device: '',
			spinner: false
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			//It is mandatory to call this method before attempting to call signIn()
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
			// Repleace with your webClientId generated from Firebase console
			webClientId: '147779439166-nplubt754ou2klavfj88efptot8p4bln.apps.googleusercontent.com'
		});

		if (Platform.OS === 'ios') {
			this.setState({ device: 'ios' });
		} else {
			this.setState({ device: 'android' });
		}
	}

	// async getVal() {
	// 	const time = await AsyncStorage.getItem('FIRST');
	// 	console.warn('comes in time ', time);
	// }

	SignUp() {
		fetch('http://goodbitee.com/web_services/social_signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				role_id: Config.ROLE_ID,
				//email: 'manu@gmail.com',
				email: this.state.userInfo.email,
				full_name: this.state.userInfo.name,
				url: this.state.userInfo.photo,
				app_id: this.state.userInfo.id,
				signup_type: 'Google',
				device_type: this.state.device
			})
		})
			.then(responseSend => responseSend.json())
			.then(response => {
				console.warn('Response is : ', response);
				//	this.setState({ fullName: '', phoneNum: '', email: '', password: '', spinner: false });

				if (response.status == 'success') {
					Config.USER_ID = response.user_id;
					SAVE_LOCAL_DATA('USER', response);
					SAVE_LOCAL_DATA('CART_DATA', response.CartDetail);

					this.props.setUserData(response);
					this.props.setCartData(response.CartDetail);

					this.props.navigation.push('DrawerNavigator');
					//this.AlertBox('Good Bitee', response);
				} else {
					console.warn('In else block ', response);
					//this.setStatus({ spinner: false });
					this.AlertBox('Good Bitee', response.msg);
					//DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(error => {
				console.warn(error);
			});
	}

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

	_signIn = async () => {
		//Prompts a modal to let the user sign in into your application.
		try {
			await GoogleSignin.hasPlayServices({
				//Check if device has Google Play Services installed.
				//Always resolves to true on iOS.
				showPlayServicesUpdateDialog: true
			});
			const userInfo = await GoogleSignin.signIn();
			console.warn('User Info --> ', userInfo.user);
			this.setState({ userInfo: userInfo.user });
			this.SignUp();
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			} else if (error.code === statusCodes.IN_PROGRESS) {
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			} else {
			}
		}
	};
	_getCurrentUser = async () => {
		//May be called eg. in the componentDidMount of your main component.
		//This method returns the current user
		//if they already signed in and null otherwise.
		try {
			const userInfo = await GoogleSignin.signInSilently();
			this.setState({ userInfo });
		} catch (error) {
			console.error(error);
		}
	};
	_signOut = async () => {
		//Remove user session from the device.
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			this.setState({ user: null }); // Remove the user from your app's state as well
		} catch (error) {
			console.error(error);
		}
	};
	_revokeAccess = async () => {
		//Remove your application from the user authorized applications.
		try {
			await GoogleSignin.revokeAccess();
			console.log('deleted');
		} catch (error) {
			console.error(error);
		}
	};
	render() {
		if (this.state.spinner == true) {
			return <SpinnerEx />;
		}
		return (
			<TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this._signIn()}>
				<Text style={styles.socialButtonText}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		backgroundColor: '#F03E18',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	socialButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
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
)(GPLoginButton);

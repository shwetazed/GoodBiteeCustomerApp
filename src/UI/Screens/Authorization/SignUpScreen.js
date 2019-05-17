import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Alert,
	Platform,
	ActivityIndicator
} from 'react-native';
import LoginHeader from '@Components/Login/LoginHeader';
import InputText from '@Components/Login/InputText';
import Button from '@Components/Login/Button';
import Images from '@Images';
import UserManger from '@Networking/UserManager';
import { DISPLAY_ALERT } from '@Utils/Alert';
//import Loader from '@Components/Common/Loader';
import * as colors from '@Utils/colors';
import { IS_EMAIL_VALID, PASSWORD_LIMIT, IS_EMAIL_EMPTY } from '@Utils/Validation';
import { Config } from '@Core/Config';

import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
let that;

class SignUpScreen extends Component {
	static navigationOptions = { header: null };

	state = { fullName: '', phoneNum: '', email: '', password: '', device: '', visible: false };

	onChangeTextHandler = (text, type) => {
		if (type == 'Full Name') {
			this.setState({
				fullName: text
			});
		} else if (type == 'Phone No') {
			this.setState({
				phoneNum: text
			});
		} else if (type == 'Email') {
			this.setState({
				email: text
			});
		} else {
			this.setState({
				password: text
			});
		}
	};
	async componentDidMount() {
		if (Platform.OS === 'ios') {
			this.setState({ device: 'ios' });
		} else {
			this.setState({ device: 'android' });
		}
	}

	showSpinner = () => {
		console.log('Show Spinner');
		this.setState({ visible: true });
	};

	hideSpinner = () => {
		console.log('Hide Spinner');
		this.setState({ visible: false });
		//return null;
	};

	onSignUpActionHandler() {
		this.setState({ visible: true });
		if (this.state.fullName.length == 0) {
			DISPLAY_ALERT('Good Bitee', 'name can not be blank! ');

			return;
		}
		if (this.state.phoneNum.length == 0) {
			DISPLAY_ALERT('Good Bitee', 'phone number can not be blank! ');

			return;
		}
		if (IS_EMAIL_VALID(this.state.email) == false) {
			DISPLAY_ALERT('Good Bitee', 'please enter a valid email id!');

			return;
		}
		if (PASSWORD_LIMIT(this.state.password) == false) {
			DISPLAY_ALERT('Good Bitee', 'password should be minimum 6 character!');

			return;
		}
		//that.setState({ spinner: false });

		UserManger.signUpUser(this.state.fullName, this.state.phoneNum, this.state.email, this.state.password)
			.then(response => {
				console.warn('response:', response);
				console.log('response:', response);

				if (response.status == 'success') {
					//this.setState({ visible: false });

					Config.USER_ID = response.user_id;
					SAVE_LOCAL_DATA('USER', response);
					SAVE_LOCAL_DATA('CART_DATA', response.CartDetail);

					this.props.setUserData(response);
					this.props.setCartData(response.CartDetail);

					this.props.navigation.push('DrawerNavigator');
					//that.AlertBox('Good Bitee', response.msg);
				} else {
					this.setState({ visible: false });
					this.setState({ fullName: '', phoneNum: '', email: '', password: '', visible: false });
					DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(function(error) {
				this.setState({ visible: false });
				console.warn('error:', error);
				console.log('error:', error);
			});
	}

	AlertBox(alertTitle, AlertMessage, user_id) {
		Alert.alert(
			alertTitle,
			AlertMessage,
			[
				{
					text: 'OK',
					onPress: () => {
						if (AlertMessage == 'User added successfully.') {
							this.props.navigation.navigate('WelcomeScreen');
						} else {
							this.props.navigation.navigate('LoginScreen');
						}
					}
				}
			],
			{ cancelable: false }
		);
	}

	render() {
		const { visible } = this.state;

		if (visible == true) {
			return (
				// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.loading}>
					<ActivityIndicator size="large" color={colors.green} animating />
				</View>
			);
		}

		return (
			<ImageBackground source={Images.login.source} style={styles.backgroundImageContainer}>
				<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: '10%' }}>
					<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
						<LoginHeader>Sign Up With</LoginHeader>
						<View style={styles.inputContainer}>
							<InputText
								image={Images.name.source}
								onChangeTextHandler={this.onChangeTextHandler}
								inputValue={this.state.fullName}
								isSecure={false}
							>
								Full Name
							</InputText>
						</View>
						<View style={styles.inputContainer}>
							<InputText
								image={Images.phone.source}
								onChangeTextHandler={this.onChangeTextHandler}
								inputValue={this.state.phoneNum}
								isSecure={false}
							>
								Phone No
							</InputText>
						</View>
						<View style={styles.inputContainer}>
							<InputText
								image={Images.email.source}
								onChangeTextHandler={this.onChangeTextHandler}
								inputValue={this.state.email}
								isSecure={false}
							>
								Email
							</InputText>
						</View>
						<View style={styles.inputContainer}>
							<InputText
								image={Images.password.source}
								onChangeTextHandler={this.onChangeTextHandler}
								inputValue={this.state.password}
								isSecure={true}
							>
								Password
							</InputText>
						</View>
						<Button
							style={{ backgroundColor: colors.green }}
							onPressButton={() => {
								this.onSignUpActionHandler();
							}}
						>
							Sign Up
						</Button>

						<View style={styles.signUpContainer}>
							<Text style={styles.signUpText}>Already have an account?</Text>
							<TouchableOpacity>
								<Text
									style={styles.signUpButton}
									onPress={() => {
										this.props.navigation.pop();
									}}
								>
									Sign In
								</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity>
							<Text style={styles.forgotPasswordButton}>Forgot Password?</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//marginTop: (HEADER_SIZE = isIphoneX() ? 20 : 0),
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImageContainer: {
		width: '100%',
		height: '100%'
	},
	inputContainer: {
		paddingBottom: 20,
		alignItems: 'center'
	},
	signUpContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingTop: 40
	},
	signUpButton: {
		color: colors.green,
		fontSize: 15
	},
	signUpText: {
		color: 'gray',
		fontSize: 15
	},
	forgotPasswordButton: {
		color: colors.green,
		fontSize: 15,
		paddingTop: 40,
		paddingBottom: 40
	},
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.5,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
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
)(SignUpScreen);

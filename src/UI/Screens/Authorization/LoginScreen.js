import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	ImageBackground,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
	Modal
} from 'react-native';
import LoginHeader from '@Components/Login/LoginHeader';
import InputText from '@Components/Login/InputText';
import Button from '@Components/Login/Button';
import { DISPLAY_ERROR_ALERT } from '@Utils/Alert';
import { IS_EMAIL_VALID, PASSWORD_LIMIT, IS_EMAIL_EMPTY } from '@Utils/Validation';
import { DISPLAY_ALERT } from '@Utils/Alert';
import axios from 'react-native-axios';
import UserManger from '@Networking/UserManager';
import * as colors from '@Utils/colors';
import SpinnerEx from '@Components/Common/SpinnerEx';
import { SAVE_LOCAL_DATA } from '@Core/Storage';
import { Config } from '@Core/Config';

import Images from '@Images';
import ForgotPasswordController from './ForgotPasswordController';
import { connect } from 'react-redux';
import { Actions } from '@Redux';

let that;

class LoginScreen extends Component {
	constructor(props) {
		super(props);
	}
	state = { email: '', password: '', visible: false, forgotPasswordModalVisible: false };

	componentDidMount() {
		that = this;
	}

	onChangeTextHandler = (text, type) => {
		if (type == 'Email') {
			this.setState({
				email: text
			});
		} else {
			this.setState({
				password: text
			});
		}
	};

	AlertBox(alertTitle, AlertMessage, user_id) {
		Alert.alert(
			alertTitle,
			AlertMessage,
			[
				{
					text: 'OK',
					onPress: () => {
						this.props.navigation.navigate('WelcomeScreen');
					}
				}
			],
			{ cancelable: false }
		);
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

	btnForgotPassword() {
		this.setState({ forgotPasswordModalVisible: true });
		console.warn('In Toggle method ', this.state.forgotPasswordModalVisible);
	}

	callbackAfterForgotPassword(success, otherValue) {
		this.setState({ forgotPasswordModalVisible: false });
		console.log('success >> ' + success + ' otherValue >> ' + otherValue);
	}

	onLoginActionHandler() {
		//this.showSpinner();
		this.setState({ visible: true });

		console.warn('Config.ROLE_ID', Config.ROLE_ID);

		UserManger.loginUser(this.state.email, this.state.password, Config.ROLE_ID)
			.then(response => {
				console.warn('response', response);
				//this.hideSpinner();
				if (response.status == 'success') {
					console.warn('response is ', response.status);
					//this.hideSpinner();
					this.setState({ visible: false });

					Config.USER_ID = response.user_id;
					SAVE_LOCAL_DATA('USER', response);
					SAVE_LOCAL_DATA('CART_DATA', response.CartDetail);

					this.props.setUserData(response);
					this.props.setCartData(response.CartDetail);

					this.props.navigation.push('DrawerNavigator');
				} else {
					//this.hideSpinner();
					this.setState({ visible: false });
					DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(error => {
				console.warn('error:', error);
			});
	}
	moveToLandingPage() {
		this.props.navigation.push('WelcomeScreen');
	}
	usingFetch(URL) {
		fetch(URL)
			.then(response => response.json())
			.then(responseJson => {
				console.warn('fetchType', JSON.stringify(responseJson, null, 2));
				return responseJson.movies;
			})
			.catch(error => {
				console.log(error);
			});
	}
	usingAxios(URL) {
		axios.get(URL).then(response => {
			console.warn('axios', JSON.stringify(response.data, null, 2));
		});
	}
	usingAxiosWithBaseURL(baseURL, endPoint) {
		const instance = axios.create({
			baseURL,
			timeout: 1000,
			headers: { 'X-Custom-Header': 'foobar' }
		});
		instance.get(endPoint).then(response => {
			console.warn('usingAxiosWithBaseURL', JSON.stringify(response.data, null, 2));
		});
	}
	test() {
		console.warn('test on click');
	}
	static navigationOptions = { header: null };

	render() {
		const { email, password, visible, forgotPasswordModalVisible } = this.state;

		if (visible == true) {
			//return <Loader />;
			return (
				// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.loading}>
					<ActivityIndicator size="large" color={colors.green} animating />
				</View>
			);
		}

		return (
			<ImageBackground source={Images.login.source} style={styles.backgroundImageContainer}>
				<Modal
					animationType={'slide'}
					transparent={true}
					visible={this.state.forgotPasswordModalVisible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View style={styles.container1}>
						<ForgotPasswordController
							callbackAfterForgotPassword={this.callbackAfterForgotPassword.bind(this)}
							otherParamsToSend={this.state.otherParamsToSend}
						/>
					</View>
				</Modal>

				<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: '10%' }}>
					<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
						<LoginHeader nav={this.props.navigation}>Sign In With</LoginHeader>

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
								this.onLoginActionHandler();
								//this.Login();
							}}
						>
							Login
						</Button>

						<View style={styles.signUpContainer}>
							<Text style={styles.signUpText}>Don't have account?</Text>
							<TouchableOpacity
								onPress={() => {
									that.props.navigation.push('SignUpScreen');
								}}
							>
								<Text style={styles.signUpButton}> SignUp</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity onPress={this.btnForgotPassword.bind(this)}>
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImageContainer: {
		width: '100%',
		height: '100%'
	},
	container1: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	inputContainer: {
		paddingBottom: 20,
		alignItems: 'center'
	},
	signUpContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingTop: 50
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
		paddingBottom: 50
	},
	stylOld: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	styleNew: {
		flex: 1
	},
	ActivityIndicatorStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute'
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.8,
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
)(LoginScreen);

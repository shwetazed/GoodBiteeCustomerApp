import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	TextInput,
	Image,
	Animated,
	Alert
} from 'react-native';

import Images from '@Images';
import UserManger from '@Networking/UserManager';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import SpinnerEx from '@Components/Common/SpinnerEx';

that = this;

class ForgotPasswordController extends Component {
	static navigationOptions = { header: null };
	/**
	 * Default props
	 */
	static defaultProps = {
		backgroundColor: 'white',
		titleText: 'Forgot Password',
		submitText: 'Send',

		placeHolderText: '  Email Address'
	};

	constructor(props) {
		super(props);
		that = this;
		this.btnSubmitPress.bind(this);
		this.onSignUpActionHandler.bind(this);
		this.state = {
			email: ''
		};
	}

	/**
	 * Validate email
	 */
	validateEmail = function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	/**
	 * Button submit pressed
	 */
	btnSubmitPress() {
		if (this.state.email.trim().length == 0) {
			console.log('Please enter email');
		} else if (this.validateEmail(this.state.email) == false) {
			console.log('Please enter valid email');
		} else {
			this.callForgotPassword();
		}
	}

	callForgotPassword() {
		UserManger.ForgotPassword(this.state.email)
			.then(response => {
				console.warn('response:----', response);
				console.log('response:', response);

				if (response.status == 'success') {
					console.warn('in success ', response.msg);
					console.log(response.msg);
					if (response.msg == 'This email is already exist.') {
						console.warn('tryxcx');
						that.setState({ spinner: false });

						that.AlertBox('Good Bitee', response.msg);
						that.props.navigation.pop();
					} else {
						//that.setState({ spinner: false });

						that.AlertBox('Good Bitee', response.msg);
						//that.props.navigation.push('WelcomeScreen');
					}
				} else {
					//that.setState({ spinner: false });

					that.setState({ email: '', spinner: false });
					DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(function(error) {
				console.warn('error:', error);
				console.log('error:', error);
			});
	}

	onSignUpActionHandler() {
		if (IS_EMAIL_VALID(this.state.email) == false) {
			DISPLAY_ALERT('Good Bitee', 'please enter a valid email id!');

			return;
		}
	}
	AlertBox(alertTitle, AlertMessage) {
		Alert.alert(
			alertTitle,
			AlertMessage,
			[
				{
					text: 'OK',
					onPress: () => {
						if (AlertMessage == 'Password Update successfully.') {
							this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
						} else {
							this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
						}
					}
				}
			],
			{ cancelable: false }
		);
	}

	/**
	 * Button close pressed
	 */
	btnClosePress() {
		this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.bottomView, { backgroundColor: this.props.backgroundColor }]}>
					<TouchableOpacity style={styles.btnClose} activeOpacity={0.6} onPress={() => this.btnClosePress()}>
						{/* <Image source={Images.close} /> */}
						<Image source={Images.Cancel.source} />

						{/* <Text style={styles.textCancel} numberOfLines={1}>
							{this.props.closeText}
						</Text> */}
					</TouchableOpacity>
					<Text style={styles.textHeader}>{this.props.titleText}</Text>
					<View style={styles.starView}>
						<View style={styles.inputView}>
							<TextInput
								style={styles.inputText}
								placeholder={this.props.placeHolderText}
								multiline={false}
								placeholderTextColor={'#3c3c3c'}
								autoCapitalize={'none'}
								keyboardType={'email-address'}
								autoCorrect={false}
								underlineColorAndroid={'transparent'}
								onChangeText={email => this.setState({ email })}
								value={this.state.email}
							/>
						</View>
						{/* <TouchableOpacity style={styles.btnCancel} activeOpacity={0.6} onPress={() => this.btnSubmitPress()}>
							<Text
								style={styles.textCancel}
								numberOfLines={1}
								// this.props.navigation.pop();
							>
								{this.props.submitText}
								{this.props.navigation.pop}
							</Text>
						</TouchableOpacity> */}

						<TouchableOpacity style={styles.btnCancel} activeOpacity={0.6}>
							<Text
								style={styles.textCancel}
								onPress={() => {
									this.btnSubmitPress();
									// this.AlertBox();
								}}
							>
								{this.props.submitText}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
export default ForgotPasswordController;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,

		justifyContent: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	scrollView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	bottomView: {
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	topContainer: {
		flexDirection: 'row',
		marginTop: 10
	},
	textHeader: {
		color: 'black',
		fontSize: 18,
		marginVertical: 0,
		alignSelf: 'center'
	},
	bottomContainer: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginTop: 5,
		marginBottom: 5
	},
	dividerView: {
		backgroundColor: '#3c3c3c',
		height: 4
	},
	btnCancel: {
		backgroundColor: '#6bb003',
		justifyContent: 'center',
		borderRadius: 15,
		marginTop: 10,
		overflow: 'hidden',
		alignSelf: 'center',
		marginBottom: 15
	},

	textCancel: {
		color: 'white',
		paddingHorizontal: 20,
		paddingVertical: 5,
		fontSize: 16,
		textAlign: 'center',
		marginHorizontal: 10
	},
	btnClose: {
		// backgroundColor: '#D3D3D3',
		justifyContent: 'flex-end',
		marginTop: 3,
		overflow: 'hidden',
		alignSelf: 'flex-end',
		borderRadius: 15,

		marginBottom: 20
	},
	textClose: {
		color: 'black',

		paddingHorizontal: 5,
		paddingVertical: 5,
		fontSize: 16,
		textAlign: 'center',
		marginHorizontal: 10
	},
	inputText: {
		paddingVertical: 5,
		color: 'black',
		marginLeft: 10,
		fontSize: 15,
		textAlign: 'left'
	},
	inputView: {
		backgroundColor: 'white',
		borderRadius: 50,
		justifyContent: 'flex-start',
		borderWidth: 1,
		marginHorizontal: 15,
		marginVertical: 10,
		borderColor: '#3c3c3c',
		overflow: 'hidden'
	}
});

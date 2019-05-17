import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { ShareApi } from 'react-native-fbsdk';

let that;

export default class FacebookSignIn extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			pic: '',
			success: 'false'
		};
	}

	componentDidMount() {
		that = this;

		// LoginManager.logInWithReadPermissions(['public_profile']).then(
		// 	function(result) {
		// 		if (result.isCancelled) {
		// 			console.warn('Login cancelled');
		// 		} else {
		// 			console.warn('Login success with permissions: ' + result.grantedPermissions.toString());
		// 			//console.warn('Login success ' + result);
		// 		}
		// 	},
		// 	function(error) {
		// 		console.warn('Login fail with error: ' + error);
		// 	}
		// );
	}

	initUser = token => {
		console.warn('In the init user method-------------');
		fetch('https://graph.facebook.com/v2.5/me?fields=id,name,email,picture&access_token=' + token)
			.then(response => response.json())
			.then(json => {
				this.setState({
					name: json.name,
					pic: json.picture.data.url,
					success: 'true'
				});
				console.warn('User values Here ', ' ID ', json.id, json.name, ' Picture ', json.picture.data.url);
			})
			.catch(() => {
				Alert.alert('ERROR GETTING DATA FROM FACEBOOK');
				reject('ERROR GETTING DATA FROM FACEBOOK');
			});
	};
	handleFacebookLogin() {
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
					style={{ height: 50, width: 50, borderRadius: 30, justifyContent: 'center', backgroundColor: 'blue' }}
					onPress={this.handleFacebookLogin}
				>
					<Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 25 }}>F</Text>
				</TouchableOpacity>

				{/* <LoginButton
					//publishPermissions={['publish_actions']}
					//readPermissions={['public_profile']}
					style={styles.facebookbutton}
					readPermissions={['public_profile', 'email']}
					onLoginFinished={(error, result) => {
						if (error) {
							console.warn(error.message);
							console.warn('login has error: ' + result.error);
						} else if (result.isCancelled) {
							console.warn('login is cancelled.');
						} else {
							AccessToken.getCurrentAccessToken().then(data => {
								const infoRequest = new GraphRequest('/me?fields=id,name,picture', null, this._responseInfoCallback);
								// Start the graph request.
								new GraphRequestManager().addRequest(infoRequest).start();
							});
						}
					}}
					onLogoutFinished={() => console.warn('logout.')}
				/> */}
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

import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
//import SocialLoginContainer from '/src/UI/Components/Login/SocialLoginContainer'
import SocialLoginContainer from '../Login/SocialLoginContainer';

export default class LoginHeader extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ height: 90, width: '60%' }}>
					<Image source={require('@res/Images/GoodbiteLogo.png')} style={styles.image} />
				</View>
				<Text style={styles.textSignIn}>{this.props.children}</Text>
				<SocialLoginContainer nav={this.props.nav} />
				<View style={styles.orContainer}>
					<Image style={styles.imageLine} />
					<Text style={styles.orText}> OR </Text>
					<Image style={styles.imageLine} />
					<Image />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 300,
		paddingBottom: 10
		//borderWidth: 1
	},

	textSignIn: {
		color: 'gray',
		paddingTop: 25
	},
	orText: {
		color: 'gray'
	},

	orContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 25,
		alignItems: 'center'
	},
	imageLine: {
		backgroundColor: 'gray',
		height: 1,
		width: '30%'
	},
	image: {
		height: '100%',
		width: '100%'
	}
});

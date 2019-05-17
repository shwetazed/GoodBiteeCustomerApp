import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SocialLoginButton from '../Login/SocialLoginButton';
import FBLoginButton from '../Login/FBLoginButton';
import GPlusLoginButton from '../Login/GPlusLoginButton';

export default class SocialLoginContainer extends Component {
	render() {
		return (
			<View style={styles.container}>
				<GPlusLoginButton nav={this.props.nav}>G+</GPlusLoginButton>
				<FBLoginButton nav={this.props.nav} />
			</View>
		);

		// <View style={styles.container}>
		//     <SocialLoginButton>G+</SocialLoginButton>
		//     <SocialLoginButton style={{ backgroundColor: 'blue' }}>f</SocialLoginButton>
		// </View>
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		width: 160,
		flexDirection: 'row',
		alignContent: 'center',
		paddingTop: '10%'
	}
});

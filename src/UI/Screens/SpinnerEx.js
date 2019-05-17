import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class App extends Component {
	state = {
		spinner: false
	};

	// componentDidMount() {
	// 	setInterval(() => {
	// 		this.setState({
	// 			spinner: !this.state.spinner
	// 		});
	// 	}, 3000);
	// }

	render() {
		return (
			<View style={styles.container}>
				<Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#6bb003'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

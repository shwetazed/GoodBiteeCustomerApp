import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SpinnerEx extends Component {
	state = {
		spinner: true
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
				<Spinner visible={true} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
				{/* <TouchableOpacity onPress={() => this.setState({ spinner: false })}>
					<Text>CLICK TO STOP</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setState({ spinner: true })}>
					<Text>CLICK TO START</Text>
				</TouchableOpacity> */}
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

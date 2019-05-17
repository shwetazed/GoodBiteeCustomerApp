import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Button extends Component {
	render() {
		return (
			<TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPressButton}>
				<Text style={styles.socialButtonText}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		backgroundColor: '#F03E18',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		borderRadius: 25
	},
	socialButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20
	}
});

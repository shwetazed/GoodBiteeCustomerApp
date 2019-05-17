import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import * as colors from '@Utils/colors';

import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.buttonType == 'big') {
			return (
				<TouchableOpacity
					style={[styles.shape, { backgroundColor: this.props.background }]}
					onPress={this.props.onPressButton}
				>
					<Text style={{ color: this.props.text, alignSelf: 'center', fontSize: 16, fontWeight: '600' }}>
						{this.props.title}
					</Text>
				</TouchableOpacity>
			);
		} else if (this.props.buttonType == 'bigPopup') {
			return (
				<TouchableOpacity
					style={[styles.popUpButton, { backgroundColor: this.props.background }]}
					onPress={this.props.onPressButton}
				>
					<Text style={{ color: this.props.text, alignSelf: 'center', fontSize: 16, fontWeight: '600' }}>
						{this.props.title}
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={[styles.button, { backgroundColor: this.props.background }]}
					onPress={this.props.onPressButton}
				>
					<Text style={{ color: this.props.text, alignSelf: 'center', fontSize: 12, fontWeight: '600' }}>
						{this.props.title}
					</Text>
				</TouchableOpacity>
			);
		}
	}
}
const styles = StyleSheet.create({
	shape: {
		width: '100%',
		height: '15%',
		//backgroundColor: colors.green,
		justifyContent: 'center'
	},
	button: {
		//height: responsiveHeight(30),
		height: '100%',
		borderRadius: 19,
		width: responsiveWidth(105),

		justifyContent: 'center',
		alignContent: 'center'
	},
	popUpButton: {
		width: '100%',
		...Platform.select({
			ios: {
				height: 40
			},
			android: {
				height: 40
			}
		}),
		//borderWidth: 1,
		//backgroundColor: colors.green,
		justifyContent: 'center'
	}
});

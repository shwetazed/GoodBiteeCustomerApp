import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class KitchenHeaderImage extends Component {
	render() {
		return <View style={styles.imageOverBG} />;
	}
}
const styles = StyleSheet.create({
	imageOverBG: {
		marginTop: 45,
		position: 'absolute',
		height: 200,
		width: '97%',
		marginLeft: 11,
		borderRadius: 10,
		alignSelf: 'center'
	}
});

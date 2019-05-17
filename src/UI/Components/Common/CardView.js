import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Images from '@Images';

export default class BackgroundImage extends Component {
	render() {
		return <View style={[styles.container, this.props.style]} />;
	}
}
const styles = StyleSheet.create({
	container: {
		width: '95%',
		height: '70%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3
	}
});

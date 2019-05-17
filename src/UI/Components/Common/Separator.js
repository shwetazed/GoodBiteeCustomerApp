import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Separator extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <View style={styles.gap} />;
	}
}
const styles = StyleSheet.create({
	gap: {
		height: '2.5%'
	}
});

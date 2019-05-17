import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class SectionHeader extends Component {
	render() {
		if (this.props.listType == 'kitchen_food') {
			return (
				<View style={[styles.container, this.props.style]}>
					<Text style={styles.foodTitle}>{this.props.children}</Text>
				</View>
			);
		} else {
			return (
				<View style={[styles.container, this.props.style]}>
					<Text style={styles.title}>{this.props.children}</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		height: 40,

		//margin: 5,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center',
		borderRadius: 5
	},
	title: {
		fontWeight: 'bold',
		fontSize: 13,
		paddingLeft: 5
	},
	foodTitle: {
		fontSize: 15,
		paddingLeft: 5
	}
});

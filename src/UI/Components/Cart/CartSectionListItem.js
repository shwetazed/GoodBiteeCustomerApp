import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class CartSectionListItem extends Component {
	render() {
		console.warn('render', this.props);
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row' }}>
					<View style={styles.titleContainer}>
						<View style={styles.checkBoxView} />
						<Text style={styles.title}>{this.props.item.name}</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text style={styles.title}>{this.props.item.price}</Text>
					</View>
				</View>

				<Image style={styles.line} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		padding: 5,
		justifyContent: 'center'
	},
	titleContainer: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flex: 0.7
	},
	title: {
		fontSize: 13,
		height: 49,
		paddingTop: 15,
		paddingLeft: 20
	},
	line: {
		backgroundColor: '#F5F5F5',
		height: 1,
		width: '100%'
	},
	checkBoxView: {
		height: 25,
		width: 25,
		borderRadius: 5,
		borderWidth: 1,
		marginRight: 10,
		marginTop: 13,
		marginBottom: 13
	}
});

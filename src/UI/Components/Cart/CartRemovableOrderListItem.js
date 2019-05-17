import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class CartRemovableOrderListItem extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.quantity}>{this.props.item.quantity}</Text>
					<TouchableOpacity
						onPress={() => {
							this.props.deleteCartItem(this.props.item.cart_item_id);
						}}
					>
						<Text style={styles.cross}>X</Text>
					</TouchableOpacity>
					<Text style={styles.title}>{this.props.item.food_name}</Text>
				</View>
				<Image style={styles.line} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	titleContainer: {
		height: 29,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 10,
		paddingTop: 10
	},
	quantity: {
		fontSize: 13,
		height: 20,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 1.5,
		borderRadius: 3,
		borderWidth: 1,
		marginRight: 10,
		borderColor: 'green',
		alignSelf: 'center'
	},
	title: {
		fontSize: 13,
		height: 39,
		paddingLeft: 13
	},
	cross: {
		fontSize: 13,
		height: 39,
		paddingLeft: 5,
		paddingRight: 5,

		color: 'green'
	},
	line: {
		backgroundColor: '#F5F5F5',
		height: 1,
		width: '100%'
	},
	checkBoxView: {
		height: 15,
		width: 15,
		borderRadius: 3,
		borderWidth: 1,
		marginRight: 10,
		borderColor: 'green'
	}
});

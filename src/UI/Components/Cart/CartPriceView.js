import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class CartPriceView extends Component {
	render() {
		console.warn('totalAmount', this.props.totalAmount);
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={styles.priceContainer}>
					<Text style={styles.title}>Subtotal</Text>
					<Text style={styles.valueText}>{this.props.subTotal}</Text>
				</View>
				{this.props.promoDiscount != undefined || this.props.promoDiscount == '' ? (
					<View style={styles.priceContainer}>
						<Text style={styles.title}>Discount</Text>
						<Text style={styles.valueText}>{this.props.promoDiscount}</Text>
					</View>
				) : null}
				<View style={styles.priceContainer}>
					<Text style={styles.title}>Delivery Fee</Text>
					<Text style={styles.valueText}>{this.props.deliveryCharge}</Text>
				</View>
				<Image style={styles.line} />

				<View style={styles.priceContainer}>
					<Text style={styles.title}>Total</Text>
					<Text style={styles.valueText}>{this.props.totalAmount}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		justifyContent: 'center',
		borderRadius: 5,
		marginTop: 10
	},
	priceContainer: {
		padding: 5,
		justifyContent: 'space-between',
		borderRadius: 5,
		flexDirection: 'row'
	},
	titleText: {
		fontWeight: 'normal',
		fontSize: 13,
		paddingLeft: 5,
		color: 'gray'
	},
	valueText: {
		fontWeight: 'normal',
		fontSize: 13,
		paddingLeft: 5,
		color: 'green'
	},
	line: {
		backgroundColor: 'gray',
		height: 1,
		width: '98%',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10
	}
});

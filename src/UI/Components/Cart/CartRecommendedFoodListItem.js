import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class CartRecommendedFoodListItem extends Component {
	render() {
		console.log(this.props.item);
		return (
			<View style={styles.container}>
				<Image style={styles.menuImage} source={{ uri: this.props.item.image_thumb_url }} />
				<Text style={styles.restorantName}>{this.props.item.food_name}</Text>
				<Text style={styles.menuDescription}>Price: {this.props.item.price}</Text>
				<Text style={styles.menuDescription}>Offer Price: {this.props.item.offer_price}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
		shadowColor: 'gray',
		shadowRadius: 2.0,
		shadowOpacity: 0.5,
		padding: 10,

		margin: 10,
		marginTop: 2,

		marginRight: 2,

		width: (SCREEN_WIDTH - 80) / 2
	},
	menuImage: {
		paddingLeft: '5%',
		width: (SCREEN_WIDTH - 120) / 2,
		height: (SCREEN_WIDTH - 120) / 2,
		borderRadius: 10,
		alignSelf: 'center'
	},
	restorantName: {
		fontSize: 13,
		color: 'black',
		paddingTop: 7,
		width: '90%'
	},
	menuDescription: {
		fontSize: 13,
		color: 'gray',
		paddingTop: 5,
		width: '90%'
	},
	timeDuration: {
		color: 'black',
		fontSize: 13,
		paddingRight: 5
	},
	bottomContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		height: 30,
		paddingTop: 7
	},
	verticalLineImage: {
		backgroundColor: 'gray',
		width: 1,
		height: 20,
		paddingRight: 5
	},
	imageIcon: {
		width: 20,
		height: 20,
		paddingRight: 5
	}
});

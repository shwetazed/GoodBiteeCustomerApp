import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
export default class FoodListItem extends Component {
	constructor(props) {
		super(props);
	}
	GetItem = item => Alert.alert(item);

	renderEditDeleteButton = () => {
		if (this.props.isEditable == true) {
			return (
				<View style={styles.bottomImageView}>
					<TouchableOpacity
						onPress={() => {
							{
								this.props.onEditFoodPressed(this.props.item);
							}
						}}
					>
						<Image
							style={{ height: 14, width: 15, resizeMode: 'contain' }}
							source={require('@res/Images/edit-green.png')}
						/>
					</TouchableOpacity>
					<View style={{ width: '2%' }} />
					<TouchableOpacity
						onPress={() => {
							{
								this.props.onDeleteFoodPressed(this.props.item);
							}
						}}
					>
						<Image
							style={{ height: 14, width: 15, resizeMode: 'contain' }}
							source={require('@res/Images/delete_red.png')}
						/>
					</TouchableOpacity>
				</View>
			);
		}
	};

	render() {
		return (
			<View style={styles.listView}>
				<View style={styles.listImage}>
					<Image source={{ uri: this.props.item.image_thumb_url }} style={styles.imageView} />
				</View>
				<View style={styles.textView}>
					<Text style={[styles.item, { fontSize: 14 }]}>{this.props.item.food_name}</Text>
					<Text style={styles.item}>Original Price : {this.props.item.price}</Text>
					<Text style={styles.item}>Offer Price : {this.props.item.offer_price}</Text>
					{this.renderEditDeleteButton()}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	listView: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'row',
		height: 100,
		width: SCREEN_WIDTH - 20,
		margin: 5,
		borderColor: 'grey',
		borderRadius: 10,
		borderWidth: 0.5,
		alignSelf: 'center',
		//for android
		elevation: 10,
		// for ios
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.1
	},
	listImage: {
		height: 99,
		width: 100,
		borderRadius: 10,
		marginRight: 5
	},
	item: {
		// padding: 10,
		//backgroundColor:'grey',
		//color: 'grey',
		fontSize: 10,
		padding: 5
		//borderWidth: 1
		//height: 45,
	},
	textView: {
		height: '100%',
		width: SCREEN_WIDTH - 130,
		justifyContent: 'center',
		//borderWidth: 1,
		padding: 5
	},
	imageView: {
		height: 99,
		width: 100,
		borderRadius: 5
	},
	bottomImageView: {
		width: '100%',
		justifyContent: 'flex-end',
		flexDirection: 'row'
		//borderWidth: 1
	}
});

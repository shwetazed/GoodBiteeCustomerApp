// import React, { Component } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
// export default class CategoryListItems extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	GetItem = item => Alert.alert(item);

// 	render() {
// 		return (
// 			<View style={styles.listView}>
// 				<View style={styles.listImage}>
// 					<Image source={{ uri: this.props.item.image_original_url }} style={styles.imageView} />
// 				</View>
// 				<View style={styles.textView}>
// 					<Text style={[styles.item, { fontSize: 14 }]}>{this.props.item.food_name}</Text>
// 					<Text style={styles.item}>Original Price : {this.props.item.price}</Text>
// 					<Text style={styles.item}>Offer Price : {this.props.item.offer_price}</Text>
// 				</View>
// 			</View>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	listView: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 		//flexDirection: 'row',
// 		height: 250,
// 		width: SCREEN_WIDTH - 70,
// 		//width: '70%',
// 		margin: 5,
// 		borderColor: 'grey',
// 		borderRadius: 10,
// 		borderWidth: 0.5,
// 		alignSelf: 'center',
// 		//for android
// 		elevation: 10,
// 		// for ios
// 		shadowOffset: { width: 1, height: 1 },
// 		shadowColor: 'black',
// 		shadowOpacity: 0.1,
// 		marginTop: 20
// 	},
// 	listImage: {
// 		height: '80%',
// 		width: '100%',
// 		borderRadius: 10,
// 		//borderWidth: 1,
// 		padding: 10
// 		//justifyContent: 'center',
// 		//alignItems: 'center'
// 		//marginRight: 5
// 	},
// 	item: {
// 		// padding: 10,
// 		//backgroundColor:'grey',
// 		//color: 'grey',
// 		fontSize: 10
// 		//padding: 5
// 		//borderWidth: 1
// 		//height: 45,
// 	},
// 	textView: {
// 		height: '20%',
// 		width: SCREEN_WIDTH - 130,
// 		justifyContent: 'center',
// 		borderWidth: 1,
// 		padding: 5
// 	},
// 	imageView: {
// 		height: '100%',
// 		width: '100%',
// 		borderRadius: 5
// 		//borderWidth: 1
// 	},
// 	bottomImageView: {
// 		width: '100%',
// 		justifyContent: 'flex-end',
// 		flexDirection: 'row'
// 		//borderWidth: 1
// 	}
// });

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

let height = 260;

export default class CategoryListItem extends Component {
	render() {
		return (
			<View style={styles.MainContainer}>
				<View>
					{this.props.item.image_original_url == '' ? (
						<Image style={styles.imageContainer} source={require('@res/Images/listLoader.gif')} />
					) : (
						<Image style={styles.imageContainer} source={{ uri: this.props.item.image_original_url }} />
					)}

					<View style={{ height: 3 }} />
					{this.props.item.kitchen_name == '' || undefined ? null : <Text>{this.props.item.kitchen_name}</Text>}

					<View style={{ height: 3 }} />

					{this.props.item.description == '' || undefined ? null : <Text>{this.props.item.description}</Text>}

					<View style={{ height: 3 }} />

					<View style={styles.bottomContainer}>
						{this.props.item.arrival_time == '' ? null : (
							<View>
								<View style={styles.textStyle}>
									<Text>{this.props.item.arrival_time}</Text>
								</View>
							</View>
						)}

						{this.props.item.rating == '' ? null : (
							<View style={[styles.textStyle, { flexDirection: 'row', alignItems: 'center' }]}>
								<Text>{this.props.item.rating}</Text>
								<View style={{ width: 4 }} />
								<View style={styles.rateStyle}>
									<Image
										style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
										source={require('@res/Images/star.png')}
									/>
								</View>
								<View style={{ width: 4 }} />
								<Text>
									(<Text>{this.props.item.review_count}</Text>)
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		width: SCREEN_WIDTH - 80,
		//height: height,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		margin: 10,
		//borderWidth: 1
	},
	imageContainer: {
		//justifyContent: 'center',
		//margin: 5,
		width: SCREEN_WIDTH - 100,
		height: 150,
		borderRadius: 10,
		//borderWidth: 1
		//resizeMode: 'contain'
	},
	bottomContainer: {
		flexDirection: 'row',

		//width: SCREEN_WIDTH - 20,
		width: '100%'
		//borderWidth: 1,
		//height: 25
	},
	textStyle: {
		backgroundColor: '#F5F5F5',
		//height: '100%',
		alignItems: 'center',
		width: 80,
		padding: 2,
		marginRight: 8,
		//borderWidth: 1,
		justifyContent: 'center'
	},
	rateStyle: {
		height: 12,
		width: 12
	}
});

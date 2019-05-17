import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import Images from '@res/Images';
import PromoCodeManager from '@Networking/PromoCodeManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { FlatList } from 'react-native-gesture-handler';
import { Config } from '@Core/Config';

let kitchenId, foodIds;
export default class ApplyPromoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { dataSource: '' };
	}
	componentDidMount() {
		this.getPromoCodeList();
		kitchenId = this.props.navigation.state.params.kitchen_id;
		foodIds = this.props.navigation.state.params.food_ids;

		// console.warn(
		// 	'Kitchen ids ',
		// 	this.props.navigation.state.params.kitchen_id,
		// 	' Food ids ',
		// 	this.props.navigation.state.params.food_ids
		// );
	}
	getPromoCodeList() {
		PromoCodeManager.getPromoCodeList(Config.USER_ID, this.props.navigation.state.params.kitchen_id, foodIds).then(
			response => {
				console.warn('Response is ', response);
				this.setState({
					dataSource: response.Offer
				});
				console.warn('Response saved in ', this.state.dataSource);
			}
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="Promo Codes"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				{/* {this.state.dataSource.length > 0 ? ( */}
				{/* <Image style={styles.image} source={require('../../../../res/Images/promocode.png')} /> */}
				<View style={{ height: 40 }} />
				<FlatList
					data={this.state.dataSource}
					renderItem={({ item }) => (
						<View>
							<View style={{ height: 200, paddingLeft: 10, paddingRight: 10 }}>
								<TouchableOpacity
									onPress={() => {
										console.warn('clicked item');
										this.props.navigation.state.params.callback(item);
										this.props.navigation.pop();

										//this.props.navigation.push('CartScreen', { item: item });
									}}
								>
									<ImageBackground
										style={{ height: '100%', width: '100%' }}
										source={{ uri: item.image_original_url }}
										imageStyle={{ borderRadius: 10 }}
										resizeMode="stretch"
									>
										<View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
											<View
												style={{
													height: '50%',
													width: '90%',
													//borderWidth: 1,
													backgroundColor: 'white',
													opacity: 0.8,
													borderRadius: 5,
													paddingLeft: 5
												}}
											>
												<Text>
													Offer: <Text style={{ color: 'black', fontSize: 15 }}>{item.offer_title}</Text>
												</Text>
												<Text>
													Promocode: <Text style={{ color: 'red', fontSize: 20 }}>{item.promo_code}</Text>
												</Text>
												<Text>Expiry date:</Text>
												<Text style={{ color: 'black', fontSize: 10 }}>{item.expiry_date_time}</Text>
											</View>
										</View>
									</ImageBackground>
								</TouchableOpacity>

								{/* <TouchableOpacity
									style={styles.listTouch}
									onPress={() => {
										console.warn(item);
										this.props.navigation.push('CartScreen', { item });
									}}
								>
									<View style={styles.imageView}>
										<Image style={styles.image} source={{ uri: item.image_original_url }} />
										
									</View>
									<View style={styles.textView}>
										<Text style={styles.text}>{item.offer_title}</Text>
									</View>
								</TouchableOpacity>
								<Text style={styles.text}>{item.promo_code}</Text>
								<Text style={styles.text}>{item.expiry_date_time}</Text> */}
							</View>
							<View style={{ height: 10 }} />
						</View>
					)}
				/>
				{/* ) : (
					<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
						<Text style={{ color: 'red', fontWeight: '500' }}>No Promo Codes!</Text>
					</View>
				)} */}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},
	image: { height: '60%', width: '60%', resizeMode: 'contain' },
	imageView: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
	listTouch: {
		height: '100%',

		//backgroundColor: '#f5f5f5',
		borderRadius: 10,
		flexDirection: 'row'
	},
	textView: {
		flex: 0.9,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: { color: 'black', fontWeight: '500' }
});

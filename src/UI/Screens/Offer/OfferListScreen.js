import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Constant,
	Alert,
	ImageBackground
} from 'react-native';
import Background from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '@Images';
import OfferManager from '@Networking/OfferManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import axios from 'axios';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { Config } from '@Core/Config';

let that;
export default class OfferListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offerList: []
		};
	}

	componentDidMount() {
		that = this;
		this.getOfferList(Config.USER_ID);
	}
	getOfferList(userId) {
		console.warn('In User list offer ');
		OfferManager.getOfferList(userId)
			.then(response => {
				console.warn('Getting OfferList ', response);
				this.setState({ offerList: response.Offer });
			})
			.catch(error => {
				console.warn('Getting error ', error);
			});
	}

	editButtonAction = () => {
		this.props.navigation.push('AddOfferScreen', { item: 'undefined' });
	};

	onDeleteActionHandler(offerId) {
		console.warn('delete image Offer id ', offerId);
		Alert.alert(
			'GoodBitee',
			'Are you sure to delete this offer.',
			[
				{
					text: 'Yes',
					onPress: () =>
						OfferManager.deleteOffer(offerId)
							.then(response => {
								console.warn('res ', response);
								if (response.status == 'success') {
									this.getUserData();
									DISPLAY_ALERT('Goodbitee', response.msg);
								}
							})
							.catch(error => {
								console.warn('Getting error ', error);
							})
				},
				{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	}

	ListEmptyView = () => {
		return (
			<View>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image style={{ width: 30, height: 30, top: '1000%' }} source={require('@res/Images/loading.gif')} />
				</View>
			</View>
		);
	};

	render() {
		return (
			<View>
				<Background />

				<Navigation
					navigation={this.props.navigation}
					title="Offer List"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					isRightButtonHide={true}
					isMenu={true}
				/>

				<View style={{ height: 20, width: '100%' }} />

				<View style={{ width: '100%', height: '90%', alignSelf: 'center', padding: '5%' }}>
					<FlatList
						style={{ width: '100%', height: '90%', alignSelf: 'center' }}
						data={this.state.offerList}
						//data to render in list
						ListEmptyComponent={this.ListEmptyView}
						renderItem={({ item }) => (
							<View>
								<View style={{ width: '100%', height: 220, alignSelf: 'center' }}>
									<TouchableOpacity
										onPress={() => {
											console.warn('Pressed');
											that.props.navigation.push('KitchenDetailScreen', {
												item: item,
												type: 'user'
											});
										}}
									>
										<Image
											style={{ width: '100%', height: '100%', borderRadius: 15 }}
											source={{ uri: item.image_original_url }}
										/>
									</TouchableOpacity>
								</View>
								<View style={{ height: '.5%' }} />
							</View>
						)}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	view1: {
		//marginTop: '30%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		borderWidth: 1
	},
	containerRow: {
		//marginTop: '30%',
		top: 100,
		height: 80,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end'

		//overflow: 'hidden'
		//borderWidth: 1
	},
	containerView: {
		height: '100%',
		width: 110,
		borderRadius: 10,
		marginRight: 5,
		padding: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.7)'
	},
	textOffer: {
		color: 'white',
		fontWeight: '400',
		textAlign: 'center',
		fontSize: 12
	},
	textOfferView: {
		backgroundColor: 'red',
		borderRadius: 4,
		width: '100%'
	},
	gap: { height: '3%', width: '100%' },
	crossImageView: {
		opacity: 0.8,
		height: 30,
		width: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		alignSelf: 'flex-end',
		borderTopRightRadius: 10
	}
});

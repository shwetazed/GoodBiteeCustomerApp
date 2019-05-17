import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList, StyleSheet, TouchableOpacity, Constant, Image } from 'react-native';
import Background from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
import PastOrderCard from '@Components/Order/PastOrderCard';
import Images from '@Images';
import { GET_LOCAL_DATA } from '@Core/Storage';
import OrderManager from '@Networking/OrderManager';

export default class PastOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['items 1', 'items 2', 'items 3', 'items 4'],
			name: 'Kanha-Tonk Road',
			price: '$ 80.99',
			time: '5 May 2019 9.05 PM'
		};
	}
	componentDidMount() {
		this.getPastOrders();
	}
	getPastOrders() {
		OrderManager.getPastOrders(USER_ID)
			.then(response => {
				console.warn('Response in past order ', response);
				this.setState({ name: response.name });
				this.setState({ price: response.price });
				this.setState({ time: response.time });
			})
			.catch(error => {
				console.warn('Error in Past orders ', error);
			});
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
				<Background />
				<Navigation
					navigation={this.props.navigation}
					title="Past Orders"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.edit.source}
					isRightButtonHide={true}
					isMenu={false}
				/>

				<View style={{ height: 20, width: '100%' }} />
				{/* <ScrollView style={{ height: '100%', width: '96%', alignSelf: 'center' }}>
					{this.state.items.map(
						(data = () => {
							return (
								<PastOrderCard
									name={this.state.name}
									price={this.state.price}
									time={this.state.time}
									onPressButton={() =>
										this.props.navigation.navigate('OrderIssueScreen', {
											name: this.state.name,
											price: this.state.price,
											time: this.state.time
										})
									}
								/>
							);
						})
					)}
				</ScrollView> */}

				<FlatList
					data={this.state.items}
					renderItem={({ item }) => (
						<PastOrderCard
							name={this.state.name}
							price={this.state.price}
							time={this.state.time}
							onPressButton={() =>
								this.props.navigation.navigate('OrderIssueScreen', {
									name: this.state.name,
									price: this.state.price,
									time: this.state.time
								})
							}
						/>
					)}
				/>
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
		fontSize: 18
	},
	textOfferView: {
		backgroundColor: 'red',
		borderRadius: 4,
		width: '100%'
	},
	gap: { height: '3%', width: '100%' }
});

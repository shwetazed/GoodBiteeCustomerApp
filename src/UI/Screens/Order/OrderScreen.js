import React, { Component } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import ViewReceiptDialogueBox from '@Components/Order/ViewReceiptDialogueBox';

import Images from '@Images';
import BackgroundImage from '@Components/Common/BackgroundImage';
import OrderListItem from '@Components/Order/OrderListItem';
import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import OrderManager from '@Networking/OrderManager';
import Navigation from '@Components/Common/Navigation';

let that;
let listItems;
export default class OrderScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			dialogVisible: false,
			pastButton: true,
			upcomingButton: false,
			dataSource: [],
			selectedItem: {}
		};
	}
	componentDidMount() {
		that = this;
		this.getPastOrderData();
	}

	getPastOrderData = () => {
		that.setState({ dataSource: [] });
		this.setState({ upcomingButton: false, pastButton: true });

		GET_LOCAL_DATA('USER_DATA')
			.then(userData => {
				console.warn('userData', userData);
				// OrderManager.getPastOrderList(userData.USER_ID)
				OrderManager.getPastOrderList(15)
					.then(response => {
						console.warn('response', response);

						that.setState({ dataSource: response.Order });
					})
					.catch(error => {
						//console.warn('error:', error);
					});
			})
			.catch(error => {
				console.warn('Promise is rejected with error: ' + error);
			});
	};
	getUpcomingOrderData = () => {
		that.setState({ dataSource: [] });
		this.setState({ upcomingButton: true, pastButton: false });
		GET_LOCAL_DATA('USER_DATA')
			.then(userData => {
				console.warn('userData', userData);
				// OrderManager.getUpcomingOrderList(userData.USER_ID)
				OrderManager.getUpcomingOrderList(15)
					.then(response => {
						console.warn('response', response);

						that.setState({ dataSource: response.Order });
					})
					.catch(error => {
						//console.warn('error:', error);
					});
			})
			.catch(error => {
				console.warn('Promise is rejected with error: ' + error);
			});
	};
	toggleModal(visible) {
		this.setState({ modalVisible: visible });
		//	console.log(this.selectedItem);
	}

	render() {
		return (
			<View style={styles.containerView}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="Order Screen"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
					isMenu={true}
				/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={
							this.state.pastButton == true
								? [styles.button, { backgroundColor: 'white', color: 'green' }]
								: styles.button
						}
						onPress={() => {
							this.getPastOrderData();
						}}
					>
						<Text>Past Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							this.state.upcomingButton == true
								? [styles.button, { backgroundColor: 'white', color: 'green' }]
								: styles.button
						}
						onPress={() => {
							this.getUpcomingOrderData();
						}}
					>
						<Text>Upcoming</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.flatListContainer}>
					<FlatList
						showsVerticalScrollIndicator={false}
						horizontal={false}
						data={this.state.dataSource}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									//navigation.push('OrderDetailScreen');
								}}
							>
								<OrderListItem
									item={item}
									onViewReceiptClick={() => {
										listItems = item;
										//this.setState({ selectedItem: item });
										this.toggleModal(true);
									}}
									onGetHelpClick={() => {
										this.props.navigation.push('OrderIssueScreen');
									}}
								/>
							</TouchableOpacity>
						)}
					/>
				</View>

				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View style={styles.modalContainer}>
						<ViewReceiptDialogueBox
							item={listItems}
							data={this.state.dialogVisible}
							onPressButton={() => {
								console.warn('false');
								this.toggleModal(false);
							}}
						/>
					</View>
				</Modal>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'row',
		padding: 8,
		height: 60,
		marginTop: 10
	},
	flatListContainer: {
		width: '100%',
		marginTop: 70,
		marginBottom: 80
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: 'green',
		color: 'white',
		height: 60,
		alignItems: 'center',
		margin: 7,
		borderRadius: 30
	}
});

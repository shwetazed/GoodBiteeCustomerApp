import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import * as colors from '@Utils/colors';
import DeliveryDetailTextInput from '@Components/Address/DeliveryDetailTextInput';
import Separator from '@Components/Common/Separator';
import AddApartmentNumber from '@Components/Address/AddApartmentNumber';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@res/Images';
import AddressManager from '@Networking/AddressManager';
import AddressListItem from '@Components/Address/AddressListItem';
import { connect } from 'react-redux';
import { Actions } from '@Redux';

import { GET_LOCAL_DATA } from '@Core/Storage';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

const borderColor = '#cccccc';

var globle = require('@Components/Common/GlobalStyle');
import Navigation from '@Components/Common/Navigation';

class SetDeliveryAddressScreen extends Component {
	constructor(props) {
		super(props);
		this.toggle.bind(this, false);
		this.getAllAddress.bind(this);
		this.state = {
			show: true,
			modalVisible: false,
			dialogVisible: false
		};
		// this.state = {
		// 	text: 'Select delivery address',
		// 	address: '',
		// 	address1: '91,bhagirath nagar',
		// 	address2: 'gopalpura by pass',
		// 	address3: 'Jaipur',
		// 	show: true,
		// 	modalVisible: false,
		// 	uAddress:
		// 		'Vishweriya nagar,gopalpura by pass,jaipur Vishweriya nagar,gopalpura by pass,jaipur,Vishweriya nagar,gopalpura by pass'
		// 	//dialogVisible: false
		// };
	}
	componentDidMount() {
		this.getAllAddress();
	}
	toggleModal(visible) {
		this.setState({ modalVisible: visible });
	}
	toggle = show => {
		switch (show) {
			case true:
				{
					this.setState({ modalVisible: show });
				}
				break;
			default: {
				this.setState({ modalVisible: show });
			}
		}
	};
	getAllAddress() {
		this.props.fetchAddressData((res, err) => {
			//TODO: HUD hide
			if (!!err) {
				//TODO: parse error and show
			}
		});
	}
	onSubmitHandler = (text, type) => {
		if (this.props.navigation.state.params.callback) {
			console.warn('onSubmitHandler');
		}

		this.props.navigation.push('DeliveryDetailsScreen', {
			address: text,
			address_type: '3',
			callback: this.props.navigation.state.params.callback ? this.updateAddressCallback : undefined
		});
	};
	updateAddressCallback = () => {
		console.warn('updateAddressCallback');
		this.props.navigation.state.params.callback();
		this.props.navigation.pop();
	};
	onChangeTextHandler = (text, type) => {
		//Alert.alert(text);
		if (type == 'address') {
			this.setState({
				address: text
			});
		}
	};
	render() {
		console.warn('render', this.props.addressData);
		return (
			<View style={StyleSheet.container}>
				<Modal
					animationType={'slide'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View style={styles.container1}>
						<AddApartmentNumber
							address={this.state.uAddress}
							onPressButton={() => {
								this.toggle(false);
							}}
						/>
					</View>
				</Modal>

				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Delivery Details"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<View style={Platform.OS == 'ios' ? styles.backgroundView : [styles.backgroundView]}>
					<View style={styles.backGroundViewTitle}>
						<Text style={{ fontSize: 15 }}>{this.state.text}</Text>
					</View>
					<Separator />
					<View
						style={[
							globle.parentView2,
							{
								borderWidth: 2,
								borderRadius: 20,
								borderColor: 'grey',
								backgroundColor: 'white',
								borderColor: borderColor
							}
						]}
					>
						<View style={{ flex: 0.9, marginBottom: '3%' }}>
							<DeliveryDetailTextInput
								type="address"
								placeholder="User Address"
								value={this.state.address}
								onSubmitHandler={this.onSubmitHandler}
								onChangeTextHandler={this.onChangeTextHandler}
							/>
						</View>

						<TouchableOpacity
							style={{
								flex: 0.08,
								justifyContent: 'center'
								//borderWidth: 1
							}}
						>
							<Text style={{ color: '#cccccc' }}>X</Text>
						</TouchableOpacity>
					</View>

					<Separator />

					<View style={Platform.OS == 'ios' ? styles.divider : [styles.divider, { marginTop: '1%' }]} />
					<Separator />

					<FlatList
						showsVerticalScrollIndicator={false}
						scrollEnabled={false}
						horizontal={false}
						data={this.props.addressData}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.push('DeliveryDetailsScreen', {
										item: item,
										callback: this.props.navigation.state.params.callback ? this.updateAddressCallback : undefined
									});
								}}
							>
								<AddressListItem item={item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	container1: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	backgroundImage: {
		//alignItems: 'center',
		width: '100%',
		height: '30%'
	},

	backgroundView: {
		width: '95%',
		height: '85%',
		backgroundColor: '#fff',
		borderRadius: 10,

		marginTop: 15,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { height: 10, width: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		padding: '4%'
		// elevation: 10
		//borderWidth: 1
	},
	backGroundViewTitle: {
		width: '100%',
		flex: 0,
		//marginBottom: '3%',
		justifyContent: 'flex-start'
		//borderWidth: 1
	},

	divider: {
		borderWidth: 1,
		borderColor: '#f5f5f5',

		width: '100%',
		//marginLeft: '3%',
		marginTop: '1%',
		paddingRight: '8%'
		//marginBottom: '5%'
		//alignSelf: 'center'
	},
	button: {
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#f5f5f5',
		//padding: '1%',
		height: '5%',
		width: '50%',
		borderRadius: 20
	}
});

export default connect(
	state => ({ addressData: state.userAddress }),
	{ fetchAddressData: Actions.fetchAddressData }
)(SetDeliveryAddressScreen);

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import * as colors from '@Utils/colors';

import Separator from '@Components/Common/Separator';

const margin = Platform.OS == 'ios' ? '3.5%' : '3%';
const marginImage = '2%';
const borderColor = '#cccccc';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@Images';
import Navigation from '@Components/Common/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { DISPLAY_ALERT } from '@Utils/Alert';
import DeliveryDetailTextInput from '@Components/Address/DeliveryDetailTextInput';
import AddressManager from '@Networking/AddressManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

var globle = require('@Components/Common/GlobalStyle');

let addressId;

class Delivery_Details extends Component {
	constructor(props) {
		super(props);
		this.onSubmitAddress.bind(this);
		this.state = {
			address: '',
			apartment: '',
			businessName: '',
			deliveryNote: '',
			addressType: '',
			meetVehicle: '',

			show: true,
			status: false,
			statue2: true,
			addressId: ''
		};
	}
	componentDidMount() {
		if (this.props.navigation.state.params.item) {
			console.warn('item');
			this.setState({
				address: this.props.navigation.state.params.item.address1,
				apartment: this.props.navigation.state.params.item.appartment_no,
				businessName: this.props.navigation.state.params.item.business_name,
				deliveryNote: this.props.navigation.state.params.item.delivery_note,
				addressId: this.props.navigation.state.params.item.id,
				addressType: this.props.navigation.state.params.item.address_type
			});
		} else {
			//	console.warn('address', this.props.navigation.state.params);

			this.setState({
				address: this.props.navigation.state.params.address,
				addressType: this.props.navigation.state.params.address_type
			});
		}
	}
	onRemovedAddress = () => {
		AddressManager.deleteAddress(Config.USER_ID, this.state.addressId)
			.then(response => {
				console.warn('response', response);
				if (response.status == 'success') {
					DISPLAY_ALERT('Good Bitee', response.msg);
					this.props.updateUserAddressData(response.UserAddress);
					this.props.navigation.pop();
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
	onSubmitAddress() {
		AddressManager.addAddress(
			Config.USER_ID,
			this.state.address,
			'India',
			'Rajasthan',
			'Jaipur',
			'302029',
			this.state.apartment,
			this.state.businessName,
			this.state.deliveryNote,
			this.state.addressId,
			this.state.addressType
		)
			.then(response => {
				console.warn('response', response);
				if (response.status == 'success') {
					console.warn(response.status);

					this.props.updateUserAddressData(response.UserAddress);

					if (this.props.navigation.state.params.callback) {
						console.warn('onSubmitAddress');

						this.props.navigation.state.params.callback();
					}

					this.props.navigation.pop();
					// this.props.navigation.popTo({
					// 	screen: 'CartScreen',
					// 	animated: true
					// });
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}
	onSubmitHandler = () => {};
	onChangeTextHandler = (text, type) => {
		//Alert.alert(text);
		switch (type) {
			case 'meet': {
				this.setState({ meetVehicle: text });
			}
			case 'address':
				{
					this.setState({ address: text });
				}
				break;
			case 'apartment':
				{
					this.setState({ apartment: text });
				}
				break;
			case 'business_name':
				{
					this.setState({ businessName: text });
				}
				break;
			case 'delivery_note':
				{
					this.setState({ deliveryNote: text });
				}
				break;
			default: {
			}
		}
	};
	clear = line => {
		switch (line) {
			case 0: {
				this.setState({ address: '' });
			}
			case 1:
				{
					this.setState({ apartment: '' });
				}
				break;
			case 2:
				{
					this.setState({ businessName: '' });
				}
				break;
			case 3:
				{
					this.setState({ deliveryNote: '' });
				}
				break;
			case 4:
				{
					this.setState({ meetVehicle: '' });
				}
				break;
			default: {
				this.setState({ address: '', apartment: '', businessName: '', deliveryNote: '', meetVehicle: '' });
			}
		}
	};
	toggle = (show, clicked) => {
		this.setState({ show: show });

		switch (clicked) {
			case 'yes':
				{
					this.setState({ status: true });
					this.setState({ status2: false });
				}
				break;
			default: {
				this.setState({ status: false });
				this.setState({ status2: true });
			}
		}
	};

	render() {
		return (
			<View>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Delivery Detail"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				<KeyboardAvoidingView behavior="padding">
					<View style={Platform.OS == 'ios' ? styles.backgroundView : [styles.backgroundView]}>
						<ScrollView style={{ height: '100%' }}>
							<View style={styles.backGroundViewTitle}>
								<Text style={{ fontSize: 15 }}>Select delivery address</Text>
							</View>
							<Separator />
							<View style={styles.textInputView}>
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
									onPress={this.clear.bind(this, 0)}
								>
									<Text style={{ color: '#cccccc' }}>X</Text>
								</TouchableOpacity>
							</View>

							<Separator />
							<View style={Platform.OS == 'ios' ? styles.divider : [styles.divider, { marginTop: '1%' }]} />
							<Separator />

							<View style={styles.backGroundViewTitle}>
								<Text style={{ fontSize: 15 }}>Delivery Options</Text>
							</View>
							<Separator />

							<TouchableOpacity onPress={this.toggle.bind(this, false, 'yes')}>
								<View style={globle.parentView1}>
									<View style={{ flex: 0.1, height: '100%', justifyContent: 'center' }}>
										<Image
											style={{ alignSelf: 'center', height: 20, width: 20, resizeMode: 'contain' }}
											source={require('@res/Images/vehicle_icon.png')}
										/>
									</View>
									<View style={{ flex: 0.8, justifyContent: 'center' }}>
										<Text style={{}}>Meet at vehicle</Text>
									</View>

									<View style={{ flex: 0.1, height: '100%', justifyContent: 'center' }}>
										{this.state.status ? (
											<Image
												style={{ alignSelf: 'center', height: '50%', width: '70%', resizeMode: 'contain' }}
												source={require('@res/Images/right_green.png')}
											/>
										) : null}
									</View>
								</View>
								{this.state.status ? (
									<View>
										<View style={{ height: 5 }} />

										<View style={styles.textInputView}>
											<View style={{ flex: 0.9, marginBottom: '3%' }}>
												<DeliveryDetailTextInput
													type="meet"
													placeholder="Enter your meet place"
													value={this.state.meetVehicle}
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
												onPress={this.clear.bind(this, 4)}
											>
												<Text style={{ color: '#cccccc' }}>X</Text>
											</TouchableOpacity>
										</View>
									</View>
								) : null}
								{/* <TextInput style={{width='100%',height:30}} /> */}
							</TouchableOpacity>

							<Separator />

							<TouchableOpacity style={globle.parentView1} onPress={this.toggle.bind(this, true, 'no')}>
								<View style={{ flex: 0.1, height: '100%', justifyContent: 'center' }}>
									<Image
										style={{ alignSelf: 'center', height: 20, width: 20, resizeMode: 'contain' }}
										source={require('@res/Images/delivery_icon.png')}
									/>
								</View>
								<View style={{ flex: 0.8, justifyContent: 'center' }}>
									<Text style={{}}>Deliver to you</Text>
								</View>

								<View style={{ flex: 0.1, height: '100%', justifyContent: 'center' }}>
									{this.state.status2 ? (
										<Image
											style={{ alignSelf: 'center', height: '50%', width: '70%', resizeMode: 'contain' }}
											source={require('@res/Images/right_green.png')}
										/>
									) : null}
								</View>
							</TouchableOpacity>

							<Separator />
							{this.state.show ? (
								<View style={styles.textInputView}>
									<View style={{ flex: 0.9, marginBottom: '3%' }}>
										<DeliveryDetailTextInput
											type="apartment"
											placeholder="Apartment number / Suite / Floor"
											value={this.state.apartment}
											onSubmitHandler={this.onSubmitHandler}
											onChangeTextHandler={this.onChangeTextHandler}
										/>
									</View>
									<TouchableOpacity style={{ flex: 0.08, justifyContent: 'center' }} onPress={this.clear.bind(this, 1)}>
										<Text style={{ color: '#cccccc' }}>X</Text>
									</TouchableOpacity>
								</View>
							) : null}
							<Separator />

							{this.state.show ? (
								<View style={styles.textInputView}>
									<View style={{ flex: 0.9, marginBottom: '3%' }}>
										<DeliveryDetailTextInput
											type="business_name"
											placeholder="Business Name"
											value={this.state.businessName}
											onSubmitHandler={this.onSubmitHandler}
											onChangeTextHandler={this.onChangeTextHandler}
										/>
									</View>
									<TouchableOpacity style={{ flex: 0.08, justifyContent: 'center' }} onPress={this.clear.bind(this, 2)}>
										<Text style={{ color: '#cccccc' }}>X</Text>
									</TouchableOpacity>
								</View>
							) : null}
							<Separator />
							{this.state.show ? (
								<View style={styles.textInputView}>
									<View style={{ flex: 0.9, marginBottom: '3%' }}>
										<DeliveryDetailTextInput
											type="delivery_note"
											placeholder="Add delivery note"
											value={this.state.deliveryNote}
											onSubmitHandler={this.onSubmitHandler}
											onChangeTextHandler={this.onChangeTextHandler}
										/>
									</View>
									<TouchableOpacity style={{ flex: 0.08, justifyContent: 'center' }} onPress={this.clear.bind(this, 3)}>
										<Text style={{ color: '#cccccc' }}>X</Text>
									</TouchableOpacity>
								</View>
							) : null}
							<Separator />
							{/* <View style={Platform.OS == 'ios' ? styles.gap : [styles.gap, { margin: androidGap }]}/> */}
							{this.state.show ? (
								<TouchableOpacity style={styles.button} onPress={this.onRemovedAddress}>
									<Text style={{ fontSize: 12, color: colors.green, alignSelf: 'center' }}>Removed saved address</Text>
								</TouchableOpacity>
							) : null}
						</ScrollView>
					</View>

					<TouchableOpacity
						onPress={() => {
							this.onSubmitAddress();
						}}
						style={{
							width: '100%',
							height: 45,
							backgroundColor: colors.green,
							alignContent: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ color: 'white', alignSelf: 'center' }}>Save</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
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
		height: 40,
		width: '50%',
		borderRadius: 20
	},
	textInputView: {
		width: '100%',
		height: 40,
		backgroundColor: '#f5f5f5',
		borderWidth: 2,
		borderRadius: 20,
		borderColor: 'grey',
		backgroundColor: 'white',
		flexDirection: 'row',
		borderColor: borderColor
	}
});
export default connect(
	state => ({ addressData: state.userAddress }),
	{ updateUserAddressData: Actions.updateUserAddressData }
)(Delivery_Details);

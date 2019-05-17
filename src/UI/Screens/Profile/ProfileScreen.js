import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import BackgroundImage from '@Components/Common/BackgroundImage';
import CircleShapeImage from '@Components/Common/CircleShapeImage';
import Images from '@Images';
import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import Navigation from '@Components/Common/Navigation';
import APIClient from '@Networking/APIClient';
import EndPoint from '@Networking/EndPoint';
import { DISPLAY_ALERT } from '@Utils/Alert';
import ImagePicker from 'react-native-image-picker';
import colors from '@Utils/colors';
import { Config } from '@Core/Config';

class ProfileScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			homeAddress: 'Add Home Address',
			workAddress: 'Add Work Address'
		};

		this.props.fetchUserData(Config.USER_ID);
	}
	editButtonAction = () => {
		this.props.navigation.push('EditProfileScreen');
	};
	componentDidMount() {
		this.props.fetchAddressData((res, err) => {
			//TODO: HUD hide
			if (!!err) {
				//TODO: parse error and show
			}
		});
	}
	renderNullImage() {
		return (
			<View
				style={{
					width: 100,
					height: 100,
					borderRadius: 100 / 2,

					justifyContent: 'center',
					alignSelf: 'center',

					backgroundColor: '#cccccc'
				}}
			>
				<Text style={{ color: '#000', alignSelf: 'center' }}>Add Photo</Text>
			</View>
		);
	}
	renderImage(image) {
		console.warn('renderImage', image);
		return (
			<Image
				style={{
					width: 100,
					height: 100,
					borderRadius: 100 / 2,

					alignSelf: 'center',
					borderWidth: 0.2
					//top: this.props.marginTop == null ? 10 : this.props.marginTop
				}}
				source={image}
			/>
		);
	}
	renderAsset(image) {
		if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
			return this.renderVideo(image);
		}

		return this.renderImage(image);
	}
	getUploadedImage = image => {
		console.warn('getUploadedImage');

		APIClient.multiPart(EndPoint.USER.UPLOAD_USER_IMAGE, [
			{ name: 'image', filename: 'image.png', type: 'image/png', data: image.data },
			{ name: 'id', data: this.props.userData.id }
		])
			.then(function(response) {
				console.warn(response);

				var res = JSON.parse(response);
				console.warn(res.status);

				if (res.status == 'success') {
					console.warn('response = success');
					this.props.updateUserData(res);

					//DISPLAY_ALERT('Good Bitee', res.msg);
				} else {
					DISPLAY_ALERT('Good Bitee', res.msg);
				}
			})
			.catch(function(error) {
				console.warn('error:', error);
			});
		//
	};
	selectPhotoTapped() {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		};

		ImagePicker.showImagePicker(options, response => {
			console.warn('Response = ', response);

			if (response.didCancel) {
				//	console.warn('User cancelled photo picker');
			} else if (response.error) {
				//	console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				//console.log('User tapped custom button: ', response.customButton);
			} else {
				let source = { uri: response.uri };
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				APIClient.multiPart(EndPoint.USER.UPLOAD_USER_IMAGE, [
					{ name: 'image', filename: 'image.png', type: 'image/png', data: response.data },
					{ name: 'id', data: this.props.userData.id }
				])
					.then(response => {
						console.warn(response);

						var res = JSON.parse(response);
						console.warn(res.status);

						if (res.status == 'success') {
							console.warn('response = success');
							this.props.updateUserData(res);

							//DISPLAY_ALERT('Good Bitee', res.msg);
						} else {
							DISPLAY_ALERT('Good Bitee', res.msg);
						}
					})
					.catch(function(error) {
						console.warn('error:', error);
					});
				this.setState({
					image: source
				});
				//console.warn('Saving image ', this.state.image);
			}
		});
	}
	renderHomeAddress = () => {
		let homeAddress = undefined;

		let data = [];

		if (this.props.userAddress) {
			{
				data = this.props.userAddress.filter(function(item) {
					return item.address_type == '1';
				});

				if (data.length > 0) {
					let address = data[0];

					homeAddress =
						address.appartment_no +
						',' +
						address.city +
						',' +
						address.state +
						',' +
						address.zip +
						',' +
						address.business_name;
				}
			}
		}

		return (
			<TouchableOpacity
				onPress={() => {
					if (data.length > 0) {
						let item = data[0];
						this.props.navigation.push('DeliveryDetailsScreen', {
							item
						});
					} else {
						this.props.navigation.push('DeliveryDetailsScreen', {
							address_type: '1',
							address: ''
						});
					}
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',

							marginTop: 10
						}}
					>
						<Image
							style={{
								width: 20,
								height: 20,
								alignSelf: 'center'
							}}
							source={Images.home.source}
						/>
					</View>
					<View
						style={{
							flex: 0.9,
							alignSelf: 'center',
							justifyContent: 'center',

							marginTop: 20,
							marginLeft: '8%'
						}}
					>
						<Text style={{}}>Home</Text>
						<Text style={{ paddingTop: 10 }}>{homeAddress != undefined ? homeAddress : this.state.homeAddress}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	renderWorkAddress = () => {
		let workAddress = undefined;

		let data = [];
		if (this.props.userAddress) {
			{
				data = this.props.userAddress.filter(function(item) {
					return item.address_type == '2';
				});

				if (data.length > 0) {
					let address = data[0];

					workAddress =
						address.appartment_no +
						',' +
						address.city +
						',' +
						address.state +
						',' +
						address.zip +
						',' +
						address.business_name;
				}
			}
		}

		return (
			<TouchableOpacity
				onPress={() => {
					if (data.length > 0) {
						let item = data[0];
						this.props.navigation.push('DeliveryDetailsScreen', {
							item
						});
					} else {
						this.props.navigation.push('DeliveryDetailsScreen', {
							address_type: '2',
							address: ''
						});
					}
				}}
			>
				<View style={{ backgroundColor: '#f5f5f5', width: '100%', height: '0.50%', marginTop: '2%' }} />

				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',

							marginTop: 10
						}}
					>
						<Image
							style={{
								width: 20,
								height: 20,
								alignSelf: 'center'
							}}
							source={Images.home.source}
						/>
					</View>
					<View
						style={{
							flex: 0.9,
							alignSelf: 'center',
							justifyContent: 'center',
							marginTop: 20,
							marginLeft: '8%'
						}}
					>
						<Text style={{}}>Work</Text>
						<Text style={{ paddingTop: 10 }}>{workAddress != undefined ? workAddress : this.state.workAddress}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	render() {
		let image = this.props.userData.image_thumb_url;
		console.warn('userAddress', this.props.userAddress);
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="User Name"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					rightButtonImage={Images.edit.source}
					isRightButtonHide={false}
					isMenu={true}
					rightButtonAction={this.editButtonAction}
				/>

				<View style={{ flex: 1 }}>
					<View
						style={{
							backgroundColor: 'white',
							borderRadius: 10,
							shadowOffset: { width: 6, height: 6 },
							shadowOpacity: 0.7,
							shadowColor: '#000',
							shadowRadius: 5,
							padding: 20,
							margin: 12,
							marginBottom: 5,
							height: '60%'
						}}
					>
						<View>
							{image ? this.renderAsset({ uri: image }) : this.renderNullImage()}

							<TouchableOpacity onPress={() => this.selectPhotoTapped()}>
								<Image
									style={{
										width: 20,
										height: 20,
										borderRadius: 7,
										alignSelf: 'center',
										marginRight: '15%',
										top: '-50%'
									}}
									source={Images.smallImage.source}
								/>
							</TouchableOpacity>
							{/* <CircleShapeImage
								smallImage={Images.smallImage.source}
								isImageSelected={Images.default.source}
								getPhoto={this.getUploadedImage}
								image={{ uri: image }}
								type={'profile_image'}
							/> */}

							<View style={styles.SavedBox}>
								<Text style={styles.SavedBoxText}>Saved Places</Text>
							</View>
						</View>
						{this.renderHomeAddress()}
						{this.renderWorkAddress()}
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('SetDeliveryAddressScreen');
							}}
						>
							<Text style={styles.viewAll}>View All</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	SavedBox: {
		width: '100%',
		height: 30,
		marginTop: 30,
		backgroundColor: '#f5f5f5',
		borderRadius: 5,
		alignSelf: 'center'
	},
	SavedBoxText: {
		alignSelf: 'center',
		marginTop: 5
	},
	viewAll: {
		paddingLeft: 10,
		paddingTop: 20,
		color: 'green'
	}
});
export default connect(
	state => ({ userData: state.userData, userAddress: state.userAddress }),
	{
		setUserData: Actions.setUserData,
		fetchUserData: Actions.fetchUserData,
		updateUserData: Actions.updateUserData,
		fetchAddressData: Actions.fetchAddressData
	}
)(ProfileScreen);

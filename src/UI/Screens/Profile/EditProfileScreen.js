import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import EditTextField from '@Components/Common/EditTextField';
import BackgroundImage from '@Components/Common/BackgroundImage';

import { connect } from 'react-redux';
import { Actions } from '@Redux';
import Navigation from '@Components/Common/Navigation';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import Images from '@res/Images';
import CircleShapeImage from '@Components/Common/CircleShapeImage';
import APIClient from '@Networking/APIClient';
import EndPoint from '@Networking/EndPoint';
import { DISPLAY_ALERT } from '@Utils/Alert';

class EditProfileScreen extends Component {
	constructor() {
		super();

		this.getProfileData.bind(this);
	}

	componentDidMount() {
		this.getProfileData();
	}

	getProfileData() {
		// TODO: HUD show
		// this.props.fetchUserData((res, err) => {
		// 	//TODO: HUD hide
		// 	if (!!err) {
		// 		//TODO: parse error and show
		// 	}
		// });
	}
	getUploadedImage = (image, type) => {
		APIClient.multiPart(EndPoint.USER.UPLOAD_USER_IMAGE, [
			{ name: 'image', filename: 'image.png', type: 'image/png', data: image.data },
			{ name: 'id', data: this.props.userData.id }
		])
			.then(response => {
				var res = JSON.parse(response);

				if (res.status == 'success') {
					console.warn('response = success');
					this.props.updateUserData(res);
					console.warn(res);

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
	render() {
		console.warn('render Edit profile');
		let image = this.props.userData.image_thumb_url;

		const titleX = SCREEN_WIDTH / 2 - 90;
		return (
			<View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Edit Profile"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<ScrollView style={{ height: '100%', marginTop: 15, width: '100%' }}>
					<View
						style={{
							width: '90%',
							backgroundColor: 'white',
							alignSelf: 'center',
							borderRadius: 10,
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.3,
							paddingBottom: 40
						}}
					>
						{/* <View style={styles.CircleShapeView}>
							<Image
								style={{
									width: 100,
									height: 100,
									borderRadius: 100 / 2,
									alignSelf: 'center',
									borderWidth: 0.2,
									top: 20
								}}
								source={require('@res/Images/vip.jpg')}
							/>
							<TouchableOpacity>
								<View style={styles.EditImage}>
									<Image
										style={{
											width: 25,
											height: 25,
											marginLeft: '40%',

											top: 4
										}}
										source={require('@res/Images/edit_image_icon.png')}
									/>
								</View>
							</TouchableOpacity>
						

							<View
								style={{
									backgroundColor: '#f5f5f5',
									width: '92%',
									height: 2,
									marginTop: '10%',
									alignSelf: 'center',
									flexDirection: 'row',
									borderRadius: 5
								}}
							/>
						</View> */}
						<CircleShapeImage
							smallImage={Images.smallImage.source}
							isImageSelected={Images.default.source}
							getPhoto={this.getUploadedImage}
							image={{ uri: image }}
							type={'profile_image'}
						/>
						<Text style={{ margin: 10, marginLeft: 30, color: 'gray' }}>Name</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('EditAccountScreen', {
									placeholder: 'Enter Name',
									value: this.props.userData.full_name,
									key: 'full_name',
									label: 'Name'
								});
							}}
						>
							<EditTextField
								placeholder="Enter Name"
								isEditable={false}
								value={this.props.userData.full_name}
								isImage={true}
								icon={Images.name.source}
								type="select"
							/>
						</TouchableOpacity>

						<Text style={{ margin: 10, marginLeft: 30, color: 'gray' }}>Phone Number</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('EditAccountScreen', {
									placeholder: 'Enter Phone',
									value: this.props.userData.phone,
									key: 'phone',
									label: 'Phone'
								});
							}}
						>
							<EditTextField
								placeholder="Enter Phone Number"
								isEditable={false}
								value={this.props.userData.phone}
								isImage={true}
								icon={Images.phone.source}
								type="select"
							/>
						</TouchableOpacity>

						<Text style={{ margin: 10, marginLeft: 30, color: 'gray' }}>E-mail</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('EditAccountScreen', {
									placeholder: 'Enter Email',
									value: this.props.userData.email,
									key: 'email',
									label: 'Email'
								});
							}}
						>
							<EditTextField
								placeholder="Enter E-mail"
								isEditable={false}
								value={this.props.userData.email}
								isImage={true}
								icon={Images.email.source}
								type="select"
							/>
						</TouchableOpacity>

						<Text style={{ margin: 10, marginLeft: 30, color: 'gray' }}>Password</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('EditAccountScreen', {
									placeholder: 'Enter Password',
									value: this.props.userData.password,
									key: 'password',
									label: 'Password'
								});
							}}
						>
							<EditTextField
								placeholder="Enter Password"
								secureEntry={true}
								isEditable={false}
								value={this.props.userData.password}
								//value="vaibhav"
								isImage={true}
								icon={Images.password.source}
								type="select"
								security="true"
							/>
						</TouchableOpacity>
					</View>
				</ScrollView>
				{/* </SafeAreaView> */}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF'
		//marginTop: -650,
	},

	nameBox: {
		width: 250,
		height: 30,
		marginTop: 30,
		backgroundColor: '#cccccc',
		borderRadius: 5,
		marginLeft: 50
	},

	nameBoxText: {
		marginLeft: 80,
		marginTop: 5,

		color: 'white'
	},
	HomeImg: {
		flexDirection: 'row'
	},
	homeDes: {
		marginLeft: 30,
		marginTop: 70,
		fontWeight: 'bold',
		color: 'white'
	}
});

export default connect(
	state => ({ userData: state.userData }),
	{ fetchUserData: Actions.fetchUserData, updateUserData: Actions.updateUserData }
)(EditProfileScreen);

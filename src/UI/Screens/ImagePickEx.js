// import React, { Component } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// const options = {
// 	title: 'Select Avatar',
// 	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
// 	storageOptions: {
// 		skipBackup: true,
// 		path: 'images'
// 	}
// };

// export default class ImagePickEx extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}

// 	takePic() {
// 		ImagePicker.showImagePicker(options, response => {
// 			console.log('Response = ', response);

// 			if (response.didCancel) {
// 				console.log('User cancelled image picker');
// 			} else if (response.error) {
// 				console.log('ImagePicker Error: ', response.error);
// 			} else if (response.customButton) {
// 				console.log('User tapped custom button: ', response.customButton);
// 			} else {
// 				const source = { uri: response.uri };

// 				// You can also display the image using data:
// 				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

// 				this.setState({
// 					avatarSource: source
// 				});
// 			}
// 		});
// 	}

// 	render() {
// 		return (
// 			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// 				<TouchableOpacity onPress={() => this.takePic()}>
// 					<Text>click here</Text>
// 					<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	uploadAvatar: {
// 		width: 30,
// 		height: 30,
// 		resizeMode: 'contain'
// 	}
// });
// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image } from 'react-native';

// import ImagePicker from 'react-native-image-picker';

// export default class ImagePickEx extends React.Component {
// 	state = {
// 		ImageSource: null
// 	};

// 	selectPhotoTapped() {
// 		const options = {
// 			quality: 1.0,
// 			maxWidth: 500,
// 			maxHeight: 500,
// 			storageOptions: {
// 				skipBackup: true
// 			}
// 		};

// 		ImagePicker.showImagePicker(options, response => {
// 			console.warn('Response = ', response);

// 			if (response.didCancel) {
// 				console.warn('User cancelled photo picker');
// 			} else if (response.error) {
// 				console.warn('ImagePicker Error: ', response.error);
// 			} else if (response.customButton) {
// 				console.log('User tapped custom button: ', response.customButton);
// 			} else {
// 				let source = { uri: response.uri };

// 				// You can also display the image using data:
// 				// let source = { uri: 'data:image/jpeg;base64,' + response.data };

// 				this.setState({
// 					ImageSource: source
// 				});
// 			}
// 		});
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
// 					<View style={styles.ImageContainer}>
// 						{this.state.ImageSource === null ? (
// 							<Text>Select a Photo</Text>
// 						) : (
// 							<Image style={styles.ImageContainer} source={this.state.ImageSource} />
// 						)}
// 					</View>
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#FFF8E1'
// 	},

// 	ImageContainer: {
// 		borderRadius: 10,
// 		width: 250,
// 		height: 250,
// 		borderColor: '#9B9B9B',
// 		borderWidth: 1 / PixelRatio.get(),
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#CDDC39'
// 	}
// });

import React, { Component } from 'react';

import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'rn-fetch-blob';

export default class ImagePickEx extends Component {
	constructor() {
		super();

		this.state = {
			ImageSource: null,
			fileSource: null,
			fileData: null,
			data: null,

			Image_TAG: '',
			kitchen_name: '',
			full_name: '',
			phone: '',
			email: '',
			dob: ''
		};
	}

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
				console.warn('User cancelled photo picker');
			} else if (response.error) {
				console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.warn('User tapped custom button: ', response.customButton);
			} else {
				let source = { uri: response.uri };

				console.warn('URI ', source);

				this.setState({
					ImageSource: source,
					//fileSource: source,
					//fileData: response.data,
					data: response.data
				});
			}
		});
	}

	selectPhotoTapped1() {
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
				console.warn('User cancelled photo picker');
			} else if (response.error) {
				console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.warn('User tapped custom button: ', response.customButton);
			} else {
				let source = { uri: response.uri };

				console.warn('URI ', source);

				this.setState({
					fileSource: source,
					fileData: response.data
				});
			}
		});
	}

	uploadImageToServer = () => {
		console.warn('in upload image ', this.state.data);
		console.warn('in upload image ', this.state.fileData);

		RNFetchBlob.fetch(
			'POST',
			'http://goodbitee.com/web_services/test_image',
			{
				Authorization: 'Bearer access-token',
				otherHeader: 'foo',
				'Content-Type': 'multipart/form-data'
			},
			[
				{ name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
				{ name: 'image_name', data: this.state.Image_TAG },
				{ name: 'kitchen_name', data: this.state.kitchen_name },
				{ name: 'full_name', data: this.state.full_name },
				{ name: 'email', data: this.state.email },
				{ name: 'phone', data: this.state.phone },
				{ name: 'dob', data: this.state.dob },
				{ name: 'file', filename: 'file.png', type: 'image/png', data: this.state.fileData }
			]
		)

			.then(resp => {
				var tempMSG = resp.data;
				console.warn('Getting ', resp.data);

				tempMSG = tempMSG.replace(/^"|"$/g, '');

				Alert.alert(tempMSG);
			})
			.catch(err => {
				// ...
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
					<View style={styles.ImageContainer}>
						{this.state.ImageSource === null ? (
							<Text>Select a Photo</Text>
						) : (
							<Image style={styles.ImageContainer} source={this.state.ImageSource} />
						)}
					</View>
				</TouchableOpacity>

				<TextInput
					placeholder="Enter Image Name "
					onChangeText={data => this.setState({ Image_TAG: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TextInput
					placeholder="Enter Kitchen Name "
					onChangeText={data => this.setState({ kitchen_name: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TextInput
					placeholder="Enter Full Name "
					onChangeText={data => this.setState({ full_name: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TextInput
					placeholder="Enter Phone Number "
					onChangeText={data => this.setState({ phone: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TextInput
					placeholder="Enter Email "
					onChangeText={data => this.setState({ email: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TextInput
					placeholder="Enter dob "
					onChangeText={data => this.setState({ dob: data })}
					underlineColorAndroid="transparent"
					style={styles.TextInputStyle}
				/>

				<TouchableOpacity onPress={this.selectPhotoTapped1.bind(this)}>
					<View style={styles.ImageContainer}>
						{this.state.fileSource === null ? (
							<Text>Select a Photo</Text>
						) : (
							<Image style={styles.ImageContainer} source={this.state.fileSource} />
						)}
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button}>
					<Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFF8E1',
		paddingTop: 20
	},

	ImageContainer: {
		borderRadius: 10,
		width: 100,
		height: 100,
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#CDDC39'
	},

	TextInputStyle: {
		textAlign: 'center',
		height: 40,
		width: '80%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#028b53',
		marginTop: 20
	},

	button: {
		width: '80%',
		backgroundColor: '#00BCD4',
		borderRadius: 7,
		marginTop: 20
	},

	TextStyle: {
		color: '#fff',
		textAlign: 'center',
		padding: 10
	}
});

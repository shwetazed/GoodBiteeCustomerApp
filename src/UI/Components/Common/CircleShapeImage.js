import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, NativeModules, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import { SAVE_PROFILE_PIC, GET_PROFILE_PIC } from '@Core/Storage';
//var ImagePicker = NativeModules.ImageCropPicker;

export default class CircleShapeImage extends Component {
	constructor() {
		super();
		this.state = {
			image: null
			//images: null
		};
	}
	componentDidMount() {
		console.warn('Image', this.props.image);
		this.setState({
			image: this.props.image
		});
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
				//	console.warn('User cancelled photo picker');
			} else if (response.error) {
				//	console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				//console.log('User tapped custom button: ', response.customButton);
			} else {
				let source = { uri: response.uri };
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				this.props.getPhoto(response, this.props.type);
				this.setState({
					image: source
				});
				//console.warn('Saving image ', this.state.image);
				SAVE_PROFILE_PIC('USER_IMAGE', source);
			}
		});
	}

	renderImage(image) {
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

	renderAsset(image) {
		if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
			return this.renderVideo(image);
		}

		return this.renderImage(image);
	}

	render() {
		return (
			<View>
				<ScrollView style={{ top: 10 }}>
					{this.state.image ? this.renderAsset(this.state.image) : this.renderNullImage()}
				</ScrollView>

				<TouchableOpacity onPress={() => this.selectPhotoTapped()}>
					<Image
						style={{
							width: 20,
							height: 20,
							borderRadius: 7,
							alignSelf: 'center',
							marginRight: '15%',
							top: '-35%'
						}}
						source={this.props.smallImage}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

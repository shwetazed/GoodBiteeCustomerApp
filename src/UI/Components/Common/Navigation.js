import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import Images from '@Images';
import { isIphoneX } from '@Components/DeviceType/isIphoneX';
import { drawer } from '@Navigations/AppNavigation';
import { GET_DATA, SAVE_DATA } from '@Core/Storage';

export default class Navigation extends Component {
	renderLeftImage = () => {
		if (this.props.isLeftButtonHide == false) {
			return (
				<View style={{ height: 25, flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							{
								GET_DATA('USER').then(data => {
									if (data == '' || data == 'undefined') {
										this.props.navigation.navigate('LoginScreen');
									} else {
										this.props.isMenu == true ? drawer.current.open() : this.props.navigation.pop();
									}
								});
							}
						}}
					>
						<Image
							source={this.props.letButtonImage}
							style={this.props.isMenu == true ? styles.leftImage : [styles.leftImage, { right: 15 }]}
						/>
					</TouchableOpacity>
				</View>
			);
		}
	};
	renderRightImage = () => {
		if (this.props.isRightButtonHide == false) {
			return (
				<TouchableOpacity onPress={this.props.rightButtonAction}>
					<Image source={this.props.rightButtonImage} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
				</TouchableOpacity>
			);
		}
	};
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<View flexDirection="row">
					{this.props.isRightButtonHide == false ? (
						<View style={{ flex: 0.07, borderWidth: 0 }} />
					) : (
						<View style={{ flex: 0.06, borderWidth: 0 }} />
					)}

					{this.renderLeftImage()}
					{/* <Image source={Images.backButton.source} style={{ width: 20, height: 20, padding: 10, flex: 0.2 }} /> */}
					<View style={{ flex: 0.04 }} />
					<View
						style={{
							flex: 0.77,
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '100%',
							borderWidth: 0
						}}
					>
						<Text style={{ color: 'white', fontSize: 20 }}>{this.props.title}</Text>
					</View>
					<View style={{ flex: 0.05 }} />

					{this.renderRightImage()}
					<View style={{ flex: 0.05 }} />

					{/* <Image style={{ width: 20, height: 20, padding: 10, flex: 0.2 }} /> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: (HEADER_SIZE = isIphoneX() ? 45 : 10),
		height: 30,
		justifyContent: 'center',
		borderWidth: 0,
		//alignItems: 'center',
		width: '100%'
	},
	leftImage: {
		width: 25,
		height: '80%',
		resizeMode: 'contain',
		//borderWidth: 1,
		right: 9
	}
});

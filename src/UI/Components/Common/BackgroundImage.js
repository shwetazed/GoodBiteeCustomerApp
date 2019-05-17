import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class BackgroundImage extends Component {
	render() {
		return (
			<Image
				style={{
					position: 'absolute',
					top: 0,
					width: '100%',
					height: maintainRatio(1242, 840, SCREEN_WIDTH),
					resizeMode: 'contain'
				}}
				source={Images.headerBg.source}
			/>
			// <ImageBackground source={Images.headerBg.source} style={{ width: '100%', height: '100%' }}>
			// 	{this.props.children}
			// </ImageBackground>
		);
	}
}

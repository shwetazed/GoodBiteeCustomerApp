import React, { Component } from 'react';
//import rect in our project
import {
	StyleSheet,
	ImageBackground,
	TextInput,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
	TouchableOpacity
} from 'react-native';
//import all the components we will need
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class SearchCategoryItem extends Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column', margin: 3 }}>
				<ImageBackground style={styles.imageThumbnail} source={{ uri: this.props.item.image_thumb_url }}>
					{/* <ImageBackground style={styles.imageThumbnail} source={require('@res/Images/vegg.jpeg')}> */}
					<View
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.7)',
							borderRadius: 5,
							width: (SCREEN_WIDTH - 20) / 2,
							height: 30,
							justifyCont: 'center',
							alignItems: 'center',
							padding: 5,
							marginTop: 100
						}}
					>
						<Text style={{ color: 'black' }}>{this.props.item.name}</Text>
					</View>
				</ImageBackground>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		width: (SCREEN_WIDTH - 20) / 2,
		borderRadius: 10,
		overflow: 'hidden'
	}
});

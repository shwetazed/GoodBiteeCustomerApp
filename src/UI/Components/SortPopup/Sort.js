import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Images from '@Images';
import PopupButton from '@Components/Common/PopupButtons';
const { width, height } = Dimensions.get('window');

function responsiveWidth(size, screen = 375) {
	return Math.round((width * size) / screen);
}

function responsiveHeight(size, screen = 667) {
	return Math.round((height * size) / screen);
}

export default class Sort extends Component {
	render() {
		showImage = () => {
			{
				console.warn('calling ');
			}
		};

		return (
			<View>
				<PopupButton title="Vegetarian" image={Images.vegetarian.source} />
				<PopupButton title="Gluten-Free" image={Images.gluten.source} />
				<PopupButton title="Vegan" image={Images.vegan.source} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	parent: {
		backgroundColor: '#f5f5f5',
		width: '100%',
		height: responsiveHeight(35),
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 10
		//borderWidth: 1
		//justifyContent: 'center'
	},
	imageView: {
		flex: 0.1,
		alignSelf: 'center',
		justifyContent: 'center',
		//marginLeft: '1%',
		padding: '2%'
		//borderWidth: 1
	},
	image: {
		width: 15,
		height: 15,
		alignSelf: 'center'
	},
	textView: {
		//width: '70%',
		flex: 0.8,
		alignSelf: 'center',
		justifyContent: 'center'

		// borderWidth: 1
	},
	text: {
		color: '#555555',
		fontSize: responsiveWidth(12)
	},
	gap: { height: responsiveHeight(8) }
});

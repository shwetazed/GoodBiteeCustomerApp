import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import Images from '@Images';

export default class MainCategoryListItem extends Component {
	renderCheckMarkImage = () => {
		console.warn(this.props.selectedDataSource);

		if (this.props.selectedDataSource.includes(this.props.item.category_id)) {
			return <Image source={Images.checkmark.source} style={{ width: 30, height: 30 }} />;
		}
	};

	render() {
		return (
			<View style={styles.MainContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.textStyle}>{this.props.item.category_name}</Text>
					{this.renderCheckMarkImage()}
				</View>
				<Image style={styles.separatorLine} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		width: SCREEN_WIDTH - 30,
		height: 60,
		backgroundColor: 'white',
		justifyContent: 'center'
	},
	separatorLine: {
		justifyContent: 'center',
		width: SCREEN_WIDTH - 30,
		backgroundColor: 'gray',
		height: 1
	},
	textContainer: {
		width: SCREEN_WIDTH - 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 37
	},

	textStyle: {}
});

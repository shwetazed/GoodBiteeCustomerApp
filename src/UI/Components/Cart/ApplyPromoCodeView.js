import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, TextInput, ImageBackground, View, TouchableOpacity } from 'react-native';
import Images from '@Images';

export default class ApplyPromoCodeView extends Component {
	render() {
		return (
			<View
				style={{
					width: '82%',
					height: 40,
					flexDirection: 'row',
					borderRadius: 50,
					borderWidth: 1,
					margin: 15,
					borderColor: 'gray'
				}}
			>
				<Image
					style={{
						width: '10%',
						height: '50%',
						alignSelf: 'center',
						top: '0%',
						marginLeft: 15,
						resizeMode: 'contain'
					}}
					source={Images.home.source}
				/>
				{/* <TextInput
						style={[styles.editText, this.props.style]}
						placeholder={this.props.placeholder}
						secureTextEntry={this.props.secureEntry}
						editable={this.props.isEditable}
					/> */}

				<TouchableOpacity style={[styles.editText, this.props.style]} onPress={this.props.onPressButton}>
					<Text>{this.props.promo}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.props.onPressApplyButton}
					style={{ backgroundColor: 'green', borderRadius: 50, marginLeft: -35, width: 85, height: 41, marginTop: -1 }}
					//onPress={this.props.onPressApplyCoupon}
				>
					<Text style={styles.applyText}>Apply</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	editText: {
		paddingLeft: 15,
		fontSize: 13,
		height: '100%',
		width: '80%',
		justifyContent: 'center'
	},
	applyText: {
		fontSize: 13,
		textAlign: 'center',
		fontSize: 15,
		color: 'white',
		alignSelf: 'center',
		paddingTop: 10
	}
});

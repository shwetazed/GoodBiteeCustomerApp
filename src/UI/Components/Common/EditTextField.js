import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, TextInput, ImageBackground, View } from 'react-native';
import Images from '@Images';

export default class EditTextField extends Component {
	renderImage = () => {
		if (this.props.isImage) {
			return (
				<Image
					style={{
						width: 20,
						height: 20,
						alignSelf: 'center',
						marginLeft: 15,
						resizeMode: 'contain'
					}}
					source={this.props.icon}
				/>
			);
		}
	};

	render() {
		console.warn(this.props.value);
		return (
			<View
				style={{
					backgroundColor: '#f5f5f5',
					width: '92%',
					height: 45,
					alignSelf: 'center',
					flexDirection: 'row',
					paddingLeft: 10,
					paddingRight: 10,
					borderRadius: 50,
					margin: 2
					//borderWidth: 1
				}}
			>
				{this.renderImage()}

				{this.props.type == 'select' ? (
					<View
						style={[styles.editText, { justifyContent: 'center' }]}
						//placeholder={this.props.placeholder}
						//secureTextEntry={this.props.secureEntry}
						//editable={this.props.isEditable}
					>
						<Text>
							{this.props.security == 'true' && this.props.value != null
								? '**************'
								: this.props.value == null
								? this.props.placeholder
								: this.props.value}
						</Text>
						{/* <Text>{this.props.placeholder}</Text> */}
					</View>
				) : (
					<TextInput
						style={[styles.editText, this.props.style]}
						placeholder={this.props.placeholder}
						secureTextEntry={this.props.secureEntry}
						editable={this.props.isEditable}
						value={this.props.value}
					/>
				)}
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
		alignSelf: 'center',
		color: 'gray'
	}
});

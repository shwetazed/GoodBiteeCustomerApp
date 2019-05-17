import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Images from '@Images';

export default class EditRegistrationBox extends Component {
	constructor(props) {
		super(props);
		this.state = { text: 'enter value here' };
	}
	renderImage = () => {
		if (this.props.isImage) {
			return (
				<Image
					style={{
						width: 20,
						height: 20,
						alignSelf: 'center',
						marginLeft: 15,
						resizeMode: 'contain',
						marginTop: 30
					}}
					source={Images.home.source}
				/>
			);
		}
	};
	render() {
		return (
			//	<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
			<View
				style={{
					width: '100%',
					height: 40,
					borderWidth: 2,
					borderRadius: 20,
					paddingLeft: '5%',
					borderColor: '#cccccc',
					flexDirection: 'row',
					marginTop: '8%'
				}}
			>
				{this.renderImage()}

				<View style={{ flex: 0.8 }}>
					<TextInput
						style={{ marginTop: 10, height: '100%', borderColor: 'gray', color: '#cccccc', marginLeft: 8, padding: 8 }}
						value={this.props.text}
						placeholder={this.props.placeholder}
						secureTextEntry={this.props.isSecure}
						placeholderTextColor="#cccccc"
						onChange={event => {
							onChangeTextHandler(event.nativeEvent.text, this.props.placeholder);
						}}
					/>
				</View>
			</View>
			// </View>
		);
	}
}

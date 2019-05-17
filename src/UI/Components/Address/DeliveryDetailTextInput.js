import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const textPaddingIos = '4%';
const textPaddingAnd = '3%';
export default class DeliveryDetailTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<TextInput
					style={Platform.OS == 'ios' ? { flex: 0, marginTop: '3%', marginLeft: '5%' } : { flex: 0, marginLeft: '4%' }}
					placeholder={this.props.placeholder}
					onChange={event => {
						this.props.onChangeTextHandler(event.nativeEvent.text, this.props.type);
					}}
					onSubmitEditing={event => {
						this.props.onSubmitHandler(event.nativeEvent.text, this.props.type);
					}}
					clearButtonMode="never"
					value={this.props.value}
					underlineColorAndroid="transparent"
				/>
			</View>
		);
	}
}

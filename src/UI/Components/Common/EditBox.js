import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
let maskType;

export default class EditBox extends Component {
	constructor(props) {
		super(props);
		this.state = { text: 'enter value here' };
	}
	renderTextInput = () => {
		if (this.props.isMask == true) {
			return (
				<TextInputMask
					type={'custom'}
					options={{
						mask: this.props.maskType
					}}
					style={{ height: '100%', borderColor: 'gray', color: '#cccccc' }}
					value={this.props.value}
					onChangeText={event => {
						this.props.onChangeTextHandler(event, this.props.text_type);
					}}
					placeholder={this.props.placeholder}
					placeholderTextColor="#cccccc"
					editable={this.props.isEditable}
				/>
			);
		} else {
			return (
				<TextInput
					style={{ height: '100%', borderColor: 'gray', color: '#cccccc' }}
					value={this.props.value}
					underlineColorAndroid="transparent"
					onChange={event => {
						this.props.onChangeTextHandler(event.nativeEvent.text, this.props.text_type);
					}}
					placeholder={this.props.placeholder}
					placeholderTextColor="#cccccc"
					editable={this.props.isEditable}

					// textContentType="telephoneNumber"
					// dataDetectorTypes="phoneNumber"
					// keyboardType="phone-pad"
					// maxLength={14}
				/>
			);
		}
	};

	render() {
		const { onChangeTextHandler } = this.props;
		maskType = '(SSS) SSS-9999';
		//maskType = '';

		return (
			//<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
			<View
				style={{
					width: '100%',
					height: 40,
					borderWidth: 2,
					borderRadius: 20,
					justifyContent: 'center',
					paddingLeft: '5%',
					//marginTop: this.props.marginTop,
					borderColor: '#cccccc',
					alignItem: 'center',
					flexDirection: 'row',
					borderWidth: 1
				}}
			>
				{this.props.type == 'select' ? (
					<View
						style={{
							flex: 0.8,
							height: '100%',
							borderColor: 'gray',

							justifyContent: 'center'
						}}
					>
						<Text style={{ color: '#cccccc' }}>{this.props.value}</Text>
					</View>
				) : (
					<View style={{ flex: 0.8 }}>
						{this.renderTextInput()}

						{/* <TextInputMask
							type={'custom'}
							options={{
								mask: maskType
							}}
							style={{ height: '100%', borderColor: 'gray', color: '#cccccc' }}
							value={this.props.text}
							onChangeText={event => {
								onChangeTextHandler(event.nativeEvent.text, this.props.type);
							}}
							placeholder={this.props.placeholder}
							placeholderTextColor="#cccccc"
							editable={this.props.isEditable}
						/> */}
					</View>
				)}
				<View style={{ flex: 0.2, alignItem: 'center', justifyContent: 'center' }}>
					<Image
						style={{
							height: '30%',
							width: '30%',
							alignSelf: 'center',
							resizeMode: 'contain'
						}}
						source={this.props.image}
						// source={require('@res/Images/down-arrow.png')}
					/>
				</View>
			</View>
			//</View>
		);
	}
}

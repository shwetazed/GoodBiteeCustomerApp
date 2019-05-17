import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

export default class DropDownBox extends Component {
	constructor(props) {
		super(props);
		this.state = { text: 'enter value here' };
	}

	render() {
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
				<View style={{ flex: 0.8 }}>
					<TextInput
						style={{ height: '100%', borderColor: 'gray', color: '#cccccc' }}
						value={this.props.text}
						onChangeText={val => this.setState({ val })}
						//placeholder={this.props.placeholder}
						placeholder={this.props.placeholder}
						placeholderTextColor="#cccccc"
						//secureTextEntry={true}
					/>
				</View>
				<View style={{ flex: 0.2, alignItem: 'center', justifyContent: 'center' }}>
					<Image
						style={{
							height: '30%',
							width: '30%',
							alignSelf: 'center',
							resizeMode: 'contain'
						}}
						source={require('@res/Images/down-arrow.png')}
					/>
				</View>
			</View>
			//</View>
		);
	}
}

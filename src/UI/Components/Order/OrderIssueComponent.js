import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Images from '@Images';

export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableOpacity onPress={this.props.onPressButton}>
				<View
					style={{
						backgroundColor: '#F8F2F2',
						width: '95%',
						height: 35,

						alignSelf: 'center',
						flexDirection: 'row',
						borderRadius: 8,
						//justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<View style={{ flex: 0.03, borderWidth: 0 }} />
					<Text style={{ color: '#555555', flex: 0.85, fontSize: 13, borderWidth: 0 }}>{this.props.title}</Text>
					<View style={{ flex: 0.03, borderWidth: 0 }} />
					<Image
						style={{ height: '60%', flex: 0.06, resizeMode: 'contain', borderWidth: 0 }}
						source={Images.forwardArrow.source}
					/>
				</View>
			</TouchableOpacity>
		);
	}
}

import React, { Component } from 'react';
import { Text } from 'react-native';
export default class NavigationTitle extends Component {
	render() {
		return (
			<Text
				style={{
					marginTop: 20,
					color: 'white',
					alignSelf: 'center',
					fontSize: 20
				}}
			>
				{this.props.children}
			</Text>
		);
	}
}

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default class FoodIngradient extends Component {
	constructor(props) {
		super(props);
		this.state = { textInput_Holder: '' };
		this.array = [];
	}

	getInputValues(data) {
		this.setState({ textInput_Holder: data });
		this.array.push(this.state.textInput_Holder);
		console.warn('Array after getting values ', this.array);
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="type your ingradient name "
					onChangeText={data => this.getInputValues(data)}
					style={styles.textInputStyle}
				/>
				<TextInput
					placeholder="type price here"
					onChangeText={data => this.getInputValues(data)}
					style={styles.textInputStyle}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	textInputStyle: {
		textAlign: 'center',
		height: 40,
		width: '90%',
		borderWidth: 1,
		borderColor: '#4CAF50',
		borderRadius: 7,
		marginTop: 12
	}
});

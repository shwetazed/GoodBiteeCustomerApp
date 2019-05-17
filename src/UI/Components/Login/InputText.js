import React from 'react';
import { TextInput, Image, View, StyleSheet, Text } from 'react-native';

export default class InputText extends React.Component {
	render() {
		const { onChangeTextHandler } = this.props;

		return (
			<View style={styles.container}>
				{<Image source={this.props.image} style={styles.imageInput} />}
				<TextInput
					secureTextEntry={this.props.isSecure}
					placeholder={this.props.children}
					secureTextEntry={this.props.isSecure}
					Keyboard
					style={styles.textInput}
					onChange={event => {
						onChangeTextHandler(event.nativeEvent.text, this.props.children);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 50,
		color: '#FFF',
		width: '80%',
		height: 40,
		justifyContent: 'center',
		fontSize: 14,
		flexDirection: 'row',
		alignItems: 'center'
	},
	imageInput: {
		width: 20,
		height: 7,
		paddingTop: 15,
		paddingBottom: 15,
		paddingRight: 15,
		paddingLeft: 5,
		resizeMode: 'contain'
		//borderWidth: 1
	},
	textInput: {
		color: 'gray',
		paddingLeft: 10,
		fontSize: 15,
		width: '80%'
	}
});

import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, TouchableOpacity } from 'react-native';
import GoodBiteeDialogBox from '@Components/DialogBox/GoodBiteeDialogBox';
export default class CheckDialog extends Component {
	state = {
		modalVisible: false,
		dialogVisible: false
	};
	toggleModal(visible) {
		this.setState({ modalVisible: visible });
	}
	// toggleDialog(visible) {
	// 	this.setState({ dialogVisible: visible });
	// }
	render() {
		return (
			<View style={styles.container}>
				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View
						style={styles.container1}
						// onPress={() => {
						// 	//this.toggleModal(false);
						// 	//console.warn(this.state.modalVisible);
						// }}
					>
						<GoodBiteeDialogBox
							data={this.state.dialogVisible}
							onPressButton={() => {
								this.toggleModal(false);
							}}
						/>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						this.toggleModal(true);
					}}
				>
					<Text style={styles.text}>Open Modal</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#ede3f2',
		padding: 100
	},
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#f0000000',
		padding: 100
	},
	text: {
		color: '#3f2949',
		marginTop: 10
	}
});

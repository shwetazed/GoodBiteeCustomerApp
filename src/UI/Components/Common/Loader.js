import React, { Component } from 'react';
import { View, Text, Modal, Image, StyleSheet } from 'react-native';

export default class Loader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.props.visible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View style={styles.container1}>
						<Image source={require('@Images/loading.gif')} style={{ height: 100, width: 150 }} />
						<Text style={{ color: 'white', fontWeight: '700', height: 70, width: 200, textAlign: 'center' }}>
							Loading please wait...
						</Text>
					</View>
				</Modal>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	}
});

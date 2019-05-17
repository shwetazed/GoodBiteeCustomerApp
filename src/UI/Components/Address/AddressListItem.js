import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class AddressListItem extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 0.2, justifyContent: 'flex-start', height: 40 }}>
					<Image
						source={require('@res/Images/delivery_icon.png')}
						style={{ width: 30, height: 30, margin: 5, marginLeft: 10 }}
					/>
				</View>

				<View style={styles.addressContainer}>
					<Text style={{ fontSize: 13, color: 'black', paddingTop: 5 }}>{this.props.item.address1}</Text>
					<Text style={{ fontSize: 12, color: 'gray', paddingBottom: 5 }}>
						{this.props.item.appartment_no +
							',' +
							this.props.item.city +
							',' +
							this.props.item.state +
							',' +
							this.props.item.zip +
							',' +
							this.props.item.business_name}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		width: '96%',
		borderRadius: 10,
		margin: 5,
		marginTop: 10,
		flexDirection: 'row'
	},
	addressContainer: {
		width: '100%',
		flex: 0.8
	}
});

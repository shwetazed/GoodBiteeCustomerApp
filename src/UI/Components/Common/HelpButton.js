import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Images from '@res/Images';

export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableOpacity onPress={this.props.onPressButton}>
				<View style={styles.container}>
					<View style={styles.imageView}>
						<Image
							style={this.props.imageSize == 'true' ? [styles.image, { height: '60%' }] : styles.image}
							// source={require('./Home.png')}
							source={this.props.image}
						/>
					</View>
					<View style={styles.text}>
						<Text style={{ color: '#555555', fontSize: 13 }}>{this.props.title}</Text>
					</View>

					{this.props.rightImage == 'null' ? (
						<View style={{ flex: 0.1 }} />
					) : (
						<View style={[styles.imageView, { alignItems: 'flex-end' }]}>
							<Image
								style={[styles.image, { height: 20, marginLeft: 0, marginRight: 5 }]}
								// source={require('./Arrow.png')}
								source={Images.forwardArrow.source}
							/>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		width: '100%',
		height: 35,

		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 8
		//padding: 5
		// borderWidth: 1
	},
	imageView: {
		flex: 0.2,
		height: '100%',
		//alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'flex-start',

		//padding: 5,
		borderWidth: 0
	},
	image: {
		width: 25,
		// height: 25,
		height: '100%',
		borderWidth: 0,
		resizeMode: 'contain',
		marginLeft: 10,
		borderWidth: 0
	},
	text: {
		flex: 0.8,

		alignSelf: 'center',
		justifyContent: 'center',
		height: '100%',
		borderWidth: 0
	}
});

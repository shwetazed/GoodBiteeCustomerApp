import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Helper from '@Utils/Helper/DeviceHelper';

export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	render() {
		return (
			<View>
				<View style={styles.gap} />
				<TouchableOpacity onPress={this.props.onPressButton}>
					<View style={styles.parent}>
						<View style={styles.imageView}>
							<Image style={styles.image} source={this.props.image} />
						</View>

						<View style={styles.textView}>
							<Text style={styles.text}>{this.props.title}</Text>
						</View>

						<View style={styles.imageView}>
							{this.state.show == false ? null : (
								<Image
									style={styles.rightImage}
									// source={require('./Home.png')}
									source={require('@res/Images/right_green.png')}
								/>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	parent: {
		backgroundColor: '#f5f5f5',
		width: '96%',
		//height: Helper.responsiveHeight(35),
		height: 38,
		//flex: 1,
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 8
		//borderWidth: 1
		//justifyContent: 'center'
	},
	imageView: {
		flex: 0.1,
		alignSelf: 'center',
		justifyContent: 'center',
		//marginLeft: '1%',
		padding: '2%'
		//borderWidth: 1
	},
	image: {
		width: 20,
		height: 20,
		alignSelf: 'center',
		resizeMode: 'contain'
		//borderWidth: 1
	},
	rightImage: {
		width: 15,
		height: 15,
		alignSelf: 'center',
		resizeMode: 'contain'
		//borderWidth: 1
	},
	textView: {
		//width: '70%',
		flex: 0.8,
		alignSelf: 'center',
		justifyContent: 'center'

		// borderWidth: 1
	},
	text: {
		color: '#555555',
		fontSize: Helper.responsiveWidth(12)
	},
	gap: { height: 11 }
});

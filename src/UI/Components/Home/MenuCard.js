import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '../../../Utils/Helper/DeviceHelper';
import Images from '@Images';

export default class MenuCard extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View
				style={[
					styles.container,
					this.props.type == 'single' ? { width: SCREEN_WIDTH - 20, borderWidth: 0 } : { width: SCREEN_WIDTH - 100 }
				]}
			>
				<Image
					style={this.props.type == 'list' ? styles.menuImage : [styles.menuImage, { height: '70%' }]}
					source={require('@res/Images/VegImage.jpeg')}
					resizeMode="cover"
				/>
				<Text style={styles.restorantName}>{this.props.name}</Text>
				<Text style={styles.menuDescription}>{this.props.description}</Text>

				<View style={styles.bottomContainer}>
					<Text style={styles.timeDuration}>{this.props.delivery}</Text>
					{/* <Text style={styles.timeDuration}>{this.props.type}</Text> */}

					<View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'space-evenly' }}>
						<Image style={styles.verticalLineImage} />
						<Image
							style={[styles.imageIcon, { height: 20, width: 25, resizeMode: 'stretch' }]}
							source={Images.super_spicy.source}
						/>
						<Image style={styles.verticalLineImage} />
						<Image style={styles.imageIcon} source={Images.chiken.source} />
						<Image style={styles.verticalLineImage} />
						<Image style={styles.imageIcon} source={Images.gluten.source} />
						<Image style={styles.verticalLineImage} />
						<Image style={styles.imageIcon} source={Images.halal.source} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
		shadowColor: 'gray',
		shadowRadius: 2.0,
		shadowOpacity: 0.5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		margin: 10
		//width: SCREEN_WIDTH - 100
		//width: SCREEN_WIDTH
	},
	menuImage: {
		paddingLeft: '5%',
		width: '100%',
		height: '65%',
		borderRadius: 10
	},
	restorantName: {
		fontSize: 13,
		color: 'black',
		paddingTop: 7,
		width: '90%'
	},
	menuDescription: {
		fontSize: 13,
		color: 'gray',
		paddingTop: 5,
		width: '90%'
	},
	timeDuration: {
		color: 'black',
		fontSize: 13,
		flex: 0.25
		//paddingRight: 5
	},
	bottomContainer: {
		//justifyContent: 'space-between',
		flexDirection: 'row',
		height: 30,
		paddingTop: 7
		//borderWidth: 1
	},
	verticalLineImage: {
		backgroundColor: 'gray',
		width: 1,
		height: 20,
		borderRadius: 5,
		paddingRight: 5
	},
	imageIcon: {
		width: 20,
		height: 20

		//resizeMode: 'contain'
		//paddingRight: 5
	}
});

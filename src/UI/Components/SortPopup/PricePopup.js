import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider, Dimensions, Platform, Image, TouchableOpacity } from 'react-native';
import Button from '@Components/Common/Button';
import * as colors from '@Utils/colors';
import MySlider from '@Components/Slider/MySlider';
import Images from '@Images';
import { maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

const { width, height } = Dimensions.get('window');

function responsiveWidth(size, screen = 375) {
	return Math.round((width * size) / screen);
}

function responsiveHeight(size, screen = 667) {
	return Math.round((height * size) / screen);
}

export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doller1: false,
			doller2: false,
			doller3: false,
			doller4: false
		};
	}
	toggle(status) {
		console.warn(status);

		this.setState({ status: status });
	}

	render() {
		return (
			<View>
				<View style={styles.gap} />
				<Text style={{ marginLeft: '3%' }}>Price Range</Text>
				<View style={styles.gap} />
				<View style={styles.divider} />
				<View style={styles.gap} />
				<View style={styles.priceImagesView}>
					{this.state.doller1 ? (
						<TouchableOpacity
							style={[styles.doller, { backgroundColor: colors.green, borderColor: colors.green }]}
							onPress={() => {
								this.setState({ doller1: false });
							}}
						>
							<Text style={[{ color: colors.light_gray }, { color: 'white' }]}>$</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.doller}
							onPress={() => {
								this.setState({ doller1: true, doller2: false, doller3: false, doller4: false });
							}}
						>
							<Text style={{ color: colors.light_gray }}>$</Text>
						</TouchableOpacity>
					)}

					<View style={styles.saperator} />
					{this.state.doller2 ? (
						<TouchableOpacity
							style={[styles.doller, { backgroundColor: colors.green, borderColor: colors.green }]}
							onPress={() => {
								this.setState({ doller2: false });
							}}
						>
							<Text style={[{ color: colors.light_gray }, { color: 'white' }]}>$$</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.doller}
							onPress={() => {
								this.setState({ doller1: false, doller2: true, doller3: false, doller4: false });
							}}
						>
							<Text style={{ color: colors.light_gray }}>$$</Text>
						</TouchableOpacity>
					)}

					<View style={styles.saperator} />
					{this.state.doller3 ? (
						<TouchableOpacity
							style={[styles.doller, { backgroundColor: colors.green, borderColor: colors.green }]}
							onPress={() => {
								this.setState({ doller3: false });
							}}
						>
							<Text style={[{ color: colors.light_gray }, { color: 'white' }]}>$$$</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.doller}
							onPress={() => {
								this.setState({ doller1: false, doller2: false, doller3: true, doller4: false });
							}}
						>
							<Text style={{ color: colors.light_gray }}>$$$</Text>
						</TouchableOpacity>
					)}

					<View style={styles.saperator} />
					{this.state.doller4 ? (
						<TouchableOpacity
							style={[styles.doller, { backgroundColor: colors.green, borderColor: colors.green }]}
							onPress={() => {
								this.setState({ doller4: false });
							}}
						>
							<Text style={[{ color: colors.light_gray }, { color: 'white' }]}>$$$$</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.doller}
							onPress={() => {
								this.setState({ doller1: false, doller2: false, doller3: false, doller4: true });
							}}
						>
							<Text style={{ color: colors.light_gray }}>$$$$</Text>
						</TouchableOpacity>
					)}
					{/* <TouchableOpacity>
						<Image source={Images.dollar4.source} style={styles.priceImages} />
					</TouchableOpacity> */}
				</View>
				<View style={styles.gap} />
				<Text style={{ marginLeft: '3%' }}>Max Delivery Free</Text>
				<View style={styles.gap} />
				{/* <View style={{ borderWidth: 1, borderColor: colors.light_gray }} /> */}
				<View style={styles.divider} />
				<MySlider />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		//alignContent: 'center',
		//margin: '3%',
		borderWidth: 1
	},
	popUp: {
		height: responsiveHeight(280),
		//borderWidth: 1,
		borderRadius: 10
	},
	popupView: {
		height: responsiveHeight(220),
		//padding: '3%'
		borderWidth: 1
	},
	range: {
		height: '40%',
		borderWidth: 1,
		borderColor: 'grey'
	},
	rangeValues: {
		color: 'grey'
	},
	range2: {
		...Platform.select({ android: { marginLeft: responsiveWidth(13) } })
	},
	range3: {
		...Platform.select({
			android: {
				marginRight: responsiveWidth(10)
			}
		})
	},
	buttonView: {
		height: responsiveHeight(30),
		//borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	priceImagesView: {
		height: responsiveHeight(35),
		//borderWidth: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	saperator: {
		width: responsiveWidth(25)
	},
	gap: { height: 14 },
	priceImages: {
		//position: 'absolute',
		//top: 0,
		width: '10%',
		height: '100%',
		resizeMode: 'contain'
		//borderWidth: 1
	},
	doller: {
		borderWidth: 2,
		...Platform.select({
			ios: {
				height: responsiveHeight(30),
				width: responsiveWidth(40),
				borderRadius: 30
			},
			android: {
				height: responsiveHeight(36),
				width: responsiveWidth(35),
				borderRadius: 100
			}
		}),

		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.light_gray
	},
	divider: {
		borderWidth: 0.4,
		borderColor: colors.light_gray,
		width: '94%',
		marginLeft: '3%'
	}
});

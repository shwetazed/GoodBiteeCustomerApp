import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Images from '@Images';
import PopupButton from '@Components/Common/PopupButtons';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class Dietory extends Component {
	render() {
		return (
			<View>
				{/* <View style={styles.gap} />
				<View style={styles.parent}>
					<View style={styles.imageView}>
						<Image style={styles.image} source={require('@res/Images/Home.png')} />
					</View>

					<View style={styles.textView}>
						<Text style={styles.text}>Recommended</Text>
					</View>

					<View style={styles.imageView}>
						<Image
							style={styles.image}
							// source={require('./Home.png')}
							source={require('@res/Images/right_green.png')}
						/>
					</View>
				</View>

				<View style={styles.gap} />

				<View
					style={{
						backgroundColor: '#f5f5f5',
						width: '100%',
						height: responsiveHeight(35),
						alignSelf: 'center',
						flexDirection: 'row',
						borderRadius: 10
						//justifyContent: 'center'
					}}
				>
					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('@res/Images/Home.png')} />
					</View>

					<View
						style={{
							//width: '70%',
							flex: 0.8,
							alignSelf: 'center',
							justifyContent: 'center'

							// borderWidth: 1
						}}
					>
						<Text style={{ color: '#555555', fontSize: responsiveWidth(12) }}>Recommended</Text>
					</View>

					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image
							style={{ width: 15, height: 15, alignSelf: 'center' }}
							// source={require('./Home.png')}
							source={require('@res/Images/right_green.png')}
						/>
					</View>
				</View>
				<View style={styles.gap} />
				<View
					style={{
						backgroundColor: '#f5f5f5',
						width: '100%',
						height: responsiveHeight(35),
						alignSelf: 'center',
						flexDirection: 'row',
						borderRadius: 10
						//justifyContent: 'center'
					}}
				>
					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('@res/Images/Home.png')} />
					</View>

					<View
						style={{
							//width: '70%',
							flex: 0.8,
							alignSelf: 'center',
							justifyContent: 'center'

							// borderWidth: 1
						}}
					>
						<Text style={{ color: '#555555', fontSize: responsiveWidth(12) }}>Recommended</Text>
					</View>

					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image
							style={{ width: 15, height: 15, alignSelf: 'center' }}
							// source={require('./Home.png')}
							source={require('@res/Images/right_green.png')}
						/>
					</View>
				</View>
				<View style={styles.gap} />
				<View
					style={{
						backgroundColor: '#f5f5f5',
						width: '100%',
						height: responsiveHeight(35),
						alignSelf: 'center',
						flexDirection: 'row',
						borderRadius: 10
						//justifyContent: 'center'
					}}
				>
					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('@res/Images/Home.png')} />
					</View>

					<View
						style={{
							//width: '70%',
							flex: 0.8,
							alignSelf: 'center',
							justifyContent: 'center'

							// borderWidth: 1
						}}
					>
						<Text style={{ color: '#555555', fontSize: responsiveWidth(12) }}>Recommended</Text>
					</View>

					<View
						style={{
							flex: 0.1,
							alignSelf: 'center',
							justifyContent: 'center',
							//marginLeft: '1%',
							padding: '2%'
							//borderWidth: 1
						}}
					>
						<Image
							style={{ width: 15, height: 15, alignSelf: 'center' }}
							// source={require('./Home.png')}
							source={require('@res/Images/right_green.png')}
						/>
					</View>
				</View> */}

				<PopupButton title="Recommended" image={Images.recommended.source} />
				<PopupButton title="Most Popular" image={Images.most_popular.source} />
				<PopupButton title="Rating" image={Images.rating.source} />
				<PopupButton title="Delivery Time" image={Images.delivery_time.source} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	parent: {
		backgroundColor: '#f5f5f5',
		width: '100%',
		height: responsiveHeight(35),
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 10
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
		width: 15,
		height: 15,
		alignSelf: 'center'
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
		fontSize: responsiveWidth(12)
	},
	gap: { height: responsiveHeight(8) }
});

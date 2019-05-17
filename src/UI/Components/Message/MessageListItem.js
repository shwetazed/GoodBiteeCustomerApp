import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	ImageBackground,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import BackgroundImage from '@Components/Common/BackgroundImage';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class MessageListItem extends Component {
	render() {
		return (
			<View style={styles.parent}>
				<View style={styles.child}>
					<Image
						style={{
							flex: 0.15,
							margin: '2%',
							//marginLeft: '4%',
							//flexDirection: 'row',
							width: 38,
							height: 40,
							borderRadius: 5,
							alignSelf: 'center'
						}}
						source={require('@res/Images/vip.jpg')}
					/>

					<View
						style={{
							//marginTop: 10,
							flex: 0.9,
							//overflow: 'hidden',
							margin: '2%',
							borderRadius: 8,
							width: '70%',
							height: 40,
							//borderWidth: 1,
							flexDirection: 'row',

							// marginLeft: -7,
							backgroundColor: '#f5f5f5'
						}}
					>
						<View style={{ flex: 0.9, height: '100%' }}>
							<View
								style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2.5%', marginLeft: '5%' }}
							>
								<Text style={{ color: '#555555', fontSize: responsiveWidth(10) }}>Lorean sum is simply dummy...</Text>

								<Text style={{ fontSize: 10, color: 'green' }}>1 year</Text>
							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5%' }}>
								<Text style={{ fontSize: 10, color: 'green' }}>Adom</Text>
								<Text style={{ fontSize: 10, color: '#555555' }}>for the text</Text>
							</View>
						</View>

						<View style={{ flex: 0.1, height: '100%' }}>
							<Image
								style={{ width: '100%', height: '30%', resizeMode: 'contain', marginTop: '35%' }}
								source={require('@res/Images/forward_arrow.png')}
							/>
						</View>
						{/* <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'space-around' }}>
							<Text style={{ color: '#555555', fontSize: responsiveWidth(10) }}>Lorean sum is simply dummy...</Text>

							<Text style={{ fontSize: 10, color: 'green' }}>1 year</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
							<Text style={{ fontSize: 10, color: 'green' }}>Adom</Text>
							<Text style={{ fontSize: 10, color: '#555555' }}>for the text</Text>
						</View>

						
						<Image
							style={{ width: 30, height: 20, resizeMode: 'contain', alignSelf: 'center' }}
							source={require('@res/Images/forward_arrow.png')}
						/>{' '}
						*/}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	child: {
		flex: 1,
		flexDirection: 'row',

		// alignItems: 'center',
		justifyContent: 'space-between',
		//alignSelf: 'center',
		//height: '10%',
		width: '100%'
		//borderWidth: 1
	},
	listText: {
		paddingLeft: '1%',
		fontSize: 15,
		alignSelf: 'center'
		//borderWidth: 1
	}
});

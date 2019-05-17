import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Navigation from '@Components/Common/Navigation';
import BackgroundImage from '@Components/Common/BackgroundImage';
import HelpButton from '@Components/Common/HelpButton';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import Images from '@res/Images';

export default class HelpScreen extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="How can we help?"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
					isMenu={true}
				/>

				<View
					style={{
						backgroundColor: 'white',
						borderRadius: 10,
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						elevation: 1,
						padding: 10,
						marginTop: 5,
						//marginBottom: 5,
						height: 290,
						width: '94%',
						alignSelf: 'center'
					}}
				>
					<View style={{ width: '100%', height: 30, justifyContent: 'center' }}>
						<Text style={{ color: '#555555', fontSize: responsiveWidth(14) }}>Last Order</Text>
					</View>

					<View style={{ width: '100%', height: 190, borderRadius: 10 }}>
						<Image
							style={{
								width: '100%',
								height: '100%',
								borderRadius: 10
							}}
							source={require('@res/Images/VegImage.jpeg')}
						/>
					</View>
					<View
						style={{
							width: '94%',
							height: 35,
							backgroundColor: 'white',
							alignSelf: 'center',
							//borderWidth: 1,
							bottom: 14,
							//marginTop: '-6%',
							borderRadius: 5,
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.1,
							elevation: 1,
							justifyContent: 'center'

							//padding: 10
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image style={{ width: '10%', height: '100%', resizeMode: 'contain' }} source={Images.home.source} />
							<Text
								style={{
									color: 'black',
									fontSize: responsiveWidth(14),
									marginLeft: 5,
									fontWeight: '500'
									//borderWidth: 1
								}}
							>
								Name of the Restaurant
							</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 0 }}>
						<Text style={{ color: '#000', fontSize: responsiveWidth(11), marginLeft: 9 }}>Jan 28 2019,12:01 PM</Text>
						<Text style={{ color: 'black', fontSize: responsiveWidth(14), color: '#6bb003', marginRight: 9 }}>
							$ 61.00
						</Text>
					</View>
				</View>

				<View
					style={{
						backgroundColor: 'white',
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						marginTop: 20,
						paddingLeft: 20,
						paddingRight: 20,
						width: '100%',
						height: '100%'
					}}
				>
					<ScrollView style={{ flex: 1 }}>
						<Text style={styles.text}>Additional Topics</Text>

						<View style={{ height: 10, width: '100%' }} />
						<HelpButton
							title="Past Order"
							image={Images.past_order.source}
							rightImage="null"
							onPressButton={() => navigate('PastOrder')}
						/>
						<View style={{ height: 10, width: '100%' }} />
						<HelpButton
							title="Account and Payment Option"
							image={Images.account.source}
							onPressButton={() => navigate('HelpGuideScreen', { typeId: 2, typeName: 'Account and Payment' })}
						/>
						<View style={{ height: 10, width: '100%' }} />
						<HelpButton
							title="Guide to GoodBitee"
							image={Images.guide.source}
							onPressButton={() => navigate('HelpGuideScreen', { typeId: 1, typeName: 'Help Guide' })}
						/>

						<View style={{ height: 20, width: '100%' }} />
						<View style={{ borderWidth: 0.7, width: '100%', borderColor: '#F5F5F5' }} />
						<View style={{ height: 15, width: '100%' }} />

						<Text style={[styles.text, { marginTop: 0 }]}>Support message</Text>

						<View style={{ height: 10, width: '100%' }} />
						<HelpButton
							title="View Archive"
							image={Images.view_archive.source}
							imageSize="true"
							onPressButton={() => this.props.navigation.push('MessageListScreen')}
						/>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		//margin: 1,
		color: 'black',
		fontSize: responsiveWidth(15),
		marginTop: 10,
		fontWeight: '700'
	}
});

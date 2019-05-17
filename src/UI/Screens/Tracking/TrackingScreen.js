import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
	Button,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import Images from '@Images';
import BackgroundImage from '@Components/Common/BackgroundImage';
import { responsiveWidth } from '@Utils/Helper/DeviceHelper';
const { width, height } = Dimensions.get('window');

export default class TrackingScreen extends Component {
	constructor() {
		super();
		this.state = {
			status: false
		};
	}
	ShowHideTextComponentView = () => {
		if (this.state.status == true) {
			this.setState({ status: false });
		} else {
			this.setState({ status: true });
		}
	};
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
				<BackgroundImage />
				<View
					style={{
						flexDirection: 'row',

						marginTop: 45,
						height: 35,
						padding: 3
						//borderWidth: 1
					}}
				>
					<View style={{ flex: 0.5 }}>
						<Image
							style={{
								width: 20,
								height: 20,
								marginLeft: '5%',
								resizeMode: 'contain'
							}}
							source={require('@res/Images/back_icon.png')}
						/>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5 }}>
						<View style={{ justifyContent: 'center', height: '100%', marginRight: '3%' }}>
							<Text
								style={{
									color: 'white',
									fontSize: responsiveWidth(20)
								}}
							>
								Help
							</Text>
						</View>
						<View
							style={{
								//borderWidth: 1,
								marginRight: '8%',
								justifyContent: 'center'
							}}
						>
							<Image
								style={{
									width: 20,
									height: 20,

									resizeMode: 'contain'
								}}
								source={require('@res/Images/help.png')}
							/>
						</View>
					</View>
				</View>

				{/* <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: "-30%", paddingBottom: 100 }}> */}

				<View
					style={{
						width: '93%',
						height: '100%',
						backgroundColor: 'white',
						alignSelf: 'center',
						padding: 3,
						//margin: '12%',
						borderRadius: 10,
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						padding: '5%'
					}}
				>
					<ScrollView style={{ flex: 1 }} contentContainerStyle={{ height: '100%' }}>
						<Text style={{ color: 'gray' }}>Kitchan name</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<Text style={{ fontSize: responsiveWidth(45), color: '#999999 ', flex: 0.3 }}>4:15</Text>
							<View style={{ flex: 0.2, justifyContent: 'flex-start', justifyContent: 'center', marginTop: '4%' }}>
								<Text style={{ fontSize: responsiveWidth(14), color: 'gray' }}> PM</Text>
							</View>
							<View style={{ flex: 0.4, justifyContent: 'center', marginTop: '4%' }}>
								<Text style={{ fontSize: responsiveWidth(14), color: 'gray', marginLeft: '10%' }}>
									{' '}
									Estimated arrival
								</Text>
							</View>
						</View>
						<View style={{ height: 2, width: '100%', backgroundColor: '#6bb003' }} />

						<View style={{ height: 25 }} />

						<TouchableOpacity
							onPress={this.ShowHideTextComponentView}
							style={{
								backgroundColor: '#F5F5F5',
								width: '100%',
								flexDirection: 'row',
								height: 45,
								justifyContent: 'center',
								borderRadius: 10
								//borderWidth: 1
							}}
						>
							<View style={{ height: '100%', flex: 0.9, justifyContent: 'center', paddingLeft: 15 }}>
								<Text
									style={{
										//marginLeft: '10%',
										fontSize: responsiveWidth(14)

										//borderWidth: 1
									}}
								>
									Preparing your order
								</Text>
							</View>

							<View
								style={{
									height: '100%',
									flex: 0.2,

									justifyContent: 'center'
									//borderWidth: 1
									//flexDirection: 'row'
								}}
							>
								{this.state.status == false ? (
									<Image
										style={{ width: '35%', height: '35%', resizeMode: 'contain', alignSelf: 'center' }}
										source={Images.downArrow.source}
									/>
								) : (
									<Image
										style={{ width: '35%', height: '35%', resizeMode: 'contain', alignSelf: 'center' }}
										source={Images.upArrow.source}
									/>
								)}
							</View>
						</TouchableOpacity>
						{/* </Button> */}

						{this.state.status ? (
							<View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
								<Text
									style={{
										color: 'gray',
										//marginTop: '12%',
										fontSize: responsiveWidth(14)
									}}
								>
									Preparing your Order
								</Text>
								<View style={{ flex: 0.7 }}>
									<Text
										style={{
											color: '#6bb003',

											alignSelf: 'flex-end',
											fontSize: responsiveWidth(12)
										}}
									>
										3:18 PM
									</Text>
								</View>
							</View>
						) : null}
						{this.state.status ? (
							<View>
								<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
									<Text
										style={{
											color: 'gray',
											//marginTop: '12%',
											fontSize: responsiveWidth(14)
										}}
									>
										Confirming order with restaurant
									</Text>
									<View style={{ flex: 0.7 }}>
										<Text
											style={{
												color: '#6bb003',
												alignSelf: 'flex-end',
												fontSize: responsiveWidth(12),
												marginLeft: '25%'
											}}
										>
											3:18 PM
										</Text>
									</View>
								</View>
								<View style={{ height: 1, width: '100%', backgroundColor: '#cccccc', marginTop: 25 }} />
							</View>
						) : null}

						<Text style={{ marginTop: '5%', color: '#999999', fontSize: responsiveWidth(14) }}> Order details :</Text>
						<View style={styles.gap} />
						<View style={{ flexDirection: 'row', height: 30 }}>
							<View
								style={{
									justifyContent: 'center',
									alignContent: 'center',
									borderWidth: 1,
									borderColor: '#6bb003',
									height: 20,
									width: 20,
									borderRadius: 5,
									marginTop: 4
								}}
							>
								<Text
									style={{
										color: '#6bb003',
										//marginLeft: 8,
										textAlign: 'center'
									}}
								>
									2
								</Text>
							</View>

							<View
								style={{
									justifyContent: 'center',
									alignContent: 'center',
									marginLeft: 8,
									height: '100%',
									width: '70%',
									borderRadius: 10
								}}
							>
								<Text>Food Name </Text>
							</View>
						</View>
						{/* <View style={styles.gap} /> */}
						<View style={{ flexDirection: 'row', height: 40 }}>
							<View
								style={{
									justifyContent: 'center',
									alignContent: 'center',
									//borderWidth: 1,
									height: '100%'

									//borderWidth: 1
								}}
							>
								<Text>
									Total:<Text style={{ color: '#6bb003' }}>80$</Text>
								</Text>
							</View>

							<TouchableOpacity
								style={{
									backgroundColor: '#F5F5F5',
									marginLeft: '30%',
									alignContent: 'center',
									justifyContent: 'center',
									width: '50%',
									borderRadius: 25
								}}
							>
								<Text style={{ color: '#6bb003', textAlign: 'center' }}>View Recepit</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	gap: {
		height: '2.5%'
	}
});

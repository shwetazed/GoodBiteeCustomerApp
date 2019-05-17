import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, Modal } from 'react-native';
import * as colors from '@Utils/colors/colors';
import TextInputt from '@Components/Delivery_Details/TextInputt';
import Saperator from '@Components/Gap/Saperator';
import AddApartmentNumber from '@Screens/AddApartmentNumber';

const margin = Platform.OS == 'ios' ? '3.5%' : '3%';
const marginImage = '2%';
const borderColor = '#cccccc';

var globle = require('@Components/style/style');

export default class SetDeliveryAddress extends Component {
	constructor(props) {
		super(props);
		this.toggle.bind(this, false);

		this.state = {
			text: 'Select delivery address',
			address: '',
			address1: '91,bhagirath nagar',
			address2: 'gopalpura by pass',
			address3: 'Jaipur',
			show: true,
			modalVisible: false,
			uAddress:
				'Vishweriya nagar,gopalpura by pass,jaipur Vishweriya nagar,gopalpura by pass,jaipur,Vishweriya nagar,gopalpura by pass'
			//dialogVisible: false
		};
	}
	toggleModal(visible) {
		this.setState({ modalVisible: visible });
	}
	toggle = show => {
		switch (show) {
			case true:
				{
					this.setState({ modalVisible: show });
				}
				break;
			default: {
				this.setState({ modalVisible: show });
			}
		}
	};

	render() {
		return (
			<View style={StyleSheet.container}>
				<Modal
					animationType={'slide'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.warn('Modal has been closed.');
					}}
				>
					<View style={styles.container1}>
						<AddApartmentNumber
							address={this.state.uAddress}
							onPressButton={() => {
								this.toggle(false);
							}}
						/>
					</View>
				</Modal>

				<Image style={styles.backgroundImage} source={require('@res/Images/headerBg.png')} />

				<View style={Platform.OS == 'ios' ? styles.titleIos : styles.titleAndroid}>
					{/* <View style={styles.titleIos}> */}
					<View style={{ flex: 0.4, justifyContent: 'flex-start' }}>
						<Text style={{ color: 'white', paddingLeft: '9%' }}>back</Text>
					</View>
					<View style={{ flex: 0.7, justifyContent: 'flex-start' }}>
						<Text style={{ color: 'white', fontSize: 17 }}>Delivery Details</Text>
					</View>
				</View>
				<View style={Platform.OS == 'ios' ? styles.backgroundView : [styles.backgroundView, { top: '-29.6%' }]}>
					<View style={styles.backGroundViewTitle}>
						<Text style={{ fontSize: 15 }}>{this.state.text}</Text>
					</View>
					<Saperator />
					<View
						style={[
							globle.parentView2,
							{
								borderWidth: 2,
								borderRadius: 20,
								borderColor: 'grey',
								backgroundColor: 'white',
								borderColor: borderColor
							}
						]}
					>
						<View style={{ flex: 0.9, marginBottom: '3%' }}>
							<TextInputt />
						</View>

						<TouchableOpacity
							style={{
								flex: 0.08,
								justifyContent: 'center'
								//borderWidth: 1
							}}
						>
							<Text style={{ color: '#cccccc' }}>X</Text>
						</TouchableOpacity>
					</View>

					<Saperator />

					<View style={Platform.OS == 'ios' ? styles.divider : [styles.divider, { marginTop: '1%' }]} />
					<Saperator />

					<TouchableOpacity style={globle.parentView1} onPress={this.toggle.bind(this, true)}>
						<View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={{ height: '70%', width: '70%', resizeMode: 'contain' }}
								source={require('@res/Images/delivery_icon.png')}
							/>
						</View>
						<View style={{ flex: 0.85, justifyContent: 'center', padding: 10, borderWidth: 1 }}>
							<Text style={{ fontWeight: '600' }}>3,Mohan nagar</Text>
							<Text style={{}}>{this.state.uAddress}</Text>
						</View>
					</TouchableOpacity>

					<Saperator />

					<TouchableOpacity style={globle.parentView1}>
						<View style={{ flex: 0.15, justifyContent: 'center' }}>
							<Image
								style={{ alignSelf: 'center', height: '70%', width: '70%', resizeMode: 'contain' }}
								source={require('.@res/Images/delivery_icon.png')}
							/>
						</View>
						<View style={{ flex: 0.85, justifyContent: 'center' }}>
							<Text style={{ fontWeight: '600' }}>Sodala police station</Text>
							<Text style={{}}>sodala police station,ram nagar,jaipur</Text>
						</View>
					</TouchableOpacity>

					{/* <TouchableOpacity style={globle.parentView1} onPress={this.toggle.bind(this, this.state.show)}>
						<View style={{ flex: 0.1, height: '80%', margin: marginImage, borderWidth: 1 }}>
							<Image
								style={{ alignSelf: 'center', height: '70%', width: '70%', resizeMode: 'contain' }}
								source={require('../../../res/Images/delivery_icon.png')}
							/>
						</View>
						<View style={{ flex: 0.8, justifyContent: 'center', borderWidth: 1 }}>
							<Text style={{ fontWeight: '600' }}>Deliver to you</Text>
						</View>
					</TouchableOpacity> */}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	container1: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	backgroundImage: {
		//alignItems: 'center',
		width: '100%',
		height: '30%'
	},

	titleIos: {
		width: '100%',
		height: '5%',
		top: '-64%',
		//marginTop: '10%',

		flexDirection: 'row'
		//justifyContent: 'center',
		//alignItems: 'center'
		//borderWidth: 1
	},
	titleAndroid: {
		width: '100%',
		height: '5%',
		top: '-57%',
		//marginBottom: '2%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		//borderWidth: 1
	},
	backgroundView: {
		width: '95%',
		height: '80%',
		backgroundColor: '#fff',
		borderRadius: 10,
		top: '-26.8%',
		//marginBottom: '10%',
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { height: 10, width: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		padding: '4%'
		// elevation: 10
		//borderWidth: 1
	},
	backGroundViewTitle: {
		width: '100%',
		flex: 0,
		//marginBottom: '3%',
		justifyContent: 'flex-start'
		//borderWidth: 1
	},

	divider: {
		borderWidth: 1,
		borderColor: '#f5f5f5',

		width: '100%',
		//marginLeft: '3%',
		marginTop: '1%',
		paddingRight: '8%'
		//marginBottom: '5%'
		//alignSelf: 'center'
	},
	button: {
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#f5f5f5',
		//padding: '1%',
		height: '5%',
		width: '50%',
		borderRadius: 20
	}
});

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { GET_DATA, SAVE_DATA } from '@Core/Storage';

export default class WelcomeScreen extends Component {
	static navigationOptions = { header: null };

	// async firstTimeOrNot() {
	// 	//SAVE_LOCAL_DATA('FIRST', 1);
	// 	await AsyncStorage.setItem('FIRST', JSON.stringify(1));
	// 	console.warn('checking user comes first time or not');
	// }

	// async getVal() {
	// 	const time = await AsyncStorage.getItem('FIRST');
	// 	console.warn('comes in time ', time);
	// 	if (time == '1') {
	// 		this.props.navigation.push('DrawerNavigator');
	// 	}
	// }

	componentDidMount() {
		//console.warn( AsyncStorage.getItem('FIRST'));
		//this.getVal();
		// GET_DATA('FIRST').then(data => {
		// 	console.warn('comes in time ', data);
		// 	if (data == '1' && this.props.navigation.state.params.user_id) {
		// 		this.props.navigation.push('DrawerNavigator');
		// 	}
		// });
	}

	render() {
		return (
			// <ScrollView>
			<View style={styles.container}>
				<View style={styles.logoView}>
					<Image style={styles.logo} source={require('@res/Images/GoodbiteLogo.png')} />
				</View>

				{/* <View style={styles.centerImageView}> */}
				<Image style={styles.centerImage} source={require('@res/Images/wlcomeScrImg.png')} />
				{/* </View> */}

				<View style={[styles.textView, { marginTop: '10%' }]}>
					<Text style={[styles.text, { fontWeight: 'bold', fontSize: 15 }]}>Welcome</Text>
				</View>

				<View style={styles.textView}>
					<Text style={styles.text}>loreal Ipsum is simply dummy text of the printing and type setting industry.</Text>
				</View>

				<View style={[styles.buttonView, { paddingRight: '10%' }]}>
					<TouchableOpacity
						style={[styles.button]}
						onPress={() => {
							this.props.navigation.push('DrawerNavigator');

							SAVE_DATA('FIRST', 1);
						}}
					>
						<Text style={{ color: 'white', paddingLeft: 50, paddingTop: 10 }}>Skip</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, { backgroundColor: '#6bb003' }]}
						onPress={() => {
							this.props.navigation.push('DrawerNavigator');

							//SAVE_DATA('FIRST', 1);
							//this.firstTimeOrNot();
						}}
					>
						<Text style={{ color: 'white', paddingLeft: 50, paddingTop: 10 }}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'center'
	},
	logoView: {
		justifyContent: 'center',
		alignContent: 'center',
		marginTop: '15%'
	},
	logo: {
		height: 90,
		width: '70%',
		resizeMode: 'contain',
		alignSelf: 'center'
	},

	centerImage: {
		height: 150,
		width: '80%',
		alignSelf: 'center'
		//resizeMode: 'contain'
	},

	textView: {
		marginTop: 10,

		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center'
	},
	text: {
		color: 'black',
		paddingLeft: 40,
		paddingRight: 40
	},
	buttonView: {
		marginTop: '20%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: '5%'
	},
	button: {
		backgroundColor: '#ed3237',
		width: 130,
		height: 40,
		borderRadius: 30
	}
});

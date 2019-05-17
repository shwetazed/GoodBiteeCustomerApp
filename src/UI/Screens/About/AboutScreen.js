// import React, { Component } from 'react';
// //import react in our code.
// import { StyleSheet, View, FlatList, Text, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
// import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
// import BackgroundImage from '@Components/Common/BackgroundImage';
// import Images from '@Images';
// import Navigation from '@Components/Common/Navigation';

// export default class About extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			//Making an empty array for list
// 			FlatListItem: ['Rate us in google play', 'Like us in facebook', 'Legal']
// 		};
// 	}
// 	ListEmpty = () => {
// 		return (
// 			//View to show when list is empty
// 			<View style={styles.MainContainer}>
// 				<Text style={{ textAlign: 'center' }}>No Data Found</Text>
// 			</View>
// 		);
// 	};
// 	render() {
// 		return (
// 			<View style={styles.MainContainer}>
// 				<BackgroundImage />
// 				{/* <Navigation
// 					navigation={this.props.navigation}
// 					title="About"
// 					isLeftButtonHide={false}
// 					letButtonImage={Images.backButton.source}
// 					rightButtonImage={Images.plusIcon.source}
// 					isRightButtonHide={true}
// 				/> */}
// 				<Navigation
// 					navigation={this.props.navigation}
// 					title="About"
// 					isLeftButtonHide={false}
// 					letButtonImage={Images.menu.source}
// 					rightButtonImage={Images.plusIcon.source}
// 					isRightButtonHide={true}
// 					isMenu={true}
// 				/>

// 				<View style={Platform.OS == 'ios' ? styles.backgroundView : [styles.backgroundView]}>
// 					<ScrollView>
// 						<FlatList
// 							data={this.state.FlatListItem}
// 							//data to render in list
// 							renderItem={({ item }) => (
// 								//Single Item in list
// 								<View>
// 									<TouchableOpacity style={styles.listItems}>
// 										<View style={{ flex: 1, padding: '3%', paddingLeft: '4%' }}>
// 											<Text style={styles.item}>{item}</Text>
// 										</View>
// 										<View style={{ flex: 0, padding: '4%' }}>
// 											{/* <Text style={styles.item}> back </Text> */}
// 											<Image
// 												style={styles.image}
// 												resizeMode="contain"
// 												source={require('@res/Images/forward_arrow.png')}
// 											/>
// 										</View>
// 									</TouchableOpacity>
// 									<View style={styles.gap} />
// 								</View>
// 							)}
// 						/>
// 					</ScrollView>
// 				</View>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	MainContainer: {
// 		flex: 1
// 	},
// 	item: {
// 		//margin: '4.5%',
// 		//justifyContent: 'center',
// 		fontSize: 12
// 		//borderWidth: 1
// 	},
// 	backgroundImage: {
// 		width: '100%',
// 		height: '30%'
// 	},
// 	gap: {
// 		height: 15
// 	},
// 	// titleIos: {
// 	// 	width: '100%',
// 	// 	height: '5%',
// 	// 	top: '-55%',
// 	// 	flexDirection: 'row',
// 	// 	justifyContent: 'center',
// 	// 	alignItems: 'center'
// 	// },
// 	title: {
// 		width: '100%',
// 		height: '5%',
// 		...Platform.select({
// 			ios: { top: '-56%' },
// 			android: { top: '-49%' }
// 		}),
// 		//top: '-48%',
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 		//borderWidth: 1
// 	},
// 	backgroundView: {
// 		width: '94%',
// 		...Platform.select({
// 			ios: { height: '88%' },
// 			android: { height: '92%' }
// 		}),

// 		backgroundColor: '#fff',
// 		borderRadius: 10,
// 		//top: '-25.8%',
// 		marginTop: 10,
// 		alignSelf: 'center',
// 		shadowColor: '#000',
// 		shadowOffset: { height: 2, width: 2 },
// 		shadowOpacity: 0.2,
// 		shadowRadius: 8,
// 		padding: '4%',
// 		elevation: 10
// 	},
// 	listItems: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#f5f5f5',
// 		//height: '30%',
// 		flex: 1,

// 		//padding: '3%',
// 		width: '100%',
// 		borderRadius: 10,
// 		flexDirection: 'row',
// 		justifyContent: 'space-around'
// 	},
// 	image: {
// 		height: 20,
// 		width: 20
// 	}
// });

import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@Images';
import Navigation from '@Components/Common/Navigation';
import HelpManager from '@Networking/HelpManager';
import HTML from 'react-native-render-html';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { Item } from 'native-base';
import AboutManager from '@Networking/AboutManager';
// import { GET_LOCAL_DATA } from '@Core/Storage';
let helpId, userId, questionId, answer;

export default class AboutScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: ''
		};
	}

	componentDidMount() {
		this.getAboutUs();
	}
	getAboutUs() {
		AboutManager.getAboutUs()
			.then(response => {
				console.warn('response msg', response);
				console.warn(' response.description', response.aboutUs.description);
				console.warn(' response.name', response.aboutUs.name);
				if (response.aboutUs.status == '1') {
					this.setState({
						description: response.aboutUs.description,
						name: response.aboutUs.description
					});

					//DISPLAY_ALERT('GoodBitee', 'Thank you ');
				}
			})
			.catch(error => {
				console.warn('error ', error);
			});
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="About"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					isRightButtonHide={false}
					rightButtonAction={this.rightButtonAction}
					isMenu={true}
				/>

				<View
					style={{
						backgroundColor: 'white',
						borderRadius: 10,
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						height: '80%',
						padding: 20,
						margin: 20,
						marginBottom: 5
					}}
				>
					<View style={{ flex: 0.7 }}>
						<HTML html={this.state.description} imagesMaxWidth={Dimensions.get('window').width} />
						<View style={{ backgroundColor: '#555555', width: '75%', top: '6%', marginLeft: '1%' }} />
					</View>
					<View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
						<View
							style={{
								width: '100%',
								height: '10%',

								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text style={{ color: '#555555', fontSize: responsiveWidth(13) }} />
							<View style={{ backgroundColor: '#555555', width: '35%', height: '1%', marginBottom: '1%' }} />
						</View>

						<View
							style={{
								flexDirection: 'row',
								width: '100%',
								//flex: 0.2,
								height: 80,
								//borderWidth: 1,
								borderColor: 'red'
							}}
						>
							<TouchableOpacity
								style={{
									height: '100%',
									flex: 0.5,
									justifyContent: 'flex-end',
									flexDirection: 'row'
									//borderWidth: 1,
									//left: '12%'
								}}
								onPress={() => this.AlertBox('GoodBitee', 'Satisfied')}
							>
								{/* <Image
									style={{ height: 50, width: 50, alignSelf: 'center' }}
									source={require('@res/Images/happy.png')}
								/> */}
							</TouchableOpacity>
							<View style={{ width: 10, height: 1 }} />
							<TouchableOpacity
								style={{
									height: '100%',
									flex: 0.5,
									justifyContent: 'flex-start',
									flexDirection: 'row'

									//right: '18%'
								}}
								onPress={() => this.AlertBox('GoodBitee', 'Unsatisfied')}
							>
								{/* <Image style={{ height: 50, width: 50, alignSelf: 'center' }} source={require('@res/Images/sad.png')} /> */}
							</TouchableOpacity>

							{/* <View style={{ flex: 1 }} /> */}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#f5f5f5'
		//marginTop: -650,
	},
	emojiImg: {
		flexDirection: 'row'
	}
});

// import React, { Component } from 'react';
// import { Image, StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
// import BackgroundImage from '@Components/Common/BackgroundImage';
// import Images from '@Images';
// import Navigation from '@Components/Common/Navigation';
// import HelpManager from '@Networking/HelpManager';
// import HTML from 'react-native-render-html';
// import { DISPLAY_ALERT } from '@Utils/Alert';
// import { Item } from 'native-base';
// import AboutManager from '@Networking/AboutManager';
// let helpId, userId, questionId, answer;

// export default class AboutScreen extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			content: '',
// 			name: ''
// 		};
// 	}

// 	componentDidMount() {
// 		this.getAboutUs();
// 	}
// 	getAboutUs() {
// 		AboutManager.getAboutUs()
// 			.then(response => {
// 				console.warn('response msg', response);
// 				console.warn(' response.content', response.aboutUs.content);
// 				console.warn(' response.content', response.aboutUs.title);

// 				if (response.aboutUs.status == '1') {
// 					this.setState({
// 						content: response.aboutUs.content,
// 						name: response.aboutUs.name
// 					});

// 					//DISPLAY_ALERT('GoodBitee', 'Thank you ');
// 				}
// 			})
// 			.catch(error => {
// 				console.warn('error ', error);
// 			});
// 	}

// 	// AlertBox(alertTitle, AlertMessage) {
// 	// 	Alert.alert(
// 	// 		alertTitle,
// 	// 		'Please submit your feedback.',
// 	// 		[
// 	// 			{
// 	// 				text: 'Ok',
// 	// 				onPress: () => {
// 	// 					this.sendFeedBack(AlertMessage);
// 	// 				}
// 	// 			},
// 	// 			{ text: 'Cancel', onPress: () => {} }
// 	// 		],
// 	// 		{ cancelable: false }
// 	// 	);
// 	// }

// 	render() {
// 		return (
// 			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
// 				<BackgroundImage />

// 				<Navigation
// 					navigation={this.props.navigation}
// 					title="About"
// 					isLeftButtonHide={false}
// 					letButtonImage={Images.menu.source}
// 					isRightButtonHide={false}
// 					rightButtonAction={this.rightButtonAction}
// 					isMenu={true}
// 				/>

// 				<View
// 					style={{
// 						backgroundColor: 'white',
// 						borderRadius: 10,
// 						shadowOffset: { width: 0, height: 0 },
// 						shadowOpacity: 0.3,
// 						height: '80%',
// 						padding: 20,
// 						margin: 20,
// 						marginBottom: 5
// 					}}
// 				>
// 					<View style={{ flex: 0.7 }}>
// 						<Text style={{ color: '#555555', fontSize: responsiveWidth(15) }}>{this.state.title}</Text>

// 						<HTML html={this.state.content} imagesMaxWidth={Dimensions.get('window').width} />

// 						<View style={{ backgroundColor: '#555555', width: '75%', top: '6%', marginLeft: '1%' }} />
// 						{/* </ScrollView> */}
// 					</View>
// 					{/* <View style={{backgroundColor:'#555555',width:"35%",height:'0.15%',top:'54.8%',alignSelf:'center'}}/> */}
// 					<View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
// 						<View
// 							style={{
// 								width: '100%',
// 								height: '10%',

// 								justifyContent: 'center',
// 								alignItems: 'center'
// 							}}
// 						>
// 							<Text style={{ color: '#555555', fontSize: responsiveWidth(13) }} />
// 							<View style={{ backgroundColor: '#555555', width: '35%', height: '1%', marginBottom: '1%' }} />
// 						</View>

// 						<View
// 							style={{
// 								flexDirection: 'row',
// 								width: '100%',
// 								//flex: 0.2,
// 								height: 80,
// 								//borderWidth: 1,
// 								borderColor: 'red'
// 							}}
// 						>
// 							<TouchableOpacity
// 								style={{
// 									height: '100%',
// 									flex: 0.5,
// 									justifyContent: 'flex-end',
// 									flexDirection: 'row'
// 									//borderWidth: 1,
// 									//left: '12%'
// 								}}
// 								onPress={() => this.AlertBox('GoodBitee', 'Satisfied')}
// 							>
// 								{/* <Image
// 									style={{ height: 50, width: 50, alignSelf: 'center' }}
// 									source={require('@res/Images/happy.png')}
// 								/> */}
// 							</TouchableOpacity>
// 							<View style={{ width: 10, height: 1 }} />
// 							<TouchableOpacity
// 								style={{
// 									height: '100%',
// 									flex: 0.5,
// 									justifyContent: 'flex-start',
// 									flexDirection: 'row'

// 									//right: '18%'
// 								}}
// 								onPress={() => this.AlertBox('GoodBitee', 'Unsatisfied')}
// 							>
// 								{/* <Image style={{ height: 50, width: 50, alignSelf: 'center' }} source={require('@res/Images/sad.png')} /> */}
// 							</TouchableOpacity>

// 							{/* <View style={{ flex: 1 }} /> */}
// 						</View>
// 					</View>
// 				</View>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,

// 		backgroundColor: '#f5f5f5'
// 		//marginTop: -650,
// 	},
// 	emojiImg: {
// 		flexDirection: 'row'
// 	}
// });

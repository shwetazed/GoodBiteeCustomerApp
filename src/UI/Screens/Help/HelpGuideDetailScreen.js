import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@Images';
import Navigation from '@Components/Common/Navigation';
import HelpManager from '@Networking/HelpManager';
import HTML from 'react-native-render-html';
import { DISPLAY_ALERT } from '@Utils/Alert';

let helpId, userId, questionId, answer;

export default class HelpGuideDetailScreen extends Component {
	componentDidMount() {
		helpId = this.props.navigation.state.params.helpId;
		userId = this.props.navigation.state.params.userId;
		questionId = this.props.navigation.state.params.questionId;
		answer = this.props.navigation.state.params.answer;
		console.warn('getting answer is ', answer);
	}

	sendFeedBack(feedback) {
		HelpManager.sendUserFeedback(userId, questionId, feedback)
			.then(response => {
				console.warn('Response after send feedback ', response);
				if (response.status == 'success') {
					DISPLAY_ALERT('GoodBitee', 'Thank you for your valuable feedback.');
				}
			})
			.catch(error => {
				console.warn('error ', error);
			});
	}

	AlertBox(alertTitle, AlertMessage) {
		Alert.alert(
			alertTitle,
			'Please submit your feedback.',
			[
				{
					text: 'Ok',
					onPress: () => {
						this.sendFeedBack(AlertMessage);
					}
				},
				{ text: 'Cancel', onPress: () => {} }
			],
			{ cancelable: false }
		);
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="Help Guide"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
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
						{/* <ScrollView style={{ flex: 1 }}> */}
						<Text style={{ color: '#555555', fontSize: responsiveWidth(15) }}>
							{this.props.navigation.state.params.question}
						</Text>

						<HTML html={this.props.navigation.state.params.answer} imagesMaxWidth={Dimensions.get('window').width} />

						<View style={{ backgroundColor: '#555555', width: '75%', top: '6%', marginLeft: '1%' }} />
						{/* </ScrollView> */}
					</View>
					{/* <View style={{backgroundColor:'#555555',width:"35%",height:'0.15%',top:'54.8%',alignSelf:'center'}}/> */}
					<View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
						<View
							style={{
								width: '100%',
								height: '10%',

								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text style={{ color: '#555555', fontSize: responsiveWidth(13) }}>Was this helpful ?</Text>
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
								<Image
									style={{ height: 50, width: 50, alignSelf: 'center' }}
									source={require('@res/Images/happy.png')}
								/>
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
								<Image style={{ height: 50, width: 50, alignSelf: 'center' }} source={require('@res/Images/sad.png')} />
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

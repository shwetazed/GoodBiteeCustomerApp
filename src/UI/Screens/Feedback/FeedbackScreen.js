import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Background from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import Images from '@res/Images';
import Stars from 'react-native-stars';
import FeedbackManager from '@Networking/FeedbackManager';
import OffLineNotice from '@Components/Common/OffLineNotice';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FeedbackScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			starCount: 2.5,
			comment: '',
			status: false
		};
	}

	onStarRatingPress(rating) {
		console.warn('star rating here ', rating);
		this.setState({
			starCount: rating
		});
	}
	onChangeText(text) {
		//console.warn('Update text ', text);
		this.setState({
			reviewMessage: text
		});
	}

	onSubmitFeedback() {
		console.warn('In onSubmitMethod ');

		if (this.state.reviewMessage == '' || this.state.reviewMessage == null) {
			Alert.alert('Goodbitee', 'Please add your review.');
		} else {
			FeedbackManager.addReview('10', '5', this.state.reviewMessage, this.state.starCount, '2')
				.then(response => {
					Alert.alert('Goodbitee', response.msg);
					console.warn('Honey get response ', response);
					this.setState({
						starCount: 0
					});
					this.setState({
						reviewMessage: ''
					});
				})
				.catch(error => {
					console.warn('error getting in Review message ', error);
				});
		}
	}
	getNetStatus(result) {
		console.warn('Gettin Callback value ', result);
	}

	render() {
		// if (this.state.status == true) {
		// 	<OffLineNotice callback={this.getNetStatus.bind(this)} />;
		// } else {
		// 	null;
		// }

		return (
			<View>
				<Background />
				<Navigation
					navigation={this.props.navigation}
					title="Add Feedback"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				<OffLineNotice callback={this.getNetStatus.bind(this)} />
				<View style={styles.whiteView}>
					<View style={{ height: 10 }} />
					<Text style={{ color: 'green', fontSize: 20 }}>Please give your valueble review</Text>
					<View style={{ height: 10 }} />
					<View>
						<Stars
							default={this.state.starCount}
							count={5}
							half={true}
							starSize={50}
							spacing={5}
							opacity={0.6}
							update={val => this.onStarRatingPress(val)}
							fullStar={Images.star.source}
							emptyStar={Images.star_grey.source}
							halfStar={Images.half_star.source}
						/>
					</View>
					<View style={{ height: 25 }} />
					<TextInput
						numberOfLines={3}
						multiline
						style={styles.inputStyle}
						value={this.state.reviewMessage}
						onChangeText={val => this.onChangeText(val)}
						placeholder="Please enter your valuable feedback"
						//	placeholderTextColor="#cccccc"
					/>
					<View style={{ height: 25 }} />

					<TouchableOpacity
						onPress={() => {
							this.onSubmitFeedback();
						}}
						style={styles.button}
					>
						<Text style={{ color: 'green' }}>Submit Feedback</Text>
					</TouchableOpacity>

					<View style={{ height: 15 }} />

					<TouchableOpacity style={styles.button}>
						<Text style={{ color: 'green' }}>May be later</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	whiteView: {
		marginTop: '5%',
		width: '94%',
		height: '90%',
		padding: 15,
		backgroundColor: 'white',
		//borderWidth: 1,
		alignItems: 'center',
		//justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 10
	},
	star: {
		width: 30,
		height: 30,
		marginBottom: 20
	},
	myStarStyle: {
		color: 'yellow',
		width: 20,
		height: 100,
		backgroundColor: 'transparent',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2
	},
	myEmptyStarStyle: {
		color: 'white'
	},
	inputStyle: {
		height: 70,
		width: '94%',
		borderWidth: 1,
		borderColor: 'gray',
		color: '#000',
		paddingTop: 25,
		paddingLeft: 10,
		borderRadius: 10
	},
	button: {
		height: 40,
		width: '94%',
		borderWidth: 1,
		borderColor: 'green',
		color: '#cccccc',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
		//backgroundColor: 'green'
	}
});

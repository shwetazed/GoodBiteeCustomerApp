import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '@Images';
import Navigation from '@Components/Common/Navigation';
import BackgroundImage from '@Components/Common/BackgroundImage';
import * as colors from '@Utils/colors';
import { GET_LOCAL_DATA } from '@Core/Storage';
import OfflineNotice from '@Screens/OffLineNotice';
import { Config } from '@Core/Config';

export default class MessageDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Chat Support',
			date: 'Feb 05 2019,12:01 pm',
			totalTime: '1 hours ago',
			receiver: 'I loved your service thank you',
			sender: 'How can i help you?',
			msg: '',
			msg_data: [],
			sender_id: '',
			chat_id: ''
		};
	}

	messageIsNull() {
		console.warn('message is null.....');
	}
	sendMessage() {
		console.warn('Values here sender ', Config.USER_ID, ' Receiver ', this.state.support_id);
		fetch('http://goodbitee.com/web_services/add_message', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: this.state.chat_id,
				sender_id: Config.USER_ID,
				receiver_id: this.state.support_id,
				msg_text: this.state.msg
			})
		})
			.then(responseSend => responseSend.json())
			.then(responseData => {
				console.warn('message type is : ', responseData);
				this.setState({ msg: '' });
				this.getUserId();
			})

			.catch(error => {
				console.warn(error);
			});
	}

	getData(id) {
		console.warn('User id in Get message ', Config.USER_ID, ' and ', id);
		fetch('http://goodbitee.com/web_services/chat_list', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				//user_id: this.state.user_id
				user_id: id
			})
		})
			.then(response => response.json())
			.then(responseData => {
				console.warn('before response data', responseData.Message[0].sender_id);
				this.setState({ msg_data: responseData.Message });
				this.setState({ chat_id: responseData.Message[0].chat_id });

				this.setState({ support_id: responseData.Message[0].sender_id });

				// console.warn('response object: ', responseData);
				//console.warn('response object1:', this.state.msg_data, ' Response data ', responseData);

				// this.setState({ receiver: this.state.data.Message[0].msg_text });
				// this.setState({ time: this.state.data.Message[0].created });
				// this.setState({ sender_id: this.state.data.Message[0].sender_id });
			})

			.catch(error => {
				console.warn(error);
			});
	}

	getUserId() {
		this.getData(Config.USER_ID);
	}

	selectById(id) {
		console.warn('select id is: ', id);
	}

	componentDidMount() {
		this.getUserId();
	}

	render() {
		return (
			<View style={styles.container}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title="Message"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				<OfflineNotice />
				<View style={styles.backgroundView}>
					<View style={styles.backGroundViewTitle}>
						<Text style={{ fontSize: 21 }}>{this.state.text}</Text>
					</View>
					<View style={Platform.OS == 'ios' ? styles.divider : [styles.divider, { marginTop: '3%' }]} />
					<View>
						<FlatList
							style={{ height: '90%' }}
							data={this.state.msg_data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<View style={{ flex: 1, marginBottom: 25 }}>
									{Config.USER_ID != item.sender_id ? (
										<View>
											<TouchableOpacity onPress={() => this.selectById(item.message_id)}>
												<View style={styles.imageAndMessageView}>
													<View style={styles.message}>
														<Text style={{ color: '#000' }}>{item.msg_text}</Text>
													</View>

													<View style={styles.dp}>
														<Image style={styles.dpImage} source={require('@res/Images/support.png')} />
													</View>
												</View>

												<View style={styles.dateTime}>
													<Text style={styles.date}>{item.created}</Text>
													<View style={{ flex: 0.2, height: '100%' }} />
													<Text style={styles.time}>{this.state.totalTime}</Text>
												</View>
											</TouchableOpacity>
										</View>
									) : (
										<View>
											<TouchableOpacity onPress={() => this.selectById(item.message_id)}>
												{/* <View style={[styles.imageAndMessageView, { marginTop: '5%' }]}> */}
												<View style={[styles.imageAndMessageView]}>
													<View style={styles.dp}>
														{item.image == '' || item.image == undefined ? (
															<Image style={styles.dpImage} source={require('@res/Images/user.jpg')} />
														) : (
															<Image style={styles.dpImage} source={{ uri: item.image }} />
														)}
													</View>

													<View style={[styles.message, { backgroundColor: '#f5f5f5' }]}>
														<Text style={{ color: '#000' }}>{item.msg_text}</Text>
													</View>
												</View>
												<View style={{ height: '10%', width: '100%' }} />
												{/* <View style={[styles.dateTime, { justifyContent: 'flex-end', marginTop: '3%' }]}> */}
												<View style={styles.dateTime}>
													<View style={{ flex: 0.29, height: '100%' }} />
													<Text style={styles.date}>{item.created}</Text>
													<View style={{ flex: 0.2, height: '100%' }} />

													<Text style={styles.time}>{item.time_ago}</Text>
												</View>
											</TouchableOpacity>
										</View>
									)}
								</View>
							)}
						/>
					</View>

					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							height: 40
							//borderWidth: 1
							//left: '-3%'
						}}
					>
						<View style={{ flex: 0.8, paddingLeft: 7, borderWidth: 2, borderColor: '#cccccc' }}>
							<TextInput
								style={{ height: '100%', borderColor: 'gray', color: '#000' }}
								value={this.state.msg}
								onChangeText={val => this.setState({ msg: val })}
								placeholder={'Type your message'}
								placeholderTextColor="#cccccc"

								//editable={this.props.isEditable}
							/>
						</View>
						<View style={{ height: '2%', width: '2%' }} />
						{/* <View style={{flex=0.04}}/> */}
						<TouchableOpacity
							style={{
								flex: 0.2,
								//borderWidth: 1,
								justifyContent: 'center',
								backgroundColor: colors.green,
								borderRadius: 40
							}}
							onPress={() => {
								this.state.msg == '' || null ? this.messageIsNull() : this.sendMessage();
							}}
						>
							{/* <Image style={{height:20,width:20,borderWidth:1}} source={require('')}/> */}
							<Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Send</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 2
	},
	backgroundImage: {
		alignItems: 'center',
		width: '100%',
		height: '60%'
	},
	titleIos: {
		width: '100%',
		height: '7%',
		marginTop: '10%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleAndroid: {
		width: '100%',
		height: '7%',
		marginTop: '5%',
		marginBottom: '2%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	backgroundView: {
		width: '95%',
		height: '90%',
		backgroundColor: 'white',
		borderRadius: 10,
		marginBottom: '10%',
		shadowColor: '#000',
		shadowOffset: { height: 10, width: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		padding: '4%',
		elevation: 10,
		marginTop: 15,
		alignSelf: 'center'
		//borderWidth: 1
	},
	backGroundViewTitle: {
		width: '100%',
		flex: 0,
		justifyContent: 'flex-start'
	},
	divider: {
		borderColor: '#f5f5f5',
		borderWidth: 1,
		width: '100%',
		marginTop: '3.5%',
		paddingRight: '8%',
		marginBottom: '5%'
	},
	imageAndMessageView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
		//borderWidth: 1
	},

	message: {
		backgroundColor: '#c3ffad',
		//height: '100%',
		flex: 0.75,
		padding: '3%',
		borderRadius: 5
		//borderWidth: 1
	},
	dp: {
		flex: 0.18,
		alignItems: 'center'
	},
	dpImage: {
		height: 40,
		width: 40,
		borderRadius: 5,

		justifyContent: 'flex-end'
	},
	dateTime: {
		height: 15,
		width: '100%',
		marginTop: '1%',
		flexDirection: 'row'
		//borderWidth: 1
		//justifyContent: 'flex-start'
	},
	date: {
		color: '#999999',
		fontSize: 11,
		fontWeight: 'bold',
		flex: 0.5
		//borderWidth: 1
	},
	time: { color: '#6bb003', fontSize: 11, fontWeight: 'bold' }
});

//http://goodbitee.com/web_services/add_message?chat_id=1,sender_id=1,receiver_id=6,msg_text=check_message

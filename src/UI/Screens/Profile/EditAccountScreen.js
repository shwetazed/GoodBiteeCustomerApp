import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, FlatList, Text, Image, Platform, TouchableOpacity, TextInput } from 'react-native';
import Separator from '@Components/Common/Separator';
import * as colors from '@Utils/colors';
import UserManager from '@Networking/UserManager';
import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import { DISPLAY_ALERT } from '@Utils/Alert';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import Navigation from '@Components/Common/Navigation';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@res/Images';
import { Config } from '@Core/Config';

class EditAccountScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}
	ListEmpty = () => {
		return (
			//View to show when list is empty
			<View style={styles.MainContainer}>
				<Text style={{ textAlign: 'center' }}>No Data Found</Text>
			</View>
		);
	};
	componentDidMount() {
		that = this;
		console.warn(this.props.navigation.state.params.value);
		this.setState({
			value: this.props.navigation.state.params.value
		});
	}
	setProfileData() {
		const userKey = this.props.navigation.state.params.key;
		const userValueOfKey = this.state.value;
		UserManager.setUserDetail(Config.USER_ID, userKey, userValueOfKey)
			.then(response => {
				console.warn('response', response);
				if (response.status == 'success') {
					console.warn('success');
					this.props.updateUserData(response);

					DISPLAY_ALERT('Good Bitee', response.msg);
					this.props.navigation.pop();
				} else {
					DISPLAY_ALERT('Good Bitee', response.msg);
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}
	render() {
		return (
			<View style={styles.MainContainer}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Edit Account"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<View style={styles.backgroundView}>
					<Text style={{ marginLeft: 6 }}>{this.props.navigation.state.params.label}</Text>
					<Separator />
					<TextInput
						style={styles.textInput}
						placeholder={this.props.placeholder}
						onChangeText={value => this.setState({ value })}
						clearButtonMode="never"
						value={this.state.value}
						underlineColorAndroid="transparent"
					/>
					<Separator />
					<Separator />
					<TouchableOpacity
						style={{
							width: '50%',
							height: 40,
							borderRadius: 30,
							backgroundColor: colors.green,
							alignSelf: 'center',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onPress={() => {
							this.setProfileData();
						}}
					>
						<Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Save</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1
	},
	item: {
		fontSize: 12
	},
	backgroundImage: {
		width: '100%',
		height: '30%'
	},
	gap: {
		height: 15
	},

	title: {
		width: '100%',
		height: '5%',
		...Platform.select({
			ios: { top: '-57%' },
			android: { top: '-49%' }
		}),

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		//borderWidth: 1
	},
	backgroundView: {
		backgroundColor: '#fff',
		borderRadius: 10,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 10,
		height: '80%',
		marginTop: 15,
		width: '90%',
		padding: '4%'
	},

	image: {
		height: 20,
		width: 20
	},

	textInput: {
		borderWidth: 2,
		borderRadius: 25,
		borderColor: '#cccccc',
		padding: '3%',
		paddingLeft: '6%'
	}
});

export default connect(
	state => ({ userData: state.userData }),
	{ updateUserData: Actions.updateUserData }
)(EditAccountScreen);

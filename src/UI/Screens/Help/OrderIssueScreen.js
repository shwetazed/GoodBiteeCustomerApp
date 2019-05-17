import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import Navigation from '@Components/Common/Navigation';
import BackgroundImage from '@Components/Common/BackgroundImage';
import OrderIssueComponent from '@Components/Common/OrderIssueComponent';
import { GET_LOCAL_DATA } from '@Core/Storage';
import HelpManager from '@Networking/HelpManager';
import { Config } from '@Core/Config';

export default class OrderIssueScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			FlatListItem: []
		};
	}

	componentDidMount() {
		//typeId = this.props.navigation.state.params.typeId;
		//name = this.props.navigation.state.params.typeName;

		this.getHelpList('3');
	}

	getHelpList(typeId) {
		HelpManager.getHelpList(typeId)
			.then(list => {
				console.warn('Getting response here ', list);
				this.setState({ FlatListItem: list.HelpCategory });
			})
			.catch(error => {
				console.warn('error is ', error);
			});
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Order issue?"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.edit.source}
					isRightButtonHide={true}
					isMenu={false}
				/>
				<View style={{ height: 20, width: '100%' }} />
				<View
					style={{
						backgroundColor: 'white',
						borderRadius: 10,
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						elevation: 1,
						padding: 10,
						//margin: 15,
						//marginBottom: 5,
						height: 270,
						width: '95%',
						alignSelf: 'center'
					}}
				>
					{/* <Text style={{ color: '#555555', fontSize: responsiveWidth(14) }}>Last Order</Text> */}

					<View style={{ width: '100%', height: 190, borderRadius: 10 }}>
						<Image
							style={{
								width: '100%',
								//height: maintainRatio(6000, 4000, SCREEN_WIDTH - 40),
								height: '100%',
								//resizeMode: 'contain',
								borderRadius: 10
								//alignSelf: 'center'
							}}
							source={require('@res/Images/VegImage.jpeg')}
						/>
					</View>
					<View
						style={{
							width: '95%',
							height: 35,
							backgroundColor: 'white',
							alignSelf: 'center',
							bottom: 14,
							borderRadius: 5,
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.1,
							elevation: 1,
							justifyContent: 'center'
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
								{this.props.navigation.state.params.name}
							</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 0 }}>
						<Text style={{ color: '#555555', fontSize: responsiveWidth(14), marginLeft: 8 }}>Order#A6AO</Text>
						<Text style={{ color: 'black', fontSize: responsiveWidth(14), color: '#6bb003', marginRight: 6 }}>
							Receipt
						</Text>
					</View>
				</View>

				<View
					style={{
						backgroundColor: 'white',
						borderRadius: 10,
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3,
						padding: 20,
						margin: 20,
						marginBottom: '70%',
						width: '120%',
						height: '130%',
						alignSelf: 'center'
					}}
				>
					<Text style={styles.text}>Select In Issue</Text>

					<FlatList
						data={this.state.FlatListItem}
						//data to render in list
						renderItem={({ item }) => (
							//Single Item in list

							<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
								<View style={styles.gap} />
								<OrderIssueComponent
									title={item.name}
									onPressButton={() =>
										this.props.navigation.push('HelpGuideQuestionsScreen', {
											helpId: item.id,
											userId: Config.USER_ID
										})
									}
								/>
								{/* <TouchableOpacity
									style={styles.listItems}
									onPress={() => {
										this.props.navigation.navigate('HelpGuideQuestionsScreen', {
											helpId: item.id,
											userId: this.state.user_id
										});
									}}
								>
									<View style={{ flex: 1, padding: '3%', paddingLeft: '4%' }}>
										<Text style={styles.item}>{item.name}</Text>
									</View>
									<View style={{ flex: 0, padding: '4%' }}>
										<Image
											style={styles.image}
											resizeMode="contain"
											source={require('@res/Images/forward_arrow.png')}
										/>
									</View>
								</TouchableOpacity> */}
							</View>
						)}
					/>

					{/* <ScrollView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
						<View style={styles.gap} />
						<OrderIssueComponent
							title="My promo code did'nt apply"
							onPressButton={() =>
								this.props.navigation.navigate('HelpGuideQuestionsScreen', {
									//helpId: item.id,
									//userId: this.state.user_id
								})
							}
						/>
						 <View style={styles.gap} />
						<OrderIssueComponent title="Issue with a delivered or post order" />
						<View style={styles.gap} />
						<OrderIssueComponent title="I had a payment issue with my order" />
						<View style={styles.gap} />
						<OrderIssueComponent title="How many orders can I place in a given session ?" />
						<View style={styles.gap} />
						<OrderIssueComponent title="My promo code did'nt apply" /> 
					</ScrollView> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	gap: { height: 15, width: '100%' },
	text: {
		paddingLeft: 20,
		color: 'black',
		fontSize: responsiveWidth(15),
		marginLeft: 13,
		fontWeight: 'bold'
		//,borderWidth:1
	}
	// nameBox: {
	// 	width: 250,
	// 	height: 30,
	// 	marginTop: 30,
	// 	backgroundColor: '#cccccc',
	// 	borderRadius: 5,
	// 	marginLeft: 50
	// },
	// nameBoxText: {
	// 	marginLeft: 80,
	// 	marginTop: 5,
	// 	color: 'white'
	// },
	// HomeImg: {
	// 	marginTop: '1%'
	// 	//flexDirection: 'row'
	// 	//justifyContent: 'center',
	// 	//alignItems: 'center'
	// },
	// homeDes: {
	// 	marginLeft: 9,
	// 	marginTop: 9,
	// 	fontWeight: 'bold',
	// 	color: '#f5f5f5'
	// 	//marginBottom: '2%'
	// }
});

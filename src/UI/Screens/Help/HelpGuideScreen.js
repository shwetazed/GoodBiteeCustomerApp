import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, FlatList, Text, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
import Separator from '@Components/Common/Separator';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@Images';
import Navigation from '@Components/Common/Navigation';
import HelpManager from '@Networking/HelpManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { Config } from '@Core/Config';

let typeId;
export default class HelpGuideScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			FlatListItem: []
		};
	}

	componentDidMount() {
		typeId = this.props.navigation.state.params.typeId;
		//name = this.props.navigation.state.params.typeName;

		this.getHelpList(typeId);
	}

	getHelpList() {
		HelpManager.getHelpList(typeId)
			.then(list => {
				console.warn('Getting response here ', list);
				this.setState({ FlatListItem: list.HelpCategory });
			})
			.catch(error => {
				console.warn('error is ', error);
			});
	}

	ListEmpty = () => {
		return (
			//View to show when list is empty
			<View style={styles.MainContainer}>
				<Text style={{ textAlign: 'center' }}>No Data Found</Text>
			</View>
		);
	};
	render() {
		return (
			<View style={styles.MainContainer}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title={this.props.navigation.state.params.typeName}
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				<View style={{ height: 15 }} />
				<View style={styles.backgroundView}>
					<FlatList
						data={this.state.FlatListItem}
						//data to render in list
						renderItem={({ item }) => (
							//Single Item in list

							<View>
								<TouchableOpacity
									style={styles.listItems}
									onPress={() => {
										this.props.navigation.navigate('HelpGuideQuestionsScreen', {
											helpId: item.id,
											userId: Config.USER_ID
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
								</TouchableOpacity>
								<View style={styles.gap} />
							</View>
						)}
					/>
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
		//margin: '4.5%',
		//justifyContent: 'center',
		fontSize: 12
		//borderWidth: 1
	},
	backgroundImage: {
		width: '100%',
		height: '30%'
	},
	gap: {
		height: 15
	},
	// titleIos: {
	// 	width: '100%',
	// 	height: '5%',
	// 	top: '-55%',
	// 	flexDirection: 'row',
	// 	justifyContent: 'center',
	// 	alignItems: 'center'
	// },
	title: {
		width: '100%',
		height: '5%',
		...Platform.select({
			ios: { top: '-56%' },
			android: { top: '-49%' }
		}),
		//top: '-48%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		//borderWidth: 1
	},
	backgroundView: {
		width: '94%',
		// ...Platform.select({
		// 	ios: { height: '88%' },
		// 	android: { height: '92%' }
		// }),
		height: '80%',
		backgroundColor: '#fff',
		borderRadius: 10,
		//top: '-25.8%',
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		padding: '4%',
		elevation: 10
	},
	listItems: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		//height: '30%',
		flex: 1,

		//padding: '3%',
		width: '100%',
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	image: {
		height: 20,
		width: 20
	}
});

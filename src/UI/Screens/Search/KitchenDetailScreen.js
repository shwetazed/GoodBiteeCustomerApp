/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	SectionList,
	Platform,
	Modal
} from 'react-native';
import KitchenHeaderImage from '@Components/KitchenDetail/KitchenHeaderImage';
import Search from '@Components/Search/Search';
import BottomBarView from '@Components/Cart/BottomBarView';
import FoodManager from '@Networking/FoodManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import GoodBiteeSectionFlatList from '@Components/ListView/GoodBiteeSectionFlatList';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import FoodListItem from '@Components/KitchenDetail/FoodListItem';
import SectionHeader from '@Components/Common/SectionHeader';
import * as DeviceHelper from '@Utils/Helper/DeviceHelper';
import Images from '@res/Images';
import Stars from 'react-native-stars';
import SearchPopUp from '@Components/Search/Searching';
import { Config } from '@Core/Config';

let kitchenId = '1';
let that;
let intStar;

//type Props = {};
export default class KitchenDetailScreen extends Component {
	constructor() {
		super();
		that = this;

		this.getFoodData.bind(this);

		this.state = { dataSource: [], visible: false };
	}
	componentDidMount() {
		this.setState({ dataSource: [] });
		//console.warn('USER OFFER LIST ', this.props.navigation.state.params.item);
		//console.warn('USER TYPE ', this.props.navigation.state.params.type);

		kitchenId = this.props.navigation.state.params.item.kitchen_id;
		intStar = Number.parseFloat(this.props.navigation.state.params.item.rating);
		console.warn('STAR RATING ', intStar);
		console.warn('item', this.props.navigation.state.params.item);

		this.getFoodData();
	}
	getFoodData() {
		FoodManager.getFoodList(Config.USER_ID, kitchenId)
			.then(response => {
				if (response.Category) {
					let ds = response.Category;
					let data = [];
					for (const key in ds) {
						if (ds.hasOwnProperty(key)) {
							data.push({
								data: ds[key],
								key: key
							});
						}
					}
					console.warn('data', data);
					this.setState({ dataSource: data });
				} else {
					this.setState({ dataSource: [] });
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}

	FlatListItemSeparator = () => {
		return <View style={{ height: 0, width: '100%', backgroundColor: '#cccccc' }} />;
	};
	callbackMethod = id => {
		this.setState({ visible: false });
		console.warn('callback method called ');
	};

	state = { searchTerm: '' };
	render() {
		return (
			<View style={styles.container}>
				<BackgroundImage />

				<Navigation
					navigation={this.props.navigation}
					title={this.props.navigation.state.params.item.kitchen_name}
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<View style={{ alignItems: 'center', paddingTop: 30 }}>
					<Modal
						animationType="fade"
						transparent={true}
						visible={this.state.visible}
						onRequestClose={() => {
							this.setState({ visible: false });
						}}
					>
						<SearchPopUp
							callback={this.callbackMethod.bind(this)}
							array={this.state.dataSource}
							kitchen_name={this.props.navigation.state.params.item.kitchen_name}
							nav={this.props.navigation}
							kitchenId={kitchenId}
							type="2"
						/>
					</Modal>
				</View>

				<Image style={styles.headerImg} source={{ uri: this.props.navigation.state.params.item.image_original_url }} />

				<View style={styles.startRatingView}>
					<View style={styles.star}>
						<Stars
							default={intStar}
							count={5}
							half={true}
							starSize={12}
							spacing={2}
							opacity={0.6}
							//update={val => this.onStarRatingPress(val)}
							fullStar={Images.star.source}
							emptyStar={Images.star_grey.source}
							halfStar={Images.half_star.source}
						/>
					</View>
					{this.props.navigation.state.params.item.review_count == '' ||
					this.props.navigation.state.params.item.review_count == undefined ? (
						<View style={styles.startText}>
							<Text style={{ fontSize: 10 }}>0 reviews</Text>
						</View>
					) : (
						<View style={styles.startText}>
							<Text style={{ fontSize: 10 }}>{this.props.navigation.state.params.item.review_count} reviews</Text>
						</View>
					)}
				</View>
				<View style={styles.imageOverImage}>
					<View style={styles.timeViews}>
						<Image style={styles.timeImage} resizeMode="contain" source={require('@res/Images/description.png')} />
						{this.props.navigation.state.params.item.description == '' ||
						this.props.navigation.state.params.item.description == undefined ? (
							<Text>Kitchen not added discription</Text>
						) : (
							<Text>{this.props.navigation.state.params.item.description}</Text>
						)}
					</View>
					<View style={{ height: 5 }} />
					<View style={styles.timeViews}>
						<Image style={styles.timeImage} resizeMode="contain" source={require('@res/Images/watch.png')} />
						{this.props.navigation.state.params.item.arrival_time == '' ||
						this.props.navigation.state.params.item.arrival_time == undefined ? (
							<Text style={styles.timeText}>Kitchen not added arrival time</Text>
						) : (
							<Text style={styles.timeText}>{this.props.navigation.state.params.item.arrival_time}</Text>
						)}
					</View>
				</View>
				<View style={styles.listView}>
					<Search
						onPressButton={() => {
							this.setState({ visible: true });
						}}
					/>

					{this.state.dataSource.length > 0 ? (
						<ScrollView>
							<SectionList
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
								bounces={false}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.push('AddToCartScreen', {
												item,
												kitchen_name: this.props.navigation.state.params.item.kitchen_name
											});
										}}
									>
										<FoodListItem item={item} />
									</TouchableOpacity>
								)}
								renderSectionHeader={({ section }) => (
									<SectionHeader style={{ backgroundColor: 'white', marginLeft: 15 }} listType={'kitchen_food'}>
										{section.key}
									</SectionHeader>
								)}
								sections={this.state.dataSource}
								// sections={[
								// 	{
								// 		title: 'Most Popular',
								// 		data: this.state.dataSource
								// 	}
								// ]}
								keyExtractor={(item, index) => item + index}
							/>
						</ScrollView>
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ color: 'red', fontWeight: '500' }}>No food added by this kitchen</Text>
						</View>
					)}
				</View>

				<TouchableOpacity
					style={{ top: -200 }}
					onPress={() => {
						console.log('onPress');
						this.props.navigation.push('CartScreen');
					}}
				>
					<BottomBarView />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},
	headerImg: {
		marginTop: 10,
		//position: 'absolute',
		height: 220,
		width: '96%',
		//marginLeft: 11,
		borderRadius: 10,
		alignSelf: 'center'
		//borderWidth: 1
	},

	listView: {
		//flex: 1,
		height: '60%',
		backgroundColor: 'white',
		top: -70
	},

	imageOverImage: {
		//marginTop: 170,
		marginBottom: 20,
		backgroundColor: 'white',
		top: -70,
		height: 60,
		width: '88%',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 10,
		alignSelf: 'center',
		justifyContent: 'center'
		//borderWidth: 1
	},
	header: {
		color: 'gray',
		marginLeft: 10,
		marginTop: 10
	},
	dot: {
		color: 'black'
	},
	startRatingView: {
		backgroundColor: 'white',

		height: DeviceHelper.responsiveHeight(35),
		width: '20%',
		borderRadius: 5,
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 7,
		marginRight: '7%',
		top: -200,
		height: 40
		// ...Platform.select({
		// 	ios: { },
		// 	android: { top: -30, height: 40 }
		// })
	},
	star: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		alignContent: 'center'
	},
	timeViews: {
		flexDirection: 'row',
		width: '100%',
		height: '25%'
	},
	timeImage: {
		width: '7%',
		height: '120%',
		marginLeft: 5
	},
	timeText: {
		color: 'black'
	}
});

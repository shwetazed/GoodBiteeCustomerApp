import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	Image,
	FlatList,
	RefreshControl,
	SectionList
} from 'react-native';
import OfferScrollView from '@Components/Home/OfferScrollView';
import GoodBiteFlatList from '@Components/ListView/GoodBiteFlatList';
import MenuCard from '@Components/Home/MenuCard';
import Images from '@Images';
import { GET_DATA, SAVE_DATA } from '@Core/Storage';
import CategoryManager from '@Networking/CategoryManager';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import KitchenListItem from '@Components/Kitchen/KitchenListItem';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@Utils/Helper/DeviceHelper';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from 'native-base';
import OffLineNotice from '@Components/Common/OffLineNotice';
import BottomBarView from '@Components/Cart/BottomBarView';
import { Config } from '@Core/Config';
import CategoryListItem from '@Components/Home/CategoryListItems';
import SectionHeader from '@Components/Common/SectionHeader';

export default class HomeScreen extends Component {
	// static navigationOptions = { header: null };
	constructor() {
		super();
		this.getCategoryData.bind(this);
		this.state = {
			//dataSource: ['shweta', 'shalu', 'meenu'],
			dataSource: [],
			dataCategory: [],
			restorentName: 'Restorent name',
			desc: 'no description',
			delivery: '10-20 mins',
			category: 'Popular Categories',
			spicy: 'super_spicy',
			chiken: 'chiken',
			gluten: 'gluten_free',
			halal: 'halal',
			data: [],
			refreshing: false
		};
	}

	_onRefresh = () => {
		this.setState({ refreshing: true });
		// fetchData().then(() => {
		// 	this.setState({ refreshing: false });
		// });

		this.getAllKitchenList();
	};

	componentDidMount() {
		this.getAllKitchenList();
		GET_DATA('USER_DATA')
			.then(userData => {
				console.warn('USER DATA ', userData);
			})
			.catch(error => {
				console.warn('Promise is rejected with error: ' + error);
			});
	}
	static navigationOptions = {
		header: {
			style: null,
			backgroundColor: 'green'
		},
		headerStyle: {
			backgroundColor: 'transparent'
		}
	};

	getAllKitchenList() {
		//console.warn('IN GETTING LIST DATA ');
		CategoryManager.getAllHomeKitchenList(Config.USER_ID)
			.then(response => {
				console.warn('home kitchen array ', response);
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
					this.setState({ dataSource: response.Kitchen });
					//this.setState({ dataSource: [] });
				}
				this.setState({ data: response.Kitchen });
				//this.setState({ dataCategory: response.Category });

				this.setState({ refreshing: false });
			})
			.catch(error => {
				console.warn('Promise is rejected with error: ' + error);
				//this._onRefresh;
			});
		//console.warn('IN GETTING LIST DATA 2');
	}

	getCategoryData() {
		CategoryManager.getCategory('4', '0')
			.then(function(response) {
				console.warn('response', response.Category);
				this.setState({
					dataSource: ['shweta', 'shalu', 'meenu', 'dfgdfgfd']
				});
			})
			.catch(function(error) {
				//console.warn('error:', error);
			});
	}

	render() {
		//console.warn('datasource', this.state.dataSource);

		// for (let i = 0; i < this.state.dataSource.length; i++) {
		// 	console.warn('Key is ', i);
		// }

		return (
			<View style={styles.container}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title=""
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
					isMenu={true}
				/>
				<OffLineNotice />
				<ScrollView
					showsVerticalScrollIndicator={false}
					bounces={true}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
				>
					<OfferScrollView />

					{this.state.dataSource.map((data, index) => {
						console.warn('In for loop ', data.data);
						return (
							<View style={{ backgroundColor: 'white' }}>
								<SectionHeader style={styles.keyView} listType={'kitchen_food'}>
									{data.key}
								</SectionHeader>

								<FlatList
									showsHorizontalScrollIndicator={false}
									data={data.data}
									horizontal={true}
									renderItem={({ item, index }) => (
										<View>
											<TouchableOpacity
												style={{ flexDirection: 'row' }}
												onPress={() => {
													this.props.navigation.push('KitchenFoodCategoryScreen', {
														item: item
														//kitchen_name: this.props.navigation.state.params.item.kitchen_name
													});
												}}
											>
												<CategoryListItem item={item} />
											</TouchableOpacity>
										</View>
									)}
								/>
							</View>
						);
					})}

					<FlatList
						showsVerticalScrollIndicator={false}
						data={this.state.data}
						renderItem={({ item, index }) => (
							<View style={{ backgroundColor: 'white' }}>
								<TouchableOpacity
									// style={index==0?[styles.listView,{}]:styles.listView}
									style={styles.listView}
									onPress={() => {
										this.props.navigation.push('KitchenDetailScreen', {
											item
										});
									}}
								>
									<KitchenListItem item={item} />
								</TouchableOpacity>
							</View>
						)}
					/>
				</ScrollView>
				<TouchableOpacity
					style={{ top: -20 }}
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
		//height: '100%'
	},
	titleCategory: {
		//paddingTop: 10,
		paddingBottom: 2,
		paddingLeft: 10,
		fontSize: 20
	},

	containerHorizontalScroll: {
		height: 100,
		flexDirection: 'row',
		//marginBottom: 10,
		marginTop: 10,
		backgroundColor: 'white'
	},
	containerNonHorizontalScroll: {
		height: 220,
		width: '100%',
		//
		borderWidth: 1,
		//padding: 10,
		alignItems: 'center',
		//marginBottom: 20,
		backgroundColor: 'white'
	},
	containerOfferScroll: {
		height: 200,
		margin: 10,
		borderRadius: 10,
		marginTop: 80,
		borderWidth: 1
	},
	listView: {
		flex: 1,
		width: SCREEN_WIDTH,
		height: '100%',
		marginTop: 10
	},
	keyView: {
		backgroundColor: 'white',
		marginTop: 10,
		width: SCREEN_WIDTH - 20,
		//borderWidth: 1,
		//flexDirection: 'row',
		alignSelf: 'center'
	}
});

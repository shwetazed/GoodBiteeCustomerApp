import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	TextInput,
	FlatList,
	SectionList
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import SectionHeader from '@Components/Common/SectionHeader';
import { GET_LOCAL_DATA } from '@Core/Storage';
import FoodManager from '@Networking/FoodManager';
import FoodListItem from '@Components/KitchenDetail/FoodListItem';
import { Config } from '@Core/Config';

const KEYS_TO_FILTERS = ['data.[0].food_name', 'data.[0].price', 'data.[0].offer_price'];
let that;
export default class Searching extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			dataSource: [],
			searchAttribute: '',
			ignoreCase: true
		};
		that = this;
	}
	componentDidMount() {
		console.warn('Navigation object ', this.props.nav);
	}
	searchUpdated(term) {
		this.searchFoodData(term);

		this.setState({ searchTerm: term });
		//console.warn('Getting values here ', term);
	}
	onClickItems = () => {
		this.props.callback();
	};
	searchFoodData = keyword => {
		console.log('searchFoodData', keyword);

		FoodManager.foodSearch(Config.USER_ID, this.props.kitchenId, keyword)
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
	};
	render() {
		//const filteredEmails = this.props.array.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
		console.warn('List is ', this.state.dataSource);
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={
					this.state.searchTerm != '' || this.state.dataSource.length > 0
						? styles.container
						: [styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]
				}
				onPress={() => {
					this.onClickItems();
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						width: '100%',
						borderWidth: 1,
						backgroundColor: '#F5F5F5',
						height: 50,
						marginTop: 50
					}}
				>
					<View
						style={{
							height: '100%',
							flex: 0.1,

							alignItems: 'center',
							justifyContent: 'center',
							marginLeft: 10
						}}
					>
						<Image style={styles.searchImage} source={require('@res/Images/search.png')} />
					</View>
					<TextInput
						placeholder="Search here"
						//lightTheme
						//round
						style={styles.searchInput}
						onChangeText={text => {
							this.searchUpdated(text);
						}}
						autoCorrect={false}
						value={this.state.searchTerm}
					/>
					<View style={{ height: '100%', flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
						{/* <Image style={styles.searchImage} source={require('../../../res/Images/search.png')} /> */}

						{this.state.searchTerm != '' ? (
							<TouchableHighlight
								onPress={() => {
									this.setState({ searchTerm: '' });
								}}
								underlayColor="transparent"
							>
								<Text style={{ fontSize: 20 }}>X</Text>
							</TouchableHighlight>
						) : null}
					</View>
				</View>

				<ScrollView>
					<SectionList
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						bounces={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									this.onClickItems();
									this.props.nav.push('AddToCartScreen', {
										item,
										kitchen_name: this.props.kitchen_name
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
						keyExtractor={(item, index) => item + index}
					/>
				</ScrollView>
				{/* <FlatList data={filteredEmails} renderItem={({ item, index }) => <Text />} /> */}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start'
	},
	emailItem: {
		borderBottomWidth: 0.5,
		borderColor: 'black',
		padding: 10
	},
	emailSubject: {
		color: 'black'
	},
	searchInput: {
		marginLeft: 10,
		flex: 0.8,
		alignSelf: 'center'
	},
	searchImage: {
		height: 30,
		width: 30
	}
});

// import React, { Component } from 'react';
// //import react in our code.

// import { Text, StyleSheet, View, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
// //import all the components we are going to use.

// export default class Searching extends Component {
// 	constructor(props) {
// 		super(props);
// 		//setting default state
// 		this.state = { text: '' };
// 		this.arrayholder = [];
// 	}

// 	componentDidMount() {
// 		// this.setState({ dataSource: this.props.array });
// 		arrayholder = this.props.array;
// 		// return fetch('https://jsonplaceholder.typicode.com/posts')
// 		// 	.then(response => response.json())
// 		// 	.then(responseJson => {
// 		// 		this.setState(
// 		// 			{
// 		// 				isLoading: false,
// 		// 				dataSource: responseJson
// 		// 			},
// 		// 			function() {
// 		// 				this.arrayholder = responseJson;
// 		// 			}
// 		// 		);
// 		// 	})
// 		// 	.catch(error => {
// 		// 		console.error(error);
// 		// 	});
// 	}
// 	SearchFilterFunction(text) {
// 		//passing the inserted text in textinput
// 		const newData = this.arrayholder.filter(function(item) {
// 			//applying filter for the inserted text in search bar
// 			const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
// 			const textData = text.toUpperCase();
// 			return itemData.indexOf(textData) > -1;
// 		});
// 		this.setState({
// 			//setting the filtered newData on datasource
// 			//After setting the data it will automatically re-render the view
// 			dataSource: newData,
// 			text: text
// 		});
// 	}
// 	ListViewItemSeparator = () => {
// 		//Item sparator view
// 		return (
// 			<View
// 				style={{
// 					height: 0.3,
// 					width: '90%',
// 					backgroundColor: '#080808'
// 				}}
// 			/>
// 		);
// 	};
// 	render() {
// 		// if (this.state.isLoading) {
// 		// 	//Loading View while data is loading
// 		// 	return (
// 		// 		<View style={{ flex: 1, paddingTop: 20 }}>
// 		// 			<ActivityIndicator />
// 		// 		</View>
// 		// 	);
// 		// }
// 		return (
// 			//ListView to show with textinput used as search bar
// 			<View style={styles.viewStyle}>
// 				<TextInput
// 					style={styles.textInputStyle}
// 					onChangeText={text => this.SearchFilterFunction(text)}
// 					value={this.state.text}
// 					underlineColorAndroid="transparent"
// 					placeholder="Search Here"
// 				/>
// 				<FlatList
// 					data={this.state.dataSource}
// 					ItemSeparatorComponent={this.ListViewItemSeparator}
// 					renderItem={({ item }) => <Text style={styles.textStyle}>{item.title}</Text>}
// 					enableEmptySections={true}
// 					style={{ marginTop: 10 }}
// 					keyExtractor={(item, index) => index}
// 				/>
// 			</View>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	viewStyle: {
// 		justifyContent: 'center',
// 		flex: 1,
// 		marginTop: 40,
// 		backgroundColor: '#fff'
// 	},
// 	textStyle: {
// 		padding: 10
// 	},
// 	textInputStyle: {
// 		height: 40,
// 		borderWidth: 1,
// 		paddingLeft: 10,
// 		borderColor: '#009688',
// 		backgroundColor: '#FFFFFF'
// 	}
// });

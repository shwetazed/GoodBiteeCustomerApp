// import React, { Component } from 'react';
// import {
// 	View,
// 	Text,
// 	FlatList,
// 	ActivityIndicator,
// 	TouchableOpacity,
// 	StyleSheet,
// 	TextInput,
// 	Image,
// 	TouchableHighlight
// } from 'react-native';
// import { ListItem, SearchBar } from 'react-native-elements';
// import { SAVE_DATA, GET_DATA } from '@Core/Storage';
// import Images from '@Images';
// //import { TextInput } from 'react-native-gesture-handler';

// export default class Searching extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			loading: false,
// 			data: [],
// 			error: null,
// 			arrayData: [],
// 			value: ''
// 		};

// 		this.arrayholder = [];
// 	}

// 	componentDidMount() {
// 		// GET_DATA('SEARCH').then(data => {
// 		// 	console.warn('Search list is: ', data);
// 		// 	if (data != '' || data != 'undefined') {
// 		// 		this.setState({
// 		// 			data1: data,
// 		// 			data: data,
// 		// 			//error: res.error || null,
// 		// 			loading: false
// 		// 		});

// 		// 		console.warn(this.state.data1);
// 		// 		console.warn(this.state.data);

// 		// 		//this.arrayholder = this.state.data1;
// 		// 		this.makeRemoteRequest();
// 		// 	} else {
// 		// 		this.makeRemoteRequest();
// 		// 	}
// 		// });

// 		this.makeRemoteRequest();
// 	}

// 	makeRemoteRequest = () => {
// 		const url = `https://randomuser.me/api/?&results=20`;
// 		this.setState({ loading: true });

// 		fetch(url)
// 			.then(res => res.json())
// 			.then(res => {
// 				this.setState({
// 					data: res.results,
// 					error: res.error || null,
// 					loading: false
// 					//arrayData: res.results
// 				});
// 				this.arrayholder = res.results;

// 				//SAVE_DATA('SEARCH', res.results);
// 			})
// 			.catch(error => {
// 				this.setState({ error, loading: false });
// 			});
// 	};

// 	renderSeparator = () => {
// 		return (
// 			<View
// 				style={{
// 					height: 1,
// 					width: '86%',
// 					backgroundColor: '#F5F5F5',
// 					alignSelf: 'center'
// 					//borderWidth: 1,
// 					//marginLeft: '14%'
// 				}}
// 			/>
// 		);
// 	};

// 	searchFilterFunction = text => {
// 		this.setState({
// 			value: text
// 		});

// 		const newData = this.arrayholder.filter(item => {
// 			const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
// 			const textData = text.toUpperCase();

// 			return itemData.indexOf(textData) > -1;
// 		});
// 		this.setState({
// 			data: newData
// 		});
// 	};

// 	renderHeader = () => {
// 		return (
// 			<View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderColor: '#F5F5F5', height: 50 }}>
// 				<View
// 					style={{
// 						height: '100%',
// 						flex: 0.1,

// 						alignItems: 'center',
// 						justifyContent: 'center',
// 						marginLeft: 10
// 					}}
// 				>
// 					<Image style={styles.searchImage} source={require('@res/Images/search.png')} />
// 				</View>
// 				<TextInput
// 					placeholder="Search here"
// 					//lightTheme
// 					//round
// 					style={styles.searchInput}
// 					onChangeText={text => {
// 						this.searchFilterFunction(text);
// 					}}
// 					autoCorrect={false}
// 					value={this.state.value}
// 				/>
// 				<View style={{ height: '100%', flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
// 					{/* <Image style={styles.searchImage} source={require('../../../res/Images/search.png')} /> */}
// 					{this.state.value != '' ? (
// 						<TouchableHighlight
// 							onPress={() => {
// 								this.setState({ value: '' });
// 							}}
// 							underlayColor="transparent"
// 						>
// 							<Text style={{ fontSize: 20 }}>{this.state.value}</Text>
// 						</TouchableHighlight>
// 					) : null}
// 				</View>
// 				{/* <View style={{ height: '100%' }} /> */}
// 			</View>
// 		);
// 	};

// 	render() {
// 		if (this.state.loading) {
// 			return (
// 				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 					<ActivityIndicator />
// 				</View>
// 			);
// 		}
// 		return (
// 			<View style={{ flex: 1 }}>
// 				<FlatList
// 					data={this.state.data}
// 					renderItem={({ item }) => (
// 						<TouchableOpacity>
// 							{item.map(list => {
// 								<Text>{list.email}</Text>;
// 							})}
// 							{/* <ListItem
// 								//leftAvatar={{ source: { uri: item.picture.thumbnail } }}
// 								title={`${item.name.first} ${item.name.last}`}
// 								subtitle={item.email}
// 								//subtitle1={item.email}
// 							/> */}
// 						</TouchableOpacity>
// 					)}
// 					keyExtractor={item => item.email}
// 					ItemSeparatorComponent={this.renderSeparator}
// 					ListHeaderComponent={this.renderHeader}
// 				/>
// 			</View>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	searchInput: {
// 		marginLeft: 10,
// 		flex: 0.8,
// 		alignSelf: 'center'
// 	},
// 	searchImage: {
// 		height: 30,
// 		width: 30
// 	}
// });

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	TouchableHighlight,
	TextInput
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { emails } from '@Screens/mail';
const KEYS_TO_FILTERS = ['user.name', 'subject'];

export default class Searching extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
		//console.warn('Getting values here ', term);
	}

	render() {
		const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
		return (
			<View style={styles.container}>
				{/* <TextInput
					onChangeText={term => {
						this.searchUpdated(term);
					}}
					style={styles.searchInput}
					placeholder="Type a message to search"
				/> */}

				<View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderColor: '#F5F5F5', height: 50 }}>
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
					{/* <View style={{ height: '100%' }} /> */}
				</View>

				<ScrollView>
					{filteredEmails.map(email => {
						return (
							<TouchableOpacity onPress={() => alert(email.user.name)} key={email.id} style={styles.emailItem}>
								<View>
									{email.user.Title != null ? (
										<View style={{ alignItems: 'center', width: '100%' }}>
											<Text>{email.user.Title}</Text>
											<Text>------</Text>
										</View>
									) : null}

									<Text>{email.user.name}</Text>
									<Text style={styles.emailSubject}>{email.subject}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
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
		borderColor: 'rgba(0,0,0,0.3)',
		padding: 10
	},
	emailSubject: {
		color: 'rgba(0,0,0,0.5)'
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
// 		this.state = { isLoading: true, text: '' };
// 		this.arrayholder = [];
// 	}

// 	componentDidMount() {
// 		return fetch('https://jsonplaceholder.typicode.com/posts')
// 			.then(response => response.json())
// 			.then(responseJson => {
// 				this.setState(
// 					{
// 						isLoading: false,
// 						dataSource: responseJson
// 					},
// 					function() {
// 						this.arrayholder = responseJson;
// 					}
// 				);
// 			})
// 			.catch(error => {
// 				console.error(error);
// 			});
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
// 		if (this.state.isLoading) {
// 			//Loading View while data is loading
// 			return (
// 				<View style={{ flex: 1, paddingTop: 20 }}>
// 					<ActivityIndicator />
// 				</View>
// 			);
// 		}
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
// 		padding: 16
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

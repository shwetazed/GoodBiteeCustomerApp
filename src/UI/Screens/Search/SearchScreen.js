import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import SearchBoxItem from '@Components/Search/SearchBoxItem';
import SearchCategoryItem from '@Components/Search/SearchCategoryItem';
import CategoryManager from '@Networking/CategoryManager';
import Navigation from '@Components/Common/Navigation';

import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import Images from '@Images';
import BackgroundImage from '@Components/Common/BackgroundImage';
import BottomBarView from '@Components/Cart/BottomBarView';
import { Config } from '@Core/Config';

export default class SearchScreen extends Component {
	constructor() {
		super();
		this.getCategoryData.bind(this);
		this.state = { dataSource: [], searchText: '' };
	}
	componentDidMount() {
		this.getCategoryData();
	}

	getCategoryData() {
		CategoryManager.getCategory(Config.USER_ID, '0')
			.then(response => {
				console.warn('response', response.Category);

				this.setState({ dataSource: response.Category });
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}
	onSubmitSearchHandler = text => {
		console.warn(this.state.searchText);
		this.props.navigation.push('KitchenListScreen', {
			searchText: this.state.searchText
		});
	};

	searchHandle = search_text => {
		this.setState({
			searchText: search_text
		});
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Category"
					isLeftButtonHide={false}
					letButtonImage={Images.menu.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
					isMenu={true}
				/>

				<SearchBoxItem
					searchHandle={this.searchHandle}
					value={this.state.searchText}
					onSubmitSearchHandler={this.onSubmitSearchHandler}
				/>

				<FlatList
					data={this.state.dataSource}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('KitchenListScreen', {
									//categoryId: item.id
									searchText: item.name
								});
							}}
						>
							<SearchCategoryItem item={item} />
						</TouchableOpacity>
					)}
					numColumns={2}
					keyExtractor={(item, index) => index}
					style={{ flex: 1, marginVertical: 20 }}
				/>
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
	MainContainer: {
		justifyContent: 'center',
		flex: 1,
		paddingTop: 10
	},
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		borderRadius: 10
	}
});

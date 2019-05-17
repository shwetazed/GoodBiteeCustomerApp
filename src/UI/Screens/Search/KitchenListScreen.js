import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';

import KitchenListItem from '@Components/Kitchen/KitchenListItem';
import KitchenManager from '@Networking/KitchenManager';
import Navigation from '@Components/Common/Navigation';

import { GET_LOCAL_DATA } from '@Core/Storage';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@Utils/Helper/DeviceHelper';
import BackgroundImage from '@Components/Common/BackgroundImage';
import Images from '@res/Images';
import SearchBoxItem from '@Components/Search/SearchBoxItem';
import BottomBarView from '@Components/Cart/BottomBarView';
import { Config } from '@Core/Config';

let categoryId = '';

export default class KitchenListScreen extends Component {
	constructor() {
		super();

		this.getKitchenData.bind(this);

		this.state = { dataSource: [], searchText: '' };
	}
	componentDidMount() {
		//categoryId = this.props.navigation.state.params.categoryId;
		this.setState({
			dataSource: [],
			searchText: this.props.navigation.state.params.searchText
		});

		console.warn('search:', this.state.searchText);

		this.getKitchenData(this.props.navigation.state.params.searchText);
	}
	onSubmitSearchHandler = text => {
		this.getKitchenData(this.state.searchText);
	};

	searchHandle = search_text => {
		this.setState({
			searchText: search_text
		});
	};
	getKitchenData(text) {
		KitchenManager.searchKitchen(Config.USER_ID, text)
			.then(response => {
				console.warn('response', response.kitchen);
				this.setState({ dataSource: response.kitchen });
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}

	render() {
		//const categoryId = this.props.navigation.state.params.categoryId;
		//console.warn('categoryId', categoryId);

		return (
			<View style={styles.container}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Kitchens"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				<SearchBoxItem
					searchHandle={this.searchHandle}
					value={this.state.searchText}
					onSubmitSearchHandler={this.onSubmitSearchHandler}
				/>

				<FlatList
					style={styles.listView}
					showsVerticalScrollIndicator={false}
					data={this.state.dataSource}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('KitchenDetailScreen', {
									item
								});
							}}
						>
							<KitchenListItem item={item} />
						</TouchableOpacity>
					)}
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
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center'
	},
	listView: {
		flex: 1,
		width: SCREEN_WIDTH,
		height: '100%',
		marginTop: 15
	}
});

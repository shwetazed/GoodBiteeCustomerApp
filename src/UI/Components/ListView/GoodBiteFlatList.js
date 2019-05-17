import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MenuCard from '../Home/MenuCard';
import CartRecommendedFoodListItem from '../Cart/CartRecommendedFoodListItem';
import CartRemovableOrderListItem from '../Cart/CartRemovableOrderListItem';
import DrawerMenuListItem from '../Common/DrawerMenuListItem';
import MessageListItem from '../Message/MessageListItem';
import OrderListItem from '../Order/OrderListItem';

//const menucardWidth = 'SCREEN_WIDTH - 100';

export default class GoodBiteFlatList extends Component {
	constructor() {
		super();
		this.state = { restorentName: 'Restorent name', desc: 'no description', delivery: '10-20 mins' };
	}

	navigateToScreen = route => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.dispatch(DrawerActions.closeDrawer());
	};

	renderCell = ({ item }) => {
		const { navigation } = this.props;
		switch (this.props.listType) {
			case 'recommended':
				return <CartRecommendedFoodListItem>{item.key}</CartRecommendedFoodListItem>;
			case 'message_list':
				return (
					<TouchableOpacity
						onPress={() => {
							navigation.push('MessageDetailScreen');
						}}
					>
						<MessageListItem>{item.key}</MessageListItem>
					</TouchableOpacity>
				);
			case 'order_list':
				return (
					<TouchableOpacity
						onPress={() => {
							//navigation.push('OrderDetailScreen');
						}}
					>
						<OrderListItem onViewReceiptClick={this.props.onViewReceiptClick}>{item.key}</OrderListItem>
					</TouchableOpacity>
				);
			case 'removable_order_list':
				return (
					<TouchableOpacity onPress={() => {}}>
						<CartRemovableOrderListItem
							foodName={item.food_name}
							foodPrice={item.food_price}
							foodQuantity={item.quantity}
						/>
					</TouchableOpacity>
				);
			case 'drawer_list':
				return (
					<TouchableOpacity
						onPress={() => {
							console.warn('Test');
							console.warn(item);
							if (item == 'Home') {
								navigation.navigate('Home');
							} else if (item == 'Profile') {
								navigation.navigate('ProfileScreen');
							} else if (item == 'Orders') {
								navigation.navigate('OrderScreen');
							} else if (item == 'Payment') {
								navigation.navigate('ProfileScreen');
							} else if (item == 'Help') {
								navigation.navigate('HelpScreen');
							} else if (item == 'About') {
								navigation.navigate('AboutScreen');
							}
						}}
					>
						<DrawerMenuListItem>{item}</DrawerMenuListItem>
					</TouchableOpacity>
				);
			default:
				return (
					<MenuCard
						type="list"
						name={this.state.restorentName}
						description={this.state.desc}
						delivery={this.state.delivery}
					>
						{item.key}
					</MenuCard>
				);
		}
	};

	render() {
		return (
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				data={this.props.arrayList}
				renderItem={this.renderCell}
			/>
		);
	}
}

import React, { Component } from 'react';
import { SectionList, TouchableOpacity } from 'react-native';

import SectionHeader from '@Components/Common/SectionHeader';
import CartSectionListItem from '@Components/Cart/CartSectionListItem';
import FoodListItem from '@Components/KitchenDetail/FoodListItem';

export default class GoodBiteeSectionFlatList extends Component {
	navigateToScreen = route => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.dispatch(DrawerActions.closeDrawer());
	};
	componentDidMount;
	render() {
		const { navigation } = this.props;
		if (this.props.listType == 'add_to_cart_section_list') {
			return (
				<SectionList
					scrollEnabled={false}
					style={{ flex: 1 }}
					renderItem={({ item, index, section }) => <CartSectionListItem key={index} item={item} />}
					renderSectionHeader={({ section: { title } }) => <SectionHeader>{title}</SectionHeader>}
					sections={[{ title: 'Extra Instruction', data: this.props.arrayList }]}
					keyExtractor={(item, index) => item + index}
				/>
			);
		} else {
			return (
				<SectionList
					scrollEnabled={false}
					bounces={false}
					renderItem={({ item, index, section }) => (
						<TouchableOpacity
							onPress={() => {
								navigation.push('AddToCartScreen', {
									foodData: {
										foodId: item.id,
										foodName: item.food_name,
										foodPrice: item.price,
										kitchenId: navigation.state.params.kitchenId
									}
								});
							}}
						>
							<FoodListItem foodName={item.food_name} foodPrice={item.price} foodOfferPrice={item.offer_price} />
						</TouchableOpacity>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<SectionHeader style={{ backgroundColor: 'white', marginLeft: 15 }} listType={'kitchen_food'}>
							{title}
						</SectionHeader>
					)}
					sections={[
						{
							title: 'Most Popular',
							data: this.props.data
						}
					]}
					keyExtractor={(item, index) => item + index}
				/>
			);
		}
	}
}

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native';
import Box from '@Components/Cart/HeaderImageAndBox';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import OrderManager from '@Networking/OrderManager';
import FoodManager from '@Networking/FoodManager';

import BackgroundImage from '@Components/Common/BackgroundImage';
import Navigation from '@Components/Common/Navigation';
import Images from '@res/Images';
import * as colors from '@Utils/colors';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import { Config } from '@Core/Config';

//type Props = {};
let that;
let firstPrize;
class AddToCartScreen extends Component {
	constructor(props) {
		super(props);
		firstPrize = Number.parseInt(this.props.navigation.state.params.item.offer_price);
		this.addToCart.bind(this);

		this.state = {
			addItem: 1,
			price: Number.parseInt(this.props.navigation.state.params.item.offer_price),
			cartItemCount: '1',
			addCartStatus: false,
			foodData: ''
		};
	}
	componentDidMount() {
		that = this;
		if (this.props.navigation.state.params.remove != undefined) {
			this.setState({ addItem: Number.parseInt(this.props.navigation.state.params.item.quantity) });
			this.setState({
				price: Number.parseInt(this.props.navigation.state.params.item.price)
			});
		}

		this.getFoodDetail();
	}
	getFoodDetail = () => {
		FoodManager.getFoodDetail(Config.USER_ID, this.props.navigation.state.params.item.food_id)
			.then(response => {
				console.warn('response', response);

				if (response.Food) {
					this.setState({ foodData: response.Food });
				} else {
					this.setState({ foodData: '' });
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
	increase = () => {
		if (this.props.navigation.state.params.remove != undefined) {
			this.setState({ addItem: this.state.addItem + 1 });
			this.setState({ price: this.state.price + Number.parseInt(this.state.foodData.price) });
		} else {
			this.setState({ addItem: this.state.addItem + 1 });
			this.setState({ price: this.state.price + firstPrize });
		}
	};

	decrease = () => {
		switch (this.state.addItem) {
			case 1:
				Alert.alert('Atleast 1 item should be selected');
				break;
			default:
				if (this.props.navigation.state.params.remove != undefined) {
					this.setState({ addItem: this.state.addItem - 1 });
					this.setState({ price: this.state.price - Number.parseInt(this.state.foodData.price) });
				} else {
					this.setState({ addItem: this.state.addItem - 1 });
					this.setState({ price: this.state.price - firstPrize });
				}
		}
	};
	addToCart() {
		OrderManager.addToCart({
			userId: Config.USER_ID,
			cartId: this.props.cartData.cart_id,
			kitchenId: that.props.navigation.state.params.item.kitchen_id,
			foodId: that.props.navigation.state.params.item.food_id,
			quantity: that.state.addItem,
			amount: this.state.foodData.offer_price,
			taxAmount: '0',
			//totalAmount: that.props.navigation.state.params.item.offer_price
			totalAmount: that.state.price
		})

			.then(response => {
				console.warn('response', response);
				// const TOTAL = { CART_ITEM_COUNT: this.state.addItem, CART_TOTAL_AMOUNT: this.state.price };
				if (response.status == 'success') {
					this.props.setCartData(response.CartDetail);

					this.setState({
						addCartStatus: true
					});
				} else {
					Alert.alert(response.msg);
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	}
	clickedOnRemoveItem() {
		OrderManager.removeItemFromCart(this.props.navigation.state.params.item.cart_item_id, Config.USER_ID)

			.then(response => {
				console.warn('response after remove cart item ', response);
				if (response.status == 'success') {
					// this.setState({ cartItemCount: response.CartDetail.item_count });
					this.props.navigation.push('CartScreen');
				}
			})
			.catch(error => {
				consol.warn('Error ', error);
			});
	}

	renderAddToCartView = () => {
		let cartText = this.state.addCartStatus == false ? 'Add to Cart' : 'View Cart';

		console.warn('in Render Add Cart ', cartText);
		return this.props.navigation.state.params.remove == undefined ? (
			<View>
				<TouchableOpacity
					style={styles.bottomBarItems}
					onPress={() => {
						if (this.state.addCartStatus == false) {
							this.addToCart();
						} else {
							this.props.navigation.push('CartScreen');
						}
					}}
				>
					<Text style={styles.addCartText}>
						{cartText} ({this.state.addItem})
					</Text>
					<Text style={styles.addCartText}>{this.state.price}</Text>
				</TouchableOpacity>
			</View>
		) : (
			<TouchableOpacity
				style={[styles.bottomBarItems, { justifyContent: 'center' }]}
				onPress={() => {
					this.addToCart();
				}}
			>
				<Text style={styles.addCartText}>Update cart </Text>
			</TouchableOpacity>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title={this.props.navigation.state.params.kitchen_name}
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<View style={styles.imageOverBG}>
					<Image
						style={styles.image}
						imageStyle={{ borderRadius: 10 }}
						source={{ uri: this.state.foodData.image_original_url }}
					/>
					<Box
						onPressIncrease={this.increase.bind(this)}
						onPressDecrease={this.decrease.bind(this)}
						quantity={this.state.addItem}
						item={this.state.foodData}
						remove={
							this.props.navigation.state.params.remove != undefined ? this.props.navigation.state.params.remove : 0
						}
						callback={this.clickedOnRemoveItem.bind(this)}
					/>
					{this.renderAddToCartView()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		borderWidth: 1
	},
	imageOverBG: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain'
	},
	image: {
		marginTop: 15,
		height: '30%',
		width: SCREEN_WIDTH - 20,
		borderRadius: 10,
		margin: 10
	},
	backgroundImage: {
		alignItems: 'center',
		width: '100%',
		height: '35%'
	},

	bottomBarItems: {
		flexDirection: 'row',
		backgroundColor: '#6bb003',
		justifyContent: 'space-between',
		height: 45
	},
	addCartText: {
		color: 'white',
		padding: 12,
		fontSize: 15
	},
	PlaceOrderButton: {
		height: 20,
		width: '100%',
		backgroundColor: colors.green,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		bottom: 50
	}
});
export default connect(
	state => ({
		userData: state.userData,
		cartData: state.cartData
	}),
	{
		setCartData: Actions.setCartData,
		fetchCartData: Actions.fetchCartData
	}
)(AddToCartScreen);

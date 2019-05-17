import React, { Component } from 'react';
import { ImageBackground, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import GoodBiteFlatList from '@Components/ListView/GoodBiteFlatList';
import EditTextField from '@Components/Common/EditTextField';
import ApplyPromoCodeView from '@Components/Cart/ApplyPromoCodeView';
import CartPriceView from '@Components/Cart/CartPriceView';

import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import OrderManager from '@Networking/OrderManager';
import CartRecommendedFoodListItem from '@Components/Cart/CartRecommendedFoodListItem';
import CartRemovableOrderListItem from '@Components/Cart/CartRemovableOrderListItem';
import Navigation from '@Components/Common/Navigation';
import BackgroundImage from '@Components/Common/BackgroundImage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';
import PromoCodeManager from '@Networking/PromoCodeManager';
import { Config } from '@Core/Config';

import Images from '@Images';

let that;
let promoCode;
let foodIds = [];

class CartScreen extends Component {
	constructor() {
		super();
		this.state = { dataSource: {}, addressStatus: false, Address: ['jaipur', 'Rajasthan'], foodIds: null };
	}
	componentDidMount() {
		that = this;
		promoCode = 'no promo code apply';
		foodIds = [];

		// if (this.props.navigation.state.params != undefined) {
		// 	//console.warn('Promo code object ', this.props.navigation.state.params.item);
		// 	promoCode = this.props.navigation.state.params.item.promo_code;
		// 	this.setState({ offer_id: this.props.navigation.state.params.item.offer_id });
		// 	this.setState({ promo_code: this.props.navigation.state.params.item.promo_code });
		// 	foodIds = [];
		// } else {
		// 	foodIds = [];
		// }
		this.setState({ dataSource: {}, addressStatus: false, visible: false });

		this.getCartData();
	}
	ApplyPromoCode() {
		this.setState({ visible: true });

		if (promoCode == 'no promo code apply') {
			this.setState({ visible: false });
			DISPLAY_ALERT('GoodBitee', 'Please select promo code!');
		} else {
			PromoCodeManager.applyPromoCode(
				this.state.offer_id,
				Config.USER_ID,
				this.props.cartData.kitchenId,
				this.props.cartData.total_amount,
				this.state.promo_code
			)
				.then(response => {
					this.props.setCartData(response.CartDetail);
					// console.warn('Applied promo code ', response);
					// this.setState({ visible: false });
					// //this.setState({ sub_total: response.sub_total_amount });
					// this.setState({ total_amount: response.finalAmount });
					// //this.setState({ tax_total: response.total_tax_amount });
					// this.setState({ promo_discount: response.offerAmount });
				})
				.catch(error => {
					console.warn('Error in Apply promo ', error);
				});
		}
	}
	applyCouponCallBack = coupon => {
		console.warn('applyCouponCallBack', coupon);

		promoCode = coupon.promo_code;
		this.setState({ offer_id: coupon.offer_id });
		this.setState({ promo_code: coupon.promo_code });
	};
	getCartData = () => {
		this.props.fetchCartData(Config.USER_ID);
	};
	deleteCartItem = itemId => {
		console.warn('deleteCartItem');

		OrderManager.deleteCartItem(Config.USER_ID, itemId)
			.then(response => {
				console.warn('response', response);
				if (response.status == 'success') {
					if (response.CartDetail) {
						this.props.setCartData(response.CartDetail);
					}
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
	placeOrder = () => {
		OrderManager.placeOrder(Config.USER_ID, this.props.cartData.cart_id, this.props.cartData.kitchenId)
			.then(response => {
				console.warn('response', response);
				if (response.status == 'success') {
					this.props.setCartData({});

					this.props.navigation.push('OrderScreen');
					Alert.alert(response.msg);
				} else {
					Alert.alert(response.msg);
				}
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
	renderAddress = () => {
		if (this.props.cartData.Address) {
			return (
				<View style={styles.addressMapContainer}>
					<Image style={styles.mapImage} source={require('@res/Images/map.png')} />

					{/* {this.state.dataSource.Address.image == undefined ? (
						<Image style={styles.mapImage} source={require('@res/Images/map.png')} />
					) : (
						<Image style={styles.mapImage} source={require('@res/Images/map.png')} />
					)} */}
					<View style={styles.addressContainer}>
						<Text style={styles.addressText}>
							{this.props.cartData.Address.appartment_no +
								' ' +
								this.props.cartData.Address.address1 +
								' ' +
								this.props.cartData.Address.city +
								' , ' +
								this.props.cartData.Address.state +
								' , ' +
								this.props.cartData.Address.zip}
						</Text>
						<Text style={[styles.addressText, { color: 'gray' }]}>
							Deliver To{' '}
							{this.props.cartData.Address.appartment_no +
								' ' +
								this.props.cartData.Address.address1 +
								' ' +
								this.props.cartData.Address.city +
								' , ' +
								this.props.cartData.Address.state +
								' , ' +
								this.props.cartData.Address.zip}
						</Text>
					</View>
				</View>
			);
		}
	};
	updateAddressCallBack = () => {
		this.getCartData();
	};
	renderCartView = () => {
		if (this.props.cartData != {}) {
			if (this.props.cartData.Item) {
				if (this.props.cartData.Item.length > 0) {
					return (
						<View style={styles.containerView}>
							<ScrollView
								bounces={false}
								showsVerticalScrollIndicator={false}
								style={{ backgroundColor: 'transparent' }}
							>
								<View style={[styles.containerView, { marginTop: 15 }]}>
									<View style={styles.cardContainer}>
										<Text style={styles.kitchenTitle}>{this.props.cartData.kitchenName}</Text>
										<Text style={styles.descriptionTitle}>{this.props.cartData.deliveryTime}</Text>
										<Image style={styles.separatorLine} />
										{/* {this.state.addressStatus == false ? this.renderAddress() : null} */}

										{this.renderAddress()}
									</View>
									<View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingBottom: 20 }}>
										<TouchableOpacity
											onPress={() => {
												this.props.navigation.push('SetDeliveryAddressScreen', {
													callback: this.updateAddressCallBack
												});
											}}
										>
											<View style={{ marginTop: 10, flexDirection: 'row', marginLeft: 20 }}>
												<Image style={{ backgroundColor: 'gray', width: 15, height: 15 }} />
												<Text style={{ marginLeft: 10 }}>As soon as possible</Text>
											</View>
										</TouchableOpacity>

										<Image style={styles.separatorLine} />
										<Text
											style={[
												styles.descriptionTitle,
												{ width: '100%', textAlign: 'left', padding: 10, paddingLeft: 20 }
											]}
										>
											People who ordered this item also ordered
										</Text>
										<FlatList
											showsHorizontalScrollIndicator={false}
											horizontal={true}
											data={this.props.cartData.RecommendedFood}
											renderItem={({ item }) => (
												<TouchableOpacity
													onPress={() => {
														this.props.navigation.push('AddToCartScreen', {
															item,
															kitchen_name: this.props.cartData.kitchenName
														});
													}}
												>
													<CartRecommendedFoodListItem item={item} />
												</TouchableOpacity>
											)}
										/>
										<Image style={styles.separatorLine} />
										<FlatList
											showsVerticalScrollIndicator={false}
											scrollEnabled={false}
											horizontal={false}
											data={this.props.cartData.Item}
											renderItem={({ item }) => (
												<TouchableOpacity
													onPress={() => {
														this.props.navigation.push('AddToCartScreen', {
															item,
															kitchen_name: this.props.cartData.kitchenName,
															remove: 1
														});
													}}
												>
													<CartRemovableOrderListItem item={item} deleteCartItem={this.deleteCartItem} />
												</TouchableOpacity>
											)}
										/>
										<EditTextField
											isImage={false}
											isEditable={true}
											style={{ backgroundColor: '#F5F5F5' }}
											placeholder="Add a note (Extra souce,onion etc)"
										/>
										{this.state.visible == true ? (
											<View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
												<TouchableOpacity
													style={{
														height: '100%',
														width: 40,

														justifyContent: 'center',
														alignItems: 'center'
													}}
													onPress={() => {
														this.setState({ visible: false });
													}}
												>
													<Image
														style={{ height: '100%', width: '100%' }}
														source={require('@res/Images/loading.gif')}
													/>
												</TouchableOpacity>
											</View>
										) : (
											<ApplyPromoCodeView
												placeholder="Add Promo Code"
												secureEntry={false}
												promo={promoCode}
												onPressApplyButton={() => {
													this.ApplyPromoCode();
												}}
												onPressButton={() => {
													this.props.cartData.Item.map(data => {
														foodIds.push(data.food_id);
													});
													this.props.navigation.push('ApplyPromoScreen', {
														kitchen_id: this.props.cartData.kitchenId,
														food_ids: foodIds,
														callback: this.applyCouponCallBack
													});
												}}
											/>
										)}
										<Image style={styles.separatorLine} />
										<CartPriceView
											subTotal={this.props.cartData.sub_total_amount}
											totalTaxAmount={this.props.cartData.total_tax_amount}
											totalAmount={
												this.props.cartData.finalAmount
													? this.props.cartData.finalAmount
													: this.props.cartData.total_amount
											}
											promoDiscount={this.props.cartData.offerAmount ? this.props.cartData.offerAmount : ''}
											deliveryCharge={this.props.cartData.deliveryCharge ? this.props.cartData.deliveryCharge : '0'}
										/>
										<TouchableOpacity
											style={styles.bottomBarItems}
											onPress={() => {
												this.placeOrder();
											}}
										>
											<Text style={styles.addCartText}>Place Order</Text>
											<Text style={styles.addCartText}>{this.props.cartData.total_amount}</Text>
										</TouchableOpacity>
									</View>
								</View>
							</ScrollView>
						</View>
					);
				}
			}
		}

		return (
			<View style={styles.containerView}>
				<Text style={{ alignSelf: 'center', marginTop: 250 }}>No Item In Cart</Text>
			</View>
		);
	};
	render() {
		return (
			<View style={styles.containerView}>
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Cart"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>
				{this.renderCartView()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	cardContainer: {
		width: '95%',
		//height: 250,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		alignItems: 'center',
		marginTop: 10
	},
	addressMapContainer: {
		width: '100%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginBottom: 20
	},
	addressContainer: {
		width: '60%',
		borderRadius: 10,
		alignItems: 'flex-start'
	},

	navTitle: {
		height: 30,
		marginTop: -50,
		textAlign: 'center',
		color: 'white',
		alignSelf: 'center',
		fontSize: 20
	},
	kitchenTitle: {
		height: 30,
		marginTop: 20,
		textAlign: 'center',
		fontSize: 20,
		color: 'black'
	},
	descriptionTitle: {
		textAlign: 'center',
		fontSize: 12,
		marginTop: 2,
		color: 'gray',
		flexWrap: 'wrap',
		width: '60%'
	},
	addressText: {
		textAlign: 'left',
		fontSize: 12,
		marginTop: 10,
		color: 'black',
		flexWrap: 'wrap',
		width: '100%'
	},
	separatorLine: {
		width: '95%',
		height: 0.5,
		backgroundColor: 'gray',
		marginTop: 10,
		alignSelf: 'center'
	},
	mapImage: {
		width: 100,
		height: 100,
		backgroundColor: 'gray',
		margin: 10,
		borderRadius: 5
	},
	bottomBarItems: {
		flexDirection: 'row',
		backgroundColor: '#6bb003',
		justifyContent: 'space-between',
		height: 45,
		marginTop: 20
	},
	addCartText: {
		color: 'white',
		padding: 12,
		fontSize: 15
	},
	backgroundImage: {
		alignItems: 'center',
		width: '100%',
		height: '35%'
	}
});

export default connect(
	state => ({
		userData: state.userData,
		cartData: state.cartData
	}),
	{
		getUserData: Actions.getUserData,

		setCartData: Actions.setCartData,
		fetchCartData: Actions.fetchCartData
	}
)(CartScreen);

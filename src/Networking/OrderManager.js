import APIClient from './APIClient';
import { ORDER } from './EndPoint';

export default class OrderManager {
	static addToCart({
		userId: userId,
		cartId: cartId,
		kitchenId: kitchenId,
		foodId: foodId,
		quantity: quantity,
		amount: amount,
		taxAmount: taxAmount,
		totalAmount: totalAmount
	}) {
		console.warn(userId, cartId, kitchenId, foodId, quantity, amount, taxAmount, totalAmount);

		if (cartId == undefined) {
			cartId = '';
		}

		return APIClient.post(ORDER.ADD_TO_CART, {
			user_id: userId,
			cart_id: cartId,
			kitchen_id: kitchenId,
			food_id: foodId,
			quantity: quantity,
			amount: amount,
			tax_amount: taxAmount,
			total_amount: totalAmount
		});
	}
	static getCartDetail(userId) {
		return APIClient.post(ORDER.CART_LIST, {
			user_id: userId
		});
	}
	static placeOrder(userId, cartId, kitchenId) {
		return APIClient.post(ORDER.PLACE_ORDER, {
			user_id: userId,
			cart_id: cartId,
			kitchen_id: kitchenId
		});
	}
	static deleteCartItem(userId, cartItemId) {
		return APIClient.post(ORDER.DELETE_CART_ITEM, {
			user_id: userId,
			cart_item_id: cartItemId
		});
	}
	static emptyCart(userId) {
		return APIClient.post(ORDER.DELETE_CART_ITEM, {
			user_id: userId
		});
	}
	static getPastOrderList(userId) {
		return APIClient.post(ORDER.GET_PAST_ORDER_LIST, {
			user_id: userId
		});
	}
	static getUpcomingOrderList(userId) {
		return APIClient.post(ORDER.GET_UPCOMING_ORDER_LIST, {
			user_id: userId
		});
	}
}

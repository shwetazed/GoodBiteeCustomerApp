import APIClient from './APIClient';
import { PROMO_CODE } from './EndPoint';

export default class PromoCodeManager {
	static getPromoCodeList(userId, kitchenId, foodId) {
		return APIClient.post(PROMO_CODE.PROMO_CODE_LIST, {
			user_id: userId,
			kitchen_id: kitchenId,
			food_id: foodId
		});
	}
	static applyPromoCode(offerId, userId, kitchenId, totalAmount, promoCode) {
		console.warn('In Manager ', offerId, userId, kitchenId, totalAmount, promoCode);
		return APIClient.post(PROMO_CODE.APPLY_PROMO_CODE, {
			user_id: userId,
			kitchen_id: kitchenId,
			offer_id: offerId,
			total_amount: totalAmount,
			promo_code: promoCode
		});
	}
}

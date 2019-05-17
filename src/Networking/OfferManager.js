import APIClient from './APIClient';
import { OFFER } from './EndPoint';

export default class OfferManager {
	static getOfferList(userId) {
		return APIClient.post(OFFER.OFFER_LIST, {
			user_id: userId
		});
	}

	static getKitchenOfferList(kitchenId) {
		return APIClient.post(OFFER.KITCHEN_OFFER_LIST, {
			kitchen_id: kitchenId
		});
	}
	static deleteOffer(offerId) {
		return APIClient.post(OFFER.DELETE_OFFER, {
			id: offerId
		});
	}
}

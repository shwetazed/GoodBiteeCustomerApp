import APIClient from './APIClient';
import { CATEGORY } from './EndPoint';

export default class KitchenCategoryManager {
	static getMainCategory(userId, kitchenId) {
		return APIClient.post(CATEGORY.GET_MAIN_CATEGORY, {
			user_id: userId,
			kitchen_id: kitchenId
		});
	}
	static getKitchenCategory(userId, kitchenId) {
		console.warn(userId, kitchenId);

		return APIClient.post(CATEGORY.GET_KITCHEN_CATEGORY, {
			user_id: userId,
			kitchen_id: kitchenId
		});
	}
	static updateKitchenCategory(userId, kitchenId, categoryIds) {
		console.warn(userId, kitchenId, categoryIds);

		return APIClient.post(CATEGORY.UPDATE_KITCHEN_CATEGORY, {
			user_id: userId,
			kitchen_id: kitchenId,
			category_ids: categoryIds
		});
	}
}

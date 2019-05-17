import APIClient from './APIClient';
import { CATEGORY } from './EndPoint';

export default class CategoryManager {
	static getCategory(userId, parentId) {
		console.warn(userId, parentId);

		//return APIClient.get(CATEGORY.GET_CATEGORY.sformat(userId, parentId));

		return APIClient.post(CATEGORY.GET_CATEGORY, {
			user_id: userId,
			parent_id: parentId
		});
	}

	static getAllHomeKitchenList(userId) {
		return APIClient.post(CATEGORY.HOME_ALL_KITCHEN_LIST, {
			user_id: userId
		});
	}
}

import APIClient from './APIClient';
import { KITCHEN } from './EndPoint';

export default class CategoryManager {
	static getKitchenList(userId, categoryId) {
		console.warn(userId, categoryId);

		return APIClient.post(KITCHEN.GET_KITCHEN, {
			user_id: userId,
			category_id: categoryId
		});
	}
	static searchKitchen(userId, searchTerm) {
		return APIClient.post(KITCHEN.SEARCH_KITCHEN, {
			user_id: userId,
			keyword: searchTerm
		});
	}
}

import APIClient from './APIClient';
import { FOOD } from './EndPoint';

export default class FoodManager {
	static getFoodList(userId, kitchenId) {
		console.warn(userId, kitchenId);
		return APIClient.post(FOOD.FOOD_LIST, {
			user_id: userId,
			kitchen_id: kitchenId
		});
	}
	static getFoodDetail(userId, foodId) {
		console.warn(userId, foodId);
		return APIClient.post(FOOD.FOOD_DETAIL, {
			user_id: userId,
			id: foodId
		});
	}
	static searchFood(userId, kitchenId, searchTerm) {
		console.warn(userId, kitchenId, searchTerm);

		return APIClient.post(FOOD.SEARCH_FOOD, {
			user_id: userId,
			kitchen_id: kitchenId,
			search_term: searchTerm
		});
	}
	static addFood(param) {
		return APIClient.multiPart(FOOD.ADD_FOOD, {
			param
		});
	}
	static deleteFood(userId, foodId) {
		return APIClient.post(FOOD.DELETE_FOOD, {
			user_id: userId,
			id: foodId
		});
	}
	static foodSearch(userId, kitchenId, keyword) {
		return APIClient.post(FOOD.SEARCH_FOOD, {
			user_id: userId,
			kitchen_id: kitchenId,
			keyword: keyword
		});
	}
}

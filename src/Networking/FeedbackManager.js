import APIClient from './APIClient';
import { FEEDBACK } from './EndPoint';

export default class FeedbackManager {
	static addReview(userId, kitchenId, reviewMessage, starRating, foodId) {
		console.warn(userId, kitchenId, reviewMessage, starRating, foodId);

		return APIClient.post(FEEDBACK.ADD_REVIEW, {
			user_id: userId,
			kitchen_id: kitchenId,
			review: reviewMessage,
			rating: starRating,
			food_id: foodId
		});
	}
}

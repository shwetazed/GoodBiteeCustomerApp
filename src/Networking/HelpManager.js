import APIClient from './APIClient';
import { HELP } from './EndPoint';

export default class HelpManager {
	static getHelpList(id) {
		return APIClient.post(HELP.HELP_LIST, {
			type: id
		});
	}
	static getHelpQuestionsList(helpId) {
		console.warn('In Help manager ', helpId);
		return APIClient.post(HELP.HELP_QUESTIONS_LIST, {
			id: helpId
		});
	}

	static getHelpQuestionsDetail(userId, questionId) {
		return APIClient.post(HELP.HELP_QUESTIONS_DETAIL, {
			user_id: userId,
			help_id: questionId
		});
	}

	static sendFeedback(userId, helpId, questionId) {
		return APIClient.post(HELP.SEND_FEEDBACK, {
			user_id: userId,
			id: questionId,
			help_id: helpId
		});
	}

	static sendUserFeedback(userId, questionId, feedback) {
		return APIClient.post(HELP.SEND_FEEDBACK, {
			user_id: userId,
			id: questionId,
			feedback: feedback
		});
	}
	static getLastOrder(id) {
		return APIClient.post(HELP.LAST_ORDER, {
			user_id: id
		});
	}
}

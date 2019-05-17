import APIClient from './APIClient';
import { MESSAGE } from './EndPoint';

export default class MessageManager {
	static getChatList(id) {
		return APIClient.post(MESSAGE.CHAT_LIST, {
			user_id: id
		});
	}

	static sendMessage(receiverId, senderId, message) {
		return APIClient.post(MESSAGE.SEND_CHAT, {
			//chat_id: 3,
			sender_id: senderId,
			receiver_id: receiverId,
			msg_text: message
		});
	}

	static startMessage(userId) {
		return APIClient.post(MESSAGE.START_CHAT, {
			user_id: userId
		});
	}
	static getSupportMessageList(userId) {
		return APIClient.post(MESSAGE.CHAT_DETAIL, {
			user_id: userId
		});
	}
}

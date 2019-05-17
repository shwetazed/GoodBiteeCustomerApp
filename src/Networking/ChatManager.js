import APIClient from './APIClient';
import { CHAT } from './EndPoint';

export default class ChatManager {
	static getChatList(id) {
		return APIClient.post(HELP.HELP_LIST, {
			type: id
		});
	}
}

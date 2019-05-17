import APIClient from './APIClient';
import { ABOUT } from './EndPoint';

export default class AboutManager {
	static getAboutUs() {
		return APIClient.post(ABOUT.ABOUT_US);
	}
}

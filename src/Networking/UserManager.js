/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import APIClient from './APIClient';
import { USER } from './EndPoint';
import { Config } from '@Core/Config';

export default class UserManger {
	// static getReservations(userID, date) {
	// 	return APIClient.get(RESERVATION.FETCH.sformat(date, userID));
	// }
	static loginUser(email, password) {
		console.warn(email, password);

		return APIClient.post(USER.LOGIN, {
			email: email,
			password: password,
			role_id: Config.ROLE_ID
		});
	}

	static logoutUser(userId) {
		console.warn(userId);

		return APIClient.post(USER.LOGOUT, {
			user_id: userId
		});
	}

	static signUpUser(fullName, mobile, email, password) {
		console.warn(fullName, mobile, email, password);

		return APIClient.post(USER.SIGN_UP, {
			full_name: fullName,
			mobile: mobile,
			email: email,
			password: password,
			role_id: Config.ROLE_ID
		});
	}
	static socialSignUpUser({ fullName: fullName, appId: appId, email: email, type: type }) {
		console.warn(fullName, appId, email, type);

		return APIClient.post(USER.SOCIAL_SIGN_UP, {
			full_name: fullName,
			app_id: appId,
			mobile: mobile,
			email: email,
			signup_type: type,
			role_id: Config.ROLE_ID
		});
	}

	static kitchenSignUpUser(param) {
		return APIClient.multiPart(USER.KITCHEN_REGISTRATION, {
			param
		});
	}

	static getUserDetail(userId) {
		return APIClient.post(USER.GET_PROFILE, {
			user_id: userId
		});
	}
	static updateUserImage(userId, image) {
		console.warn(userId, image);

		const formData = new FormData();

		formData.append('user_id', userId);
		// let s = JSON.stringify({ uri: image.sourceURL, name: image.filename, type: image.type });
		// formData.append('image', s);

		formData.append('image', {
			uri: image.sourceURL,
			type: image.mime,
			name: image.filename
		});

		return APIClient.post(USER.UPLOAD_USER_IMAGE, formData);

		// const formData = new FormData();

		// formData.append(
		// 	'data',
		// 	JSON.stringify({
		// 		fullName: fullName,
		// 		mobile: mobile,
		// 		email: email,
		// 		password: password,
		// 		realm: realm
		// 	})
		// );
		// formData.append({ image: {} });

		// return APIClient.post(USER.SIGN_UP, formData);
	}
	createFormData = (photo, body) => {
		const data = new FormData();

		data.append('photo', {
			name: photo.fileName,
			type: photo.type,
			uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
		});

		Object.keys(body).forEach(key => {
			data.append(key, body[key]);
		});

		return data;
	};
	static setUserDetail(userId, label, value) {
		return APIClient.post(USER.UPDATE_PROFILE, {
			id: userId,
			[label]: value
		});
	}
}

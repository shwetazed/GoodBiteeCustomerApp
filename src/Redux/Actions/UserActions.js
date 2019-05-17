/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import { USER_PROFILE_UPDATE_ACTION, SET_PROFILE_UPDATE_ACTION, GET_PROFILE_PROFILE_ACTION } from '../ReduxTypes';
import UserManager from '@Networking/UserManager';
import { GET_LOCAL_DATA, SAVE_LOCAL_DATA } from '@Core/Storage';
import { Config } from '@Core/Config';

export const fetchUserData = (USER_ID = () => {}) => {
	return dispatch => {
		UserManager.getUserDetail(Config.USER_ID)
			.then(response => {
				console.warn('response', response);

				Config.USER_ID = response.id;
				SAVE_LOCAL_DATA('USER', response);
				dispatch(setUserData(response));
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
};

// export const fetchUserData = (cb = () => {}) => {
// 	return (dispatch, getState) => {
// 		UserManager.getUserDetail(getState().userData.id)
// 			.then(response => {
// 				cb(response);
// 				dispatch(setUserData(response));
// 			})
// 			.catch(error => {
// 				cb(null, error);
// 				console.warn('error:', error);
// 			});
// 	};
// };

export const getUserData = (payload = null) => ({ type: GET_PROFILE_PROFILE_ACTION, payload });
export const setUserData = (payload = null) => ({ type: SET_PROFILE_UPDATE_ACTION, payload });
export const updateUserData = (payload = null) => ({ type: USER_PROFILE_UPDATE_ACTION, payload });

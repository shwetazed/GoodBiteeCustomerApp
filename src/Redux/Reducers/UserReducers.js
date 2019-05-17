/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import {
	USER_PROFILE_UPDATE_ACTION,
	USER_PROFILE_UPDATE_KEY_ACTION,
	SET_PROFILE_UPDATE_ACTION,
	GET_PROFILE_PROFILE_ACTION,
	USER_STORE
} from '../ReduxTypes';

const INIT_VALUES = {
	[USER_STORE]: {}
};

export default (state, action) => {
	console.warn('state', state);
	console.warn('action', action);

	switch (action.type) {
		case GET_PROFILE_PROFILE_ACTION: {
			return { [USER_STORE]: state[USER_STORE] };
		}
		case USER_PROFILE_UPDATE_ACTION:
			return { [USER_STORE]: action.payload };
		case SET_PROFILE_UPDATE_ACTION:
			return { [USER_STORE]: action.payload };
		case USER_PROFILE_UPDATE_KEY_ACTION: {
			const newUserData = {
				...state[USER_STORE],
				[action.payload.key]: action.payload.data
			};
			return { [USER_STORE]: newUserData };
		}

		default:
			return state ? {} : INIT_VALUES;
	}
};

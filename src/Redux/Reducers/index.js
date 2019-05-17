/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import Reactotron from 'reactotron-react-native';
import UserReducers from './UserReducers';
import AddressReducers from './AddressReducers';
import KitchenProfileReducers from './KitchenProfileReducers';
import CartReducers from './CartReducers';

export default (state, action = {}) => {
	const newState = {
		...state,
		...UserReducers(state, action),
		...AddressReducers(state, action),
		...KitchenProfileReducers(state, action),
		...CartReducers(state, action)
	};

	if (__DEV__) {
		Reactotron.display({
			name: 'Action',
			value: { ...action, oldState: state, newState },
			preview: action.type,
			important: true
		});
	}

	return newState;
};

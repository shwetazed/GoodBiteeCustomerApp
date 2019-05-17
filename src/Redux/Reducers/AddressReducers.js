import {
	SET_ADDRESS_ACTION,
	USER_ADDRESS_UPDATE_ACTION,
	USER_ADDRESS_STORE,
	SET_HOME_ADDRESS_ACTION,
	USER_HOME_ADDRESS_STORE
} from '../ReduxTypes';

const INIT_VALUES = {
	[USER_ADDRESS_STORE]: [],
	[USER_HOME_ADDRESS_STORE]: []
};
export default (state, action) => {
	console.warn('action', action);
	console.warn('state', state);

	switch (action.type) {
		case SET_ADDRESS_ACTION:
			return { [USER_ADDRESS_STORE]: action.payload };
		case SET_HOME_ADDRESS_ACTION:
			return { [USER_HOME_ADDRESS_STORE]: action.payload };
		case USER_ADDRESS_UPDATE_ACTION:
			return { [USER_ADDRESS_STORE]: action.payload };

		default:
			return state ? {} : INIT_VALUES;
	}
};

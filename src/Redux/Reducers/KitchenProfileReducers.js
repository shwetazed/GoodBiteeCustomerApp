import { KITCHEN_PROFILE_UPDATE_ACTION, SET_KITCHEN_PROFILE_ACTION, KITCHEN_STORE } from '../ReduxTypes';

const INIT_VALUES = {
	[KITCHEN_STORE]: {}
};

export default (state, action) => {
	console.warn('state', state);
	console.warn('action', action);

	switch (action.type) {
		case SET_KITCHEN_PROFILE_ACTION:
			return { [KITCHEN_STORE]: action.payload };
		case KITCHEN_PROFILE_UPDATE_ACTION:
			return { [KITCHEN_STORE]: action.payload };
		default:
			return state ? {} : INIT_VALUES;
	}
};

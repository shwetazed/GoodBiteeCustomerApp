import { SET_CART_ACTION, UPDATE_CART_ACTION, CART_STORE } from '../ReduxTypes';
import { SAVE_LOCAL_DATA } from '@Core/Storage';

const INIT_VALUES = {
	[CART_STORE]: []
};
export default (state, action) => {
	console.warn('action', action);
	console.warn('state', state);

	switch (action.type) {
		case SET_CART_ACTION: {
			SAVE_LOCAL_DATA('CART_DATA', action.payload);
			return { [CART_STORE]: action.payload };
		}

		case UPDATE_CART_ACTION:
			return { [CART_STORE]: action.payload };

		default:
			return state ? {} : INIT_VALUES;
	}
};

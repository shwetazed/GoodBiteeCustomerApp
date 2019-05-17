import { SET_CART_ACTION, UPDATE_CART_ACTION } from '../ReduxTypes';
import OrderManager from '@Networking/OrderManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { Config } from '@Core/Config';

export const fetchCartData = (USER_ID = () => {}) => {
	return dispatch => {
		OrderManager.getCartDetail(USER_ID)
			.then(response => {
				console.warn('response', response);
				dispatch(setCartData(response));
			})
			.catch(error => {
				//console.warn('error:', error);
			});
	};
};

export const setCartData = (payload = null) => ({ type: SET_CART_ACTION, payload });
export const updateCartData = (payload = null) => ({ type: UPDATE_CART_ACTION, payload });

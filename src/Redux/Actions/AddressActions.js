import { USER_ADDRESS_UPDATE_ACTION, SET_ADDRESS_ACTION, SET_HOME_ADDRESS_ACTION } from '../ReduxTypes';
import AddressManager from '@Networking/AddressManager';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { Config } from '@Core/Config';

export const fetchAddressData = (cb = () => {}) => {
	return dispatch => {
		AddressManager.getAllAddresses(Config.USER_ID)
			.then(response => {
				cb(response);

				dispatch(setUserAddressData(response.UserAddress));
			})
			.catch(error => {
				cb(null, error);
				console.warn('error:', error);
			});
	};
};
export const fetchHomeAddressData = (cb = () => {}) => {
	return dispatch => {
		AddressManager.getAllAddresses(Config.USER_ID)
			.then(response => {
				cb(response);
				let data = response.UserAddress.filter(function(item) {
					return item.address_type == '1' || item.address_type == '2';
				});
				console.warn('userData', data);

				dispatch(setHomeWorkAddressData(data));
			})
			.catch(error => {
				cb(null, error);
				console.warn('error:', error);
			});
	};
};
export const setHomeWorkAddressData = (payload = null) => ({ type: SET_HOME_ADDRESS_ACTION, payload });
export const setUserAddressData = (payload = null) => ({ type: SET_ADDRESS_ACTION, payload });
export const updateUserAddressData = (payload = null) => ({ type: USER_ADDRESS_UPDATE_ACTION, payload });

import { KITCHEN_PROFILE_UPDATE_ACTION, SET_KITCHEN_PROFILE_ACTION } from '../ReduxTypes';
import UserManager from '@Networking/UserManager';

export const fetchKitchenProfileData = (cb = () => {}) => {
	return (dispatch, getState) => {
		UserManager.getUserDetail(getState().userData.id)
			.then(response => {
				cb(response);
				dispatch(setKitchenProfileData(response));
			})
			.catch(error => {
				cb(null, error);
				console.warn('error:', error);
			});
	};
};

export const setKitchenProfileData = (payload = null) => ({ type: SET_KITCHEN_PROFILE_ACTION, payload });
export const updateKitchenProfileData = (payload = null) => ({ type: KITCHEN_PROFILE_UPDATE_ACTION, payload });

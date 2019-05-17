/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import APIClient from './APIClient';
//import { RESERVATION } from './EndPoint';
import { ADDRESS } from './EndPoint';

export default class AddressManager {
	static getAllAddresses(userId) {
		return APIClient.post(ADDRESS.ADDRESS_LIST, {
			user_id: userId
		});
	}

	static addAddress(
		userId,
		address,
		country,
		state,
		city,
		zip,
		apartment,
		businessName,
		deliveryNote,
		addressId,
		addressType
	) {
		return APIClient.post(ADDRESS.ADD_ADDRESS, {
			user_id: userId,
			address1: address,
			country: country,
			state: state,
			city: city,
			zip: '302022',
			appartment_no: apartment,
			business_name: businessName,
			delivery_note: deliveryNote,
			address_type: addressType,
			is_default: '1',
			id: addressId
		});
	}
	static deleteAddress(userId, addressId) {
		return APIClient.post(ADDRESS.DELETE_ADDRESS, {
			user_id: userId,
			id: addressId
		});
	}
}

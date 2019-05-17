/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

// const baseURL = ({ env = 'sandbox' } = {}) => {
// 	return 'http://goodbitee.com/web_services/';
// };
const baseURL = 'http://goodbitee.com/web_services/';

const USER = {
	LOGIN: 'login',
	SIGN_UP: 'signup',
	SOCIAL_SIGN_UP: 'social_signup',
	GET_PROFILE: 'get_user_by_id',
	UPDATE_PROFILE: 'update_user_profile',
	CHANGE_PASSWORD: 'change_password',
	KITCHEN_REGISTRATION: 'kitchen_signup',
	KITCHEN_GET_PROFILE: '',
	KITCHEN_UPDATE_PROFILE: '',
	UPLOAD_USER_IMAGE: 'update_user_image',
	UPLOAD_KITCHEN_IMAGE: 'update_kitchen_image',
	LOGOUT: 'logout'
};
const CATEGORY = {
	GET_CATEGORY: 'get_all_categories',
	HOME_ALL_KITCHEN_LIST: 'home_category_kitchen_list',
	GET_MAIN_CATEGORY: 'main_kitchen_category_list',
	GET_KITCHEN_CATEGORY: 'kitchen_category_list',
	UPDATE_KITCHEN_CATEGORY: 'kitchen_category_update'
	//GET_CATEGORY: 'get_all_categories?user_id={0}&parent_id={1}'
};
const KITCHEN = {
	GET_KITCHEN: 'kitchen_list',
	SEARCH_KITCHEN: 'kitchen_search'
};
const FEEDBACK = {
	ADD_REVIEW: 'add_review'
};
const FOOD = {
	FOOD_LIST: 'food_list',
	ADD_FOOD: 'add_food',
	FOOD_DETAIL: 'food_detail',
	DELETE_FOOD: 'delete_food',
	UPLOAD_FOOD_IMAGE: 'update_food_image',
	ADD_FOOD_ATTRIBUTE: 'add_food_attributes',
	SEARCH_FOOD: 'food_search_by_kitchen_id'
};
const ORDER = {
	ADD_TO_CART: 'add_to_cart',
	DELETE_CART_ITEM: 'delete_cart',
	CART_LIST: 'get_cart_detail',
	PLACE_ORDER: 'place_order',
	GET_PAST_ORDER_LIST: 'past_order_list',
	GET_UPCOMING_ORDER_LIST: 'upcoming_order_list',
	CANCEL_ORDER: '',
	EMPTY_CART: 'empty_cart',
	REMOVE_ITEM: 'delete_cart_item',
	PAST_ORDERS: 'past_orders'
};
const ADDRESS = {
	ADD_ADDRESS: 'add_address',
	ADDRESS_LIST: 'get_all_address_by_user_id',
	DELETE_ADDRESS: 'delete_address'
};
const MESSAGE = {
	START_CHAT: 'start_chat',
	SEND_CHAT: 'add_message',
	CHAT_LIST: 'chat_list',
	CHAT_DETAIL: 'date_wise_list_msg_by_user_id',
	DELETE_CHAT: 'delete_chat'
};
const RESERVATION = {
	FETCH: 'get_reservation_ipad?MethodName=get_reservation_ipad&date={0}&user_id={1}'
};
const HELP = {
	GET_ORDER_ISSUE: 'order_issue',
	HELP_LIST: 'help_category_list',
	HELP_QUESTIONS_LIST: 'help_question_list',
	HELP_QUESTIONS_DETAIL: 'help_question_detail',
	SEND_FEEDBACK: 'add_customer_help_feedback',
	LAST_ORDER: 'last_order'
};
const ABOUT = {
	ABOUT_US: 'about_us'
};
const OFFER = {
	OFFER_LIST: 'offer_list',
	KITCHEN_OFFER_LIST: 'kitchen_offer_list',
	ADD_OFFER: 'add_offer',
	DELETE_OFFER: 'delete_offer',
	OFFER_DETAIL: 'offer_detail'
};
const PROMO_CODE = {
	PROMO_CODE_LIST: 'customer_running_offer',
	APPLY_PROMO_CODE: 'apply_promo_code'
};

module.exports = {
	baseURL,
	USER,
	RESERVATION,
	CATEGORY,
	KITCHEN,
	FOOD,
	ORDER,
	ADDRESS,
	MESSAGE,
	HELP,
	OFFER,
	FEEDBACK,
	ABOUT,
	PROMO_CODE
};

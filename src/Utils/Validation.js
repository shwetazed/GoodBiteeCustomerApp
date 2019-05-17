import { DISPLAY_ALERT, ALERT_TITLE } from './Alert';

function IS_EMAIL_EMPTY(text) {
	if (text.length === 0) {
		DISPLAY_ALERT(ALERT_TITLE, 'Email is empty');
		return true;
	} else {
		return false;
	}
}
function IS_EMAIL_VALID(text) {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (reg.test(text) === false) {
		DISPLAY_ALERT(ALERT_TITLE, 'Email is invalid');
		return false;
	} else {
		return true;
	}
}
function PASSWORD_LIMIT(text) {
	if (text.length < 6) {
		DISPLAY_ALERT(ALERT_TITLE, 'Password should be minimum 6 digits');
		return false;
	} else {
		return true;
	}
}

module.exports = {
	IS_EMAIL_EMPTY,
	IS_EMAIL_VALID,
	PASSWORD_LIMIT
};

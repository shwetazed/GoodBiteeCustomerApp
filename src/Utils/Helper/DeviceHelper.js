import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export function responsiveWidth(size, screen = 375) {
	return Math.round((SCREEN_WIDTH * size) / screen);
}

export function responsiveHeight(size, screen = 667) {
	return Math.round((SCREEN_HEIGHT * size) / screen);
}

export function maintainRatio(a, b, c) {
	// a:b = c :d => d = b*c/a
	return Math.round((b * c) / a);
}

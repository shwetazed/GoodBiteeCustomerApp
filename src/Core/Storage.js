import { AsyncStorage } from 'react-native';
import { Picker } from 'native-base';

/*const SAVE_LOCAL_DATA = async (key, object) => {
	try {
		console.warn(object);
		
		await AsyncStorage.setItem(key, JSON.stringify(object));
	} catch (error) {
		console.warn('error', error);
		// Error saving data
	}
};*/

const SAVE_LOCAL_DATA = async (key, object, mutate = false) => {
	try {
		//console.warn(object);
		const oldData = await GET_LOCAL_DATA(key);
		console.log('oldData', oldData);
		console.log('object', object);

		if (!!oldData) {
			object = { ...oldData, ...object };

			console.log('object 1', object);
		}
		await AsyncStorage.setItem(key, JSON.stringify(object));
	} catch (error) {
		console.warn('error', error);
		// Error saving data
	}
};

const SAVE_PROFILE_PIC = async (key, data) => {
	try {
		// const oldData = await GET_PROFILE_PIC(key);
		// if (!!oldData) {
		// 	object = { ...oldData, ...object };
		// }
		await AsyncStorage.setItem(key, JSON.stringify(data));
		console.warn('SAVING IMAGE IS.....', JSON.stringify(data));
	} catch (error) {
		console.warn('error', error);
	}
};

async function GET_PROFILE_PIC(key) {
	try {
		const user_image = await AsyncStorage.getItem(key);
		let parsedImage = JSON.parse(user_image);
		//let parsedValue = JSON.parse(value);
		if (parsedImage !== null) {
			// We have data!!
			return parsedImage;
		}
		//let parsedValue = JSON.parse(value);
	} catch (error) {
		// Error retrieving data
	}
}

async function GET_LOCAL_DATA(key) {
	try {
		const value = await AsyncStorage.getItem(key);
		let parsed = JSON.parse(value);
		//let parsedValue = JSON.parse(value);
		if (parsed !== null) {
			// We have data!!
			return parsed;
		}
	} catch (error) {
		// Error retrieving data
	}
}

async function SAVE_DATA(key, object) {
	//SAVE_LOCAL_DATA('FIRST', 1);
	await AsyncStorage.setItem(key, JSON.stringify(object));
	console.warn('saved values are ', object);
}

async function GET_DATA(key) {
	return await AsyncStorage.getItem(key);
}

module.exports = {
	SAVE_LOCAL_DATA,
	GET_LOCAL_DATA,
	SAVE_PROFILE_PIC,
	GET_PROFILE_PIC,
	SAVE_DATA,
	GET_DATA
};

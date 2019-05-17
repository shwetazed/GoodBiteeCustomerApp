import { Alert } from 'react-native';

export const ALERT_TITLE = 'Good Bitee';

export function DISPLAY_ALERT(alertTitle, AlertMessage) {
	Alert.alert(alertTitle, AlertMessage);
}

export function AlertBox(alertTitle, AlertMessage) {
	Alert.alert(
		alertTitle,
		AlertMessage,
		[
			{
				text: 'OK',
				onPress: () => {
					this.props.navigation.navigate('WelcomeScreen');
				}
			}
		],
		{ cancelable: false }
	);
}

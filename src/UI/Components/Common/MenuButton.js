import React from 'react';
import { StyleSheet } from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuButton extends React.Component {
	render() {
		return (
			<View />
			// <Icon
			// 	name="md-menu"
			// 	color="#0000000"
			// 	size={32}
			// 	style={styles.menuIcon}
			// 	onPress={() => this.props.navigation.toggleDrawer()}
			// />
		);
	}
}
const styles = StyleSheet.create({
	menuIcon: {
		zIndex: 9,
		position: 'absolute',
		top: 40,
		left: 20
	}
});

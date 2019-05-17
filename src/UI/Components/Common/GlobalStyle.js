import { Platform } from 'react-native';
var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
	parentView1: {
		width: '100%',
		height: Platform.OS === 'ios' ? 40 : 50,
		backgroundColor: '#f5f5f5',
		alignSelf: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10
		//flex: 0
		//padding: '1%'
	},
	parentView2: {
		width: '100%',
		height: Platform.OS === 'ios' ? '7%' : '8%',
		backgroundColor: '#f5f5f5',
		//flex: 0,
		flexDirection: 'row',
		//alignItems: 'center',
		justifyContent: 'center',
		//justifyContent: 'space-between',
		borderRadius: 10
		//padding: '1%'
	}
});

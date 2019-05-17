import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
	return (
		<View style={styles.offlineContainer}>
			<Text style={styles.offlineText}>No Internet Connection</Text>
		</View>
	);
}

export default class OffLineNotice extends PureComponent {
	state = {
		isConnected: true
	};

	componentDidMount() {
		//console.warn('componentDidMount');

		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
	}

	componentWillUnmount() {
		//console.warn('componentWillUnmount');
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
	}

	handleConnectivityChange = isConnected => {
		//console.warn('handleConnectivityChange', isConnected);

		if (isConnected) {
			this.setState({ isConnected });
			//console.warn('connected');
		} else {
			this.setState({ isConnected });
			//console.warn('disconnected');
		}
	};

	// componentDidMount() {
	// 	NetInfo.isConnected.addEventListener('change', this.onConnectionChange);
	// 	//NetInfo.removeEventListener('change', this.onConnectionChange);
	// }

	// componentWillUnmount() {
	// 	NetInfo.removeEventListener('change', this.onConnectionChange);
	// }
	// componentWillMount() {
	// 	console.warn('call will mount method');
	// 	//NetInfo.isConnected.addEventListener('change', this.onConnectionChange);
	// }
	// componentWillUpdate() {
	// 	console.warn('call will update method');
	// }
	// componentDidUpdate() {
	// 	console.warn('call did Update method');
	// }

	// componentWillReceiveProps() {
	// 	console.warn('call will receive props method');
	// }

	// onConnectionChange = connected => {
	// 	this.setState({ isConnected: connected });
	// };

	render() {
		console.warn('render');
		if (!this.state.isConnected) {
			return <MiniOfflineSign />;
		}
		return null;
		// return (
		// 	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		// 		<Text>{this.state.isConnected ? 'online' : 'offline'}</Text>
		// 	</View>
		// );
	}
}

const styles = StyleSheet.create({
	offlineContainer: {
		backgroundColor: '#b52424',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		position: 'absolute',
		top: 30
	},
	offlineText: { color: '#fff' }
});

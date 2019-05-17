// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Platform, ScrollView, Animated } from 'react-native';

// const HEADER_MIN_HEIGHT = 50;
// const HEADER_MAX_HEIGHT = 200;

// export default class TabShow extends Component {
// 	constructor() {
// 		super();

// 		this.scrollYAnimatedValue = new Animated.Value(0);

// 		this.array = [];
// 	}

// 	componentWillMount() {
// 		for (var i = 1; i <= 50; i++) {
// 			this.array.push(i);
// 		}
// 	}

// 	render() {
// 		const headerHeight = this.scrollYAnimatedValue.interpolate({
// 			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
// 			outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
// 			extrapolate: 'clamp'
// 		});

// 		const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
// 			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
// 			outputRange: ['tomato', '#01579B'],
// 			extrapolate: 'clamp'
// 		});

// 		return (
// 			<View style={styles.container}>
// 				<ScrollView
// 					contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
// 					scrollEventThrottle={16}
// 					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }])}
// 				>
// 					{this.array.map((item, key) => (
// 						<View key={key} style={styles.item}>
// 							<Text style={styles.itemText}>Row {item}</Text>
// 						</View>
// 					))}
// 				</ScrollView>

// 				<Animated.View
// 					style={[styles.animatedHeader, { height: headerHeight, backgroundColor: headerBackgroundColor }]}
// 				>
// 					<Text style={styles.headerText}>Animated Header</Text>
// 				</Animated.View>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingTop: Platform.OS == 'ios' ? 20 : 0
// 	},

// 	animatedHeader: {
// 		position: 'absolute',
// 		top: Platform.OS == 'ios' ? 20 : 0,
// 		left: 0,
// 		right: 0,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},

// 	headerText: {
// 		color: 'white',
// 		fontSize: 22
// 	},

// 	item: {
// 		backgroundColor: '#E0E0E0',
// 		margin: 8,
// 		height: 45,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},

// 	itemText: {
// 		color: 'black',
// 		fontSize: 16
// 	}
// });

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Animated } from 'react-native';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
var count = 0;
export default class TabShow extends Component {
	constructor() {
		super();
		this.state = { status: false };
		this.scrollYAnimatedValue = new Animated.Value(0);

		this.array = [];
	}

	componentWillMount() {
		for (var i = 1; i <= 50; i++) {
			this.array.push(i);
		}
	}

	change() {
		// count++;
		// if (count == 1) {
		// 	console.log('when count is 1 ', count);
		// }
		// 	this.setState({ status: true });
		console.warn('In change method ');

		Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]);
	}

	render() {
		// const headerHeight = this.scrollYAnimatedValue.interpolate({
		// 	inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		// 	outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		// 	extrapolate: 'clamp'
		// });

		// const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
		// 	inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		// 	outputRange: ['tomato', '#01579B'],
		// 	extrapolate: 'clamp'
		// });

		const headerHeight = this.scrollYAnimatedValue.interpolate({
			inputRange: [0, 10],
			outputRange: [50, 50],
			extrapolate: 'clamp'
		});

		const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
			inputRange: [0, 50],
			outputRange: ['tomato', '#01579B'],
			extrapolate: 'clamp'
		});

		return (
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={{ paddingTop: 60 }}
					scrollEventThrottle={16}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }])}
				>
					{this.array.map((item, key) => (
						<View key={key} style={styles.item}>
							<Text style={styles.itemText}>Row {item}</Text>
						</View>
					))}
				</ScrollView>

				<Animated.View
					style={[styles.animatedHeader, { height: headerHeight, backgroundColor: headerBackgroundColor }]}
				>
					<Text style={styles.headerText}>Animated Header</Text>
				</Animated.View>
				{/* {this.state.status == true ? (
					<Animated.View
						style={[styles.animatedHeader, { height: headerHeight, backgroundColor: headerBackgroundColor }]}
					>
						<Text style={styles.headerText}>Animated Header</Text>
					</Animated.View>
				) : (
					<Animated.View style={[styles.animatedHeader]}>
						<Text style={styles.headerText}>Animated Header</Text>
					</Animated.View>
				)} */}
				{/* <Animated.View style={[styles.animatedHeader]}>
					<Text style={styles.headerText}>Animated Header</Text>
				</Animated.View> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS == 'ios' ? 20 : 0,
		backgroundColor: 'black'
	},

	animatedHeader: {
		position: 'absolute',
		top: Platform.OS == 'ios' ? 30 : 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},

	headerText: {
		color: 'white',
		fontSize: 22
	},

	item: {
		backgroundColor: '#E0E0E0',
		margin: 8,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center'
	},

	itemText: {
		color: 'black',
		fontSize: 16
	}
});

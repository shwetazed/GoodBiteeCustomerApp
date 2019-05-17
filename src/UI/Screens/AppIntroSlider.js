import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Images from '@res/Images';

const slides = [
	{
		key: 'somethun',
		title: 'Title 1',
		text: 'Description.\nSay something cool',
		image: { uri: 'http://placeimg.com/640/480/any' },
		backgroundColor: '#59b2ab'
	},
	{
		key: 'somethun-dos',
		title: 'Title 2',
		text: 'Other cool stuff',
		image: { uri: 'http://placeimg.com/640/480/any' },
		backgroundColor: '#febe29'
	},
	{
		key: 'somethun1',
		title: 'Rocket guy',
		text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
		image: { uri: 'http://placeimg.com/640/480/any' },
		backgroundColor: '#22bcb5'
	}
];

export default class SliderImageEx extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showRealApp: false
		};
	}

	_renderItem = item => {
		return (
			<View style={styles.slide}>
				<Text style={styles.title}>{item.title}</Text>
				<Image source={item.image} style={{ width: '94%', height: '50%', alignSelf: 'center' }} />
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};
	_onDone = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		this.setState({ showRealApp: true });
	};
	render() {
		if (this.state.showRealApp) {
			return <SliderImageEx />;
		} else {
			return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} />;
		}
	}
}
const styles = StyleSheet.create({
	slide: { flex: 1 },
	title: { color: 'black', fontWeight: 'bold' },
	text: { color: 'black' }
});
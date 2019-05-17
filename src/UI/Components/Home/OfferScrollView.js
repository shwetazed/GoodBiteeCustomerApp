// import React, { Component } from 'react';
// import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
// import PageController from '../Home/PageController';
// import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../Utils/Helper/DeviceHelper';
// export default class OfferScrollView extends Component {
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<ScrollView
// 					horizontal={true}
// 					showsHorizontalScrollIndicator={false}
// 					pagingEnabled={true}
// 					showsVerticalScrollIndicator={true}
// 					bounces={false}
// 				>
// 					<View style={styles.innerContainer}>
// 						<Image style={styles.image} source={require('@res/Images/VegImage.jpeg')} />
// 						<Image style={styles.image} source={require('@res/Images/VegImage.jpeg')} />
// 						<Image style={styles.image} source={require('@res/Images/VegImage.jpeg')} />
// 						<Image style={styles.image} source={require('@res/Images/VegImage.jpeg')} />
// 						<Image style={styles.image} source={require('@res/Images/VegImage.jpeg')} />
// 					</View>
// 				</ScrollView>
// 				<PageController />
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		borderRadius: 10,
// 		flexDirection: 'row',
// 		// width: SCREEN_WIDTH - 30,
// 		width: '100%',
// 		height: 220,
// 		marginTop: 10,
// 		marginLeft: 15
// 		// marginRight: 15
// 	},
// 	innerContainer: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		flexDirection: 'row',
// 		width: '100%',
// 		height: '100%'
// 	},

// 	image: {
// 		height: 220,
// 		width: SCREEN_WIDTH - 30,
// 		borderRadius: 10
// 	}
// });
import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import * as color from '@Utils/colors';
const { width } = Dimensions.get('window');
const loading = require('@Images/loading.gif');
var SampleArray = [];
const styles = {
	wrapper: {},

	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderRadius: 40
	},
	image: {
		width: '100%',
		height: '100%',
		backgroundColor: 'transparent',
		borderRadius: 10,
		alignSelf: 'center'
	},

	loadingView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		borderRadius: 10,
		backgroundColor: 'rgba(0,0,0,.5)'
	},

	loadingImage: {
		width: 60,
		height: 60
	}
};

const Slide = props => {
	return (
		<View style={styles.slide}>
			<Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
			{!props.loaded && (
				<View style={styles.loadingView}>
					<Image style={styles.loadingImage} source={loading} />
				</View>
			)}
		</View>
	);
};
const array = [];
export default class OfferScrollView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// imgList: [
			// 	'https://placeimg.com/640/640/nature',
			// 	'https://placeimg.com/640/640/people',
			// 	'https://placeimg.com/640/640/animals',
			// 	'https://placeimg.com/640/640/beer'
			// ],
			imgList: ['', '', '', ''],

			loadQueue: [0, 0, 0, 0]
		};
		this.loadHandle = this.loadHandle.bind(this);
	}
	loadHandle(i) {
		let loadQueue = this.state.loadQueue;
		loadQueue[i] = 1;
		this.setState({
			loadQueue
		});
	}

	filterImages = () => {};

	AddImagesToArray = () => {
		SampleArray.push(this.state.image.toString());
	};
	componentDidMount() {
		this.setState({ imgList: ['', '', '', ''] });
		this.getImages();
	}

	async getImages() {
		try {
			const imageCall = await fetch('http://goodbitee.com/web_services/get_slider_image');
			const slider = await imageCall.json();
			//console.warn('RESPONSE ', slider.Slider);
			slider.Slider.map(data => {
				array.push(data.image);
			});
			console.warn('getting array image data ', array);
			this.setState({ imgList: array });
		} catch (error) {
			console.warn(error);
		}
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
				<View style={{ height: 250, width: '94%', overflow: 'hidden' }}>
					<Swiper
						autoplay
						// loadMinimal
						// loadMinimalSize={1}
						// loop={false}
						paginationStyle={{ bottom: 10 }}
						dot={
							<View
								style={{
									backgroundColor: 'rgba(255,255,255,.3)',
									width: 13,
									height: 13,
									borderRadius: 7,
									marginLeft: 7,
									marginRight: 7
								}}
							/>
						}
						activeDot={
							<View
								style={{
									backgroundColor: color.green,
									width: 13,
									height: 13,
									borderRadius: 7,
									marginLeft: 7,
									marginRight: 7
								}}
							/>
						}
					>
						{this.state.imgList.map((item, i) => (
							<Slide loadHandle={this.loadHandle} loaded={!!this.state.loadQueue[i]} uri={item} i={i} key={i} />
						))}
					</Swiper>
				</View>
			</View>
		);
	}
}

// import React, { Component } from 'react';
// import { Text, View, Image, Dimensions } from 'react-native';
// import Swiper from 'react-native-swiper';
// const { width } = Dimensions.get('window');
// const loading = require('@Images/loading.gif');

// const styles = {
// 	wrapper: {},

// 	slide: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		backgroundColor: 'transparent',
// 		borderRadius: 40
// 	},
// 	image: {
// 		width: '100%',
// 		height: '100%',
// 		backgroundColor: 'transparent',
// 		borderRadius: 20,
// 		alignSelf: 'center'
// 	},

// 	loadingView: {
// 		position: 'absolute',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		left: 0,
// 		right: 0,
// 		top: 0,
// 		bottom: 0,
// 		backgroundColor: 'rgba(0,0,0,.5)'
// 	},

// 	loadingImage: {
// 		width: 60,
// 		height: 60
// 	}
// };

// const Slide = props => {
// 	return (
// 		<View style={styles.slide}>
// 			<Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
// 			{!props.loaded && (
// 				<View style={styles.loadingView}>
// 					<Image style={styles.loadingImage} source={loading} />
// 				</View>
// 			)}
// 		</View>
// 	);
// };

// export default class SliderImagesEx extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			imgList: [
// 				'https://placeimg.com/640/640/nature',
// 				'https://placeimg.com/640/640/people',
// 				'https://placeimg.com/640/640/animals',
// 				'https://placeimg.com/640/640/beer'
// 			],
// 			loadQueue: [0, 0, 0, 0]
// 		};
// 		this.loadHandle = this.loadHandle.bind(this);
// 	}
// 	loadHandle(i) {
// 		let loadQueue = this.state.loadQueue;
// 		loadQueue[i] = 1;
// 		this.setState({
// 			loadQueue
// 		});
// 	}
// 	render() {
// 		return (
// 			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// 				<View style={{ height: 250, width: '96%' }}>
// 					<Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={false}>
// 						{this.state.imgList.map((item, i) => (
// 							<Slide loadHandle={this.loadHandle} loaded={!!this.state.loadQueue[i]} uri={item} i={i} key={i} />
// 						))}
// 					</Swiper>
// 				</View>
// 			</View>
// 		);
// 	}
// }

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Slider, Dimensions } from 'react-native';
import * as colors from '@Utils/colors';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class MySliderEx extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//Initial Value of slider
			slideValue: 60,
			max: 90,
			min: 60
		};
	}

	render() {
		selectValues = val => {
			if (val == 60) {
				this.setState({ slideValue: 60 });
			} else if (val > 60 && val <= 65) {
				this.setState({ slideValue: 60 });
			} else if (val > 65 && val <= 70) {
				this.setState({ slideValue: 70 });
			} else if (val > 70 && val <= 75) {
				this.setState({ slideValue: 70 });
			} else if (val > 75 && val <= 80) {
				if (val < 76) {
					this.setState({ slideValue: 70 });
				} else {
					this.setState({ slideValue: 80 });
				}
			} else if (val > 80 && val < 85) {
				this.setState({ slideValue: 80 });
			} else if (val > 85 || val < 86) {
				if (val < 86) {
					this.setState({ slideValue: 80 });
				} else {
					this.setState({ slideValue: 90 });
				}
			}
		};

		// selectValues = val => {
		// 	if (val == 60) {
		// 		this.setState({ slideValue: 60 });
		// 	} else if (val > 60 && val <= 70) {
		// 		this.setState({ slideValue: 70 });
		// 	} else if (val > 70 && val <= 80) {
		// 		this.setState({ slideValue: 80 });
		// 	} else if (val > 80 && val <= 90) {
		// 		this.setState({ slideValue: 90 });
		// 	}
		// };

		tintMove = val => {
			val;
		};

		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={{ alignSelf: 'center', flex: 0 }}>
					<View
						style={{
							//height: responsiveHeight(20),
							flexDirection: 'row',
							//borderWidth: 1,
							...Platform.select({ ios: { top: '9%' }, android: { top: '5%', marginLeft: '3%' } })

							//justifyContent: 'space-between',
						}}
					>
						<Text style={styles.rangeValues}>$60</Text>
						<View style={{ width: responsiveWidth(45) }} />
						<Text style={styles.rangeValues}>$70</Text>
						<View style={{ width: responsiveWidth(45) }} />
						<Text style={styles.rangeValues}>$80</Text>
						<View style={{ width: responsiveWidth(55) }} />
						<Text style={styles.rangeValues}>$80+</Text>
					</View>

					<View
						style={{
							height: responsiveHeight(25),
							flexDirection: 'row',
							//borderWidth: 1,
							borderColor: 'yellow',
							//justifyContent: 'space-between',
							...Platform.select({
								ios: { top: responsiveHeight(30) },
								android: { top: responsiveHeight(23) }
							})
						}}
					>
						<View style={[styles.range, styles.range2]} />
						<View
							style={{
								...Platform.select({ ios: { width: responsiveWidth(87) }, android: { width: responsiveWidth(75) } })
							}}
						/>
						<View style={styles.range} />
						<View
							style={{
								...Platform.select({ ios: { width: responsiveWidth(66) }, android: { width: responsiveWidth(64) } })
							}}
						/>
						<View style={styles.range} />
						<View
							style={{
								...Platform.select({ ios: { width: responsiveWidth(87) }, android: { width: responsiveWidth(78) } })
							}}
						/>
						<View style={[styles.range, styles.range3]} />
					</View>

					{/* <Slider
						minimumTrackTintColor={colors.green}
						thumbTintColor={colors.green}
						//thumbStyle={{ backgroundColor: 'red' }}
						thumbTintColor={colors.green}
						trackStyle={{
							height: 15
						}}
						step={1}
						width={responsiveWidth(250)}
						value={this.state.slideValue}
						minimumValue={60}
						maximumValue={90}
						onValueChange={slideValue => {
							selectValues(slideValue);
						}}

						//borderWidth={1}
					/> */}

					<Slider
						minimumTrackTintColor={colors.green}
						thumbTintColor={colors.green}
						trackStyle={{
							height: 15
						}}
						step={1}
						width={responsiveWidth(250)}
						value={this.state.slideValue}
						minimumValue={this.state.min}
						maximumValue={this.state.max}
						onValueChange={slideValue => {
							selectValues(slideValue);
						}}
						//onSlidingComplete={}

						//borderWidth={1}
					/>
				</View>
				<Text>{this.state.slideValue}</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		//alignContent: 'center',
		margin: '3%',
		borderWidth: 1
	},

	range: {
		height: '40%',
		borderWidth: 1,
		borderColor: 'grey'
	},
	rangeValues: {
		color: 'black',
		fontSize: 15
	},
	range2: {
		...Platform.select({ android: { marginLeft: responsiveWidth(13) } })
	},
	range3: {
		...Platform.select({
			android: {
				marginRight: responsiveWidth(10)
			}
		})
	}
});

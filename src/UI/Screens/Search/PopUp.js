import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider, Dimensions, Platform, Image, ScrollView, Animated } from 'react-native';
import Button from '@Components/Common/Button';
import * as colors from '@Utils/colors';
import MySlider from '@Components/Slider/MySlider';
import PricePopup from '@Components/SortPopup/PricePopup';
import Sort from '@Components/SortPopup/Sort';
import Dietory from '@Components/SortPopup/Dietory';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

// function maintainRatio(a, b, c) {
// 	// a:b = c :d => d = b*c/a
// 	return Math.round((b * c) / a);
// }
const popUpLength = responsiveHeight(280);
const popUpElementsLength = responsiveHeight(220);

const viewWidth = SCREEN_WIDTH - 40;

export default class PopUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortt: true,
			price: false,
			dietory: false,
			popup: responsiveHeight(280),
			popupView: responsiveHeight(220)
		};
	}
	handleScroll = event => {
		const offset = event.nativeEvent.contentOffset.x;
		var page = Math.round(offset / viewWidth) + 1;

		console.log('page', page);

		if (page == 1) {
			this.setState({ sortt: true, price: false, dietory: false });
		} else if (page == 2) {
			this.setState({ sortt: false, price: true, dietory: false });
		} else {
			this.setState({ sortt: false, price: false, dietory: true });
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ color: 'white' }}>X</Text>
					<Text style={{ color: 'white' }}>Reset</Text>
				</View>
				<View
					style={
						this.state.sortt == true
							? [styles.popUp, { height: 257 }]
							: this.state.dietory == true
							? [styles.popUp, { height: 312 }]
							: styles.popUp
					}
				>
					<View
						style={
							this.state.sortt == true
								? [styles.popupView, { height: 193 }]
								: this.state.dietory == true
								? [styles.popupView, { height: 245 }]
								: styles.popupView
						}
					>
						<View style={styles.buttonView}>
							<View style={styles.buttonGap} />
							{this.state.sortt ? (
								<Button
									background={colors.lighter_gray}
									text={colors.green}
									title="Sort"
									buttonType="small"
									// onPressButton={() => {
									// 	//this.refs.scroll.scrollTo({ x: width - 40 });
									// 	this.setState({ sortt: false, price: false, dietory: false });
									// }}
								/>
							) : (
								<Button
									background={colors.green}
									text="white"
									title="Sort"
									buttonType="small"
									onPressButton={() => {
										this.refs.scroll.scrollTo({ x: 0 });
										this.setState({ sortt: true, price: false, dietory: false });
									}}
								/>
							)}
							<View style={styles.buttonGap} />
							{this.state.price ? (
								<Button
									background={colors.lighter_gray}
									text={colors.green}
									title="Price"
									buttonType="small"
									// onPressButton={() => {
									// 	this.setState({ sortt: false, price: false, dietory: false });
									// }}
								/>
							) : (
								<Button
									background={colors.green}
									text="white"
									title="Price"
									buttonType="small"
									onPressButton={() => {
										this.refs.scroll.scrollTo({ x: viewWidth });
										this.setState({ sortt: false, price: true, dietory: false });
									}}
								/>
							)}
							<View style={styles.buttonGap} />
							{this.state.dietory ? (
								<Button
									background={colors.lighter_gray}
									text={colors.green}
									title="Dietory"
									buttonType="small"
									// onPressButton={() => {
									// 	this.setState({ sortt: false, price: false, dietory: false });
									// }}
								/>
							) : (
								<Button
									background={colors.green}
									text="white"
									title="Dietory"
									buttonType="small"
									onPressButton={() => {
										this.refs.scroll.scrollTo({ x: viewWidth * 2 });
										this.setState({ sortt: false, price: false, dietory: true });
									}}
								/>
							)}
						</View>

						<ScrollView
							ref={scrollView => {
								this.scrollView = scrollView;
							}}
							style={{}}
							pagingEnabled={true}
							horizontal={true}
							decelerationRate={0}
							snapToInterval={SCREEN_WIDTH - 40}
							snapToAlignment={'center'}
							showsHorizontalScrollIndicator={false}
							bounces={false}
							ref={'scroll'}
							onMomentumScrollEnd={this.handleScroll.bind(this)}
						>
							<View style={{ width: viewWidth, height: '100%' }}>
								<Sort />
							</View>
							<View style={{ width: viewWidth, height: '100%' }}>
								<PricePopup />
							</View>
							<View style={{ width: viewWidth, height: '100%' }}>
								<Dietory />
							</View>
						</ScrollView>
					</View>
					<View style={styles.gap} />
					<Button
						background={colors.green}
						text="white"
						title="Done"
						buttonType="bigPopup"
						onPressButton={this.props.onPressButton}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		//alignContent: 'center',
		margin: '3%'
		//padding: 5,
		//borderWidth: 1
	},

	popUp: {
		//height: popUpLength,
		height: 330,
		borderWidth: 1,
		borderRadius: 10,
		//alignSelf: 'center',
		backgroundColor: 'white'
	},
	popupView: {
		//height: popUpElementsLength,
		height: 264,
		padding: '2%'
		//borderWidth: 1
	},
	range: {
		height: '40%',
		borderWidth: 1,
		borderColor: 'grey'
	},
	rangeValues: {
		color: 'grey'
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
	},
	buttonView: {
		//height: responsiveHeight(30),
		width: '100%',
		height: 35,
		//borderWidth: 1,
		flexDirection: 'row',
		paddingLeft: 3
		//justifyContent: 'center'
	},
	buttonGap: { width: '1%' },
	priceImagesView: {
		height: responsiveHeight(35),
		//borderWidth: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	saperator: {
		width: responsiveWidth(25)
	},
	gap: { height: responsiveHeight(8) },
	priceImages: {
		//position: 'absolute',
		//top: 0,
		width: '10%',
		height: '100%',
		resizeMode: 'contain'
		//borderWidth: 1
	},
	view: {
		marginTop: 100,
		backgroundColor: 'blue',
		width: SCREEN_WIDTH - 80,
		margin: 10,
		height: 200,
		borderRadius: 10
		//paddingHorizontal : 30
	},
	view2: {
		marginTop: 100,
		backgroundColor: 'red',
		width: SCREEN_WIDTH - 80,
		margin: 10,
		height: 200,
		borderRadius: 10
		//paddingHorizontal : 30
	}
});

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Slider, Dimensions } from 'react-native';
import * as colors from '@Utils/colors';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

export default class MySlider extends Component {
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

		return (
			<View>
				<View style={{ alignSelf: 'center' }}>
					{/* <Text>{this.state.slideValue}</Text> */}
					<View
						style={{
							//height: responsiveHeight(20),
							flexDirection: 'row',
							//borderWidth: 1,
							...Platform.select({ ios: { top: 16 }, android: { top: 10, marginLeft: '3%' } })

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
							//height: 25,
							flexDirection: 'row',
							//borderWidth: 1,
							borderColor: 'yellow',

							//justifyContent: 'space-between',
							...Platform.select({
								ios: { top: responsiveHeight(15) },
								android: { top: responsiveHeight(8) }
							})
						}}
					>
						<View style={[styles.range, styles.range2]} />
						<View
							style={{
								...Platform.select({ ios: { width: responsiveWidth(84) }, android: { width: responsiveWidth(72) } })
							}}
						/>
						<View style={styles.range} />
						<View
							style={{
								...Platform.select({ ios: { width: responsiveWidth(74) }, android: { width: responsiveWidth(72) } })
							}}
						/>
						<View style={styles.range} />
						<View
							style={{
								...Platform.select({
									ios: { width: responsiveWidth(82) },
									android: { width: responsiveWidth(73) }
								})
							}}
						/>
						<View style={[styles.range, styles.range3]} />
					</View>

					<Slider
						style={{ bottom: 18 }}
						minimumTrackTintColor={colors.green}
						thumbTintColor={colors.green}
						animationType="timing"
						// thumbTouchSize: { width: 40, height: 40 }
						// debugTouchArea: false
						//animationType: 'timing'
						trackStyle={{
							height: 20
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
					/>

					{/* <Slider
						style={{ bottom: 18 }}
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

						//borderWidth={1}
					/> */}
				</View>
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

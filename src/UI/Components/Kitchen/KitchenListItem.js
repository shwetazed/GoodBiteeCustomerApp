import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';

let height = 260;

export default class KitchenListItem extends Component {
	render() {
		return (
			<View style={styles.MainContainer}>
				<View>
					{this.props.item.image_original_url == '' ? (
						<Image style={styles.imageContainer} source={require('@res/Images/listLoader.gif')} />
					) : (
						<Image style={styles.imageContainer} source={{ uri: this.props.item.image_original_url }} />
					)}

					<View style={{ height: 3 }} />
					{this.props.item.kitchen_name == '' || undefined ? null : <Text>{this.props.item.kitchen_name}</Text>}

					<View style={{ height: 3 }} />

					{this.props.item.description == '' || undefined ? null : <Text>{this.props.item.description}</Text>}

					<View style={{ height: 3 }} />

					<View style={styles.bottomContainer}>
						{this.props.item.arrival_time == '' ? null : (
							<View>
								<View style={styles.textStyle}>
									<Text>{this.props.item.arrival_time}</Text>
								</View>
							</View>
						)}

						{this.props.item.rating == '' ? null : (
							<View style={[styles.textStyle, { flexDirection: 'row', alignItems: 'center' }]}>
								<Text>{this.props.item.rating}</Text>
								<View style={{ width: 4 }} />
								<View style={styles.rateStyle}>
									<Image
										style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
										source={require('@res/Images/star.png')}
									/>
								</View>
								<View style={{ width: 4 }} />
								<Text>
									(<Text>{this.props.item.review_count}</Text>)
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		width: SCREEN_WIDTH - 20,
		//height: height,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		margin: 10
	},
	imageContainer: {
		//justifyContent: 'center',
		//margin: 5,
		width: SCREEN_WIDTH - 50,
		height: 150,
		borderRadius: 10
		//resizeMode: 'contain'
	},
	bottomContainer: {
		flexDirection: 'row',

		//width: SCREEN_WIDTH - 20,
		width: '100%'
		//borderWidth: 1,
		//height: 25
	},
	textStyle: {
		backgroundColor: '#F5F5F5',
		//height: '100%',
		alignItems: 'center',
		width: 80,
		padding: 2,
		marginRight: 8,
		//borderWidth: 1,
		justifyContent: 'center'
	},
	rateStyle: {
		height: 12,
		width: 12
	}
});

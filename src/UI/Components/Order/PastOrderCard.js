import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Constant, Image } from 'react-native';

export default class PastOrderCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<View
					style={{
						width: '100%',
						height: 210,
						alignSelf: 'center',
						shadowColor: '#000',
						shadowOffset: {
							width: 1,
							height: 1
						},
						shadowOpacity: 0.4,
						shadowRadius: 1.41,
						elevation: 2,
						backgroundColor: 'white'
					}}
				>
					<TouchableOpacity onPress={this.props.onPressButton}>
						<Image
							style={{ width: '100%', height: '70%' }}
							//resizeMode="contain"
							source={require('@res/Images/VegImage.jpeg')}
						/>
						<View style={{ height: '5%', width: '100%' }} />
						<View style={{ height: '10%', width: '100%', flexDirection: 'row' }}>
							<View
								style={{
									flex: 0.7,
									height: '100%',

									justifyContent: 'center',
									paddingLeft: 15
								}}
							>
								<Text>{this.props.name}</Text>
							</View>
							<View
								style={{
									flex: 0.3,
									height: '100%',

									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Text>{this.props.price}</Text>
							</View>
						</View>

						<View
							style={{
								width: '100%',
								height: '10%',

								//justifyContent: 'center',
								paddingLeft: 15
							}}
						>
							<Text>{this.props.time}</Text>
						</View>
						<View style={{ height: '5%', width: '100%' }} />
					</TouchableOpacity>
				</View>
				<View style={{ height: '.5%' }} />
			</View>
		);
	}
}

import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import * as colors from '@Utils/colors';
import { ScrollView } from 'react-native-gesture-handler';

export default class ViewReceiptDialogueBox extends Component {
	constructor(props) {
		super(props);
		this.state = { itemCount: 1, itemName: 'Food Name', cost: '60.00$' };
	}

	render() {
		console.warn('item', this.props.item);
		return (
			// <View style={styles.container}>
			<View style={this.props.item.Food.length <= 2 ? styles.box : [styles.box, { height: 350 }]}>
				{/* <Text>Hello</Text> */}
				<ImageBackground
					source={require('@res/Images/headerBg.png')}
					style={{ width: '100%', height: '70%', resizeMode: 'contain', flex: 1 }}
				>
					<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', flex: 3 }}>
							<Text style={{ color: 'white' }}>Order Receipt</Text>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<TouchableOpacity onPress={this.props.onPressButton}>
								<Text style={styles.cross}>x</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.boxContent}>
						{this.props.item.Food.length <= 2 ? (
							this.props.item.Food.map(items => {
								return (
									<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
										<View style={styles.foodName}>
											<Text style={styles.itemCount}>{items.quantity}</Text>
											<Text style={[styles.itemCount, { borderWidth: 0 }]}>x</Text>

											<View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
												<Text>{items.food_name}</Text>
												<Text style={{ color: colors.green }}>{items.total_amount}</Text>
											</View>
										</View>
									</View>
								);
							})
						) : (
							<ScrollView style={{ borderWidth: 1, borderColor: '#f5f5f5', height: 30 }}>
								{this.props.item.Food.map(items => {
									return (
										<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
											<View style={styles.foodName}>
												<Text style={styles.itemCount}>{items.quantity}</Text>
												<Text style={[styles.itemCount, { borderWidth: 0 }]}>x</Text>

												<View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
													<Text>{items.food_name}</Text>
													<Text style={{ color: colors.green }}>{items.amount}</Text>
												</View>
											</View>
										</View>
									);
								})}
							</ScrollView>
						)}

						<View
							style={{
								borderWidth: 0.5,
								borderColor: colors.gray,
								width: '100%',
								marginTop: 10,
								marginBottom: 5
							}}
						/>

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ marginLeft: 35, color: colors.gray }}>Sub Total</Text>
							<Text style={{ color: colors.green, marginRight: 5 }}>{this.props.item.final_amount}</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								flex: 0,
								marginTop: 10
							}}
						>
							<Text style={{ marginLeft: 35, color: colors.gray }}>Delivery Free</Text>
							{/* <Text style={{ color: colors.green, marginRight: 5 }}>{this.props.item.delivery_fee}</Text> */}
							<Text style={{ color: colors.green, marginRight: 5 }}>00</Text>
						</View>

						<View
							style={{
								borderWidth: 0.5,
								borderColor: colors.gray,
								width: '100%',
								marginTop: 10,
								marginBottom: 5
							}}
						/>

						<View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0 }}>
							<Text style={{ marginLeft: 35, color: colors.black }}>Total</Text>
							<Text style={{ color: colors.green, marginRight: 5 }}>{this.props.item.final_amount}</Text>
						</View>
						<View
							style={{
								borderWidth: 0.5,
								borderColor: colors.gray,
								width: '100%',
								marginTop: 10,
								marginBottom: 5
							}}
						/>

						<View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
							<TouchableOpacity
								onPress={this.props.onPressButton}
								style={{
									width: '50%',
									height: 40,
									borderColor: colors.green,
									borderWidth: 1,
									borderRadius: 20,
									alignContent: 'center',
									justifyContent: 'center',
									marginTop: 10
								}}
							>
								<Text style={{ color: colors.green, alignSelf: 'center' }}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
			// </View>
		);
	}
}
const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	//marginTop: '50%',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	borderWidth: 1,
	// 	backgroundColor: 'rgba(0, 0, 0, 0.6)'
	// },
	box: {
		width: '80%',
		height: 300,
		//height: 350,
		//flex: 0.3,
		borderWidth: 1,

		borderRadius: 10,
		backgroundColor: '#fff'

		//overflow: 'hidden'
	},
	cross: {
		color: 'white',
		borderColor: 'white',
		borderRadius: 4,
		borderWidth: 1,
		paddingLeft: 5,
		paddingRight: 5,
		marginRight: 10
	},
	boxContent: {
		//marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
		margin: 5,
		backgroundColor: 'white',
		flex: 5,
		height: '90%',
		shadowColor: '#000',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 10
	},
	foodName: {
		flexDirection: 'row',
		flex: 1,
		marginLeft: 5,
		marginRight: 5

		//justifyContent: 'space-between'
	},
	itemCount: {
		borderWidth: 1,
		borderColor: colors.green,
		color: colors.green,
		borderRadius: 5,
		paddingLeft: 5,
		paddingRight: 5
	}
});

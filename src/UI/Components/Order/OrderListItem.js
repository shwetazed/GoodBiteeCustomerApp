import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Images from '@Images';
import BackgroundImage from '@Components/Common/BackgroundImage';

export default class OrderListItem extends Component {
	render() {
		console.warn('here Food ', this.props.item.Food);
		return (
			<View style={styles.containerView}>
				<View style={styles.cardContainer}>
					<Image style={styles.image} source={{ uri: this.props.item.image_thumb_url }} />
					<View style={styles.kitchenTitleContainer}>
						<Image style={{ padding: 5, width: 20, height: 20 }} source={require('@res/Images/right_green.png')} />
						<Text style={styles.textStyle}>{this.props.item.kitchen_name}</Text>
					</View>
					<View style={styles.gap} />

					<View style={styles.gap} />

					<View style={{ width: '100%' }}>
						<View style={[styles.rowViewContainer, { height: 20 }]}>
							<Image style={{ margin: 10, width: 20, height: 20 }} source={require('@res/Images/order_done.png')} />

							<Text style={styles.textStyle}>{this.props.item.order_status}</Text>
						</View>
						<View style={[styles.textContainer, { paddingLeft: 40 }]}>
							{/* <Text style={styles.textStyle}>{this.props.item.order_status}</Text> */}
							<Text style={styles.textStyle}>{this.props.item.order_created_date}</Text>
							<Text style={styles.textStyle}>{this.props.item.order_unique_id}</Text>
							{/* <Text style={styles.textStyle}>{this.props.item.order_number}</Text> */}
						</View>
					</View>

					<View style={styles.gap} />
					<Image style={{ width: '90%', height: 1, backgroundColor: '#F5F5F5' }} />
					<View style={styles.gap} />
					{/* here we put delivery boy name */}
					{this.props.item.Food.map(data => {
						return (
							<View>
								<View style={styles.rowViewContainer}>
									{/* <Image
							style={{ margin: 5, width: 20, height: 20, marginTop: 2 }}
							source={require('@res/Images/right_green.png')}
						/> */}
									<View style={{ width: 10 }} />
									<View
										style={{ height: 20, width: 20, backgroundColor: '#f5f5f5', alignItems: 'center', borderWidth: 1 }}
									>
										<Text style={{ color: 'black' }}>{data.quantity}</Text>
									</View>
									<View style={{ width: 10 }} />

									<View style={[styles.textContainer, { marginTop: 2 }]}>
										<Text style={[styles.textStyle, { paddingTop: 0 }]}>{data.food_name}</Text>
									</View>
								</View>
								<View style={styles.gap} />
							</View>
						);
					})}

					<View style={styles.gap} />
					<Image style={{ width: '90%', height: 1, backgroundColor: '#F5F5F5' }} />
					<View style={styles.gap} />
					{/* here we put delivery boy */}
					<View style={styles.rowViewContainer}>
						<View style={{ width: 10 }} />
						<Image style={{ width: 20, height: 20 }} source={require('@res/Images/delivery_boy.png')} />
						<View style={{ width: 10 }} />
						<View style={styles.textContainer}>
							<Text style={styles.textStyle}>no body</Text>
							{/* <Text style={styles.textStyle}>{this.props.item.delivery_boy}</Text> */}
						</View>
					</View>

					<View style={styles.gap} />
					<Image style={{ width: '90%', height: 1, backgroundColor: '#F5F5F5' }} />
					<View style={styles.gap} />

					<View
						style={[
							styles.rowViewContainer,
							{ justifyContent: 'space-between', padding: 10, paddingBottom: 5, width: '100%' }
						]}
					>
						<Text style={styles.textStyle}>Total : {this.props.item.final_amount}</Text>
						{this.props.item.isOpen == '0' ? (
							<Text style={styles.textStyle}>Closed</Text>
						) : (
							<Text style={styles.textStyle}>Open</Text>
						)}
					</View>

					<Image style={{ width: '90%', height: 1, backgroundColor: '#F5F5F5', margin: 10 }} />

					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={this.props.onViewReceiptClick}>
							<Text>View Receipt</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={this.props.onGetHelpClick}>
							<Text>Get Help</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		justifyContent: 'flex-start',
		//alignItems: 'center',
		//marginTop: 10,
		marginBottom: 10
	},
	cardContainer: {
		width: '95%',
		padding: 10,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3
		//alignItems: 'center'
	},
	kitchenTitleContainer: {
		width: '90%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 5,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		alignItems: 'center',
		margin: 10,
		marginTop: -20,
		flexDirection: 'row',
		paddingLeft: 10
	},
	image: {
		margin: 10,
		width: '95%',
		height: 100,
		alignSelf: 'center'
	},
	rowViewContainer: {
		width: '100%',

		flexDirection: 'row',
		alignItems: 'center'
	},
	textContainer: {
		width: '80%'
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'row',
		padding: 10,
		height: 50,
		marginBottom: 40
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#F5F5F5',
		color: 'green',
		height: 50,
		alignItems: 'center',
		margin: 7,
		borderRadius: 30
	},
	textStyle: {
		fontSize: 14
		//padding: 5
	},
	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	gap: { height: 5 }
});

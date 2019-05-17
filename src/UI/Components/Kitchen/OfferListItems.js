import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class OfferListItems extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<View style={{ width: '100%', height: 220, alignSelf: 'center' }}>
					{this.props.item.offer_status == 0 ? (
						<TouchableOpacity
							onPress={() => {
								Alert.alert('Goodbitee', 'This offer has been expired on ' + this.props.item.expiry_date_time);
							}}
						>
							<React.Fragment>
								<Image source={{ uri: this.props.item.image_original_url }} style={{ tintColor: 'gray' }} />
								<Image
									style={{ width: '100%', height: '100%', borderRadius: 15, opacity: 0.3 }}
									source={{ uri: this.props.item.image_original_url }}
								/>
							</React.Fragment>
						</TouchableOpacity>
					) : (
						<View>
							{/* <TouchableOpacity
							onLongPress={() => {
								console.warn('Pressed long press');
							}}
							onPress={() => {
								this.props.navigation.push('AddOfferScreen', {
									item: item
								});
							}}
						>
							<Image
								style={{ width: '100%', height: '100%', borderRadius: 15 }}
								source={{ uri: item.image_original_url }}
							/>
						</TouchableOpacity> */}

							<TouchableOpacity
								onPress={() => {
									this.props.navigation.push('AddOfferScreen', { item: item });
								}}
							>
								<ImageBackground
									style={{
										width: '100%',
										height: '100%',
										borderRadius: 15
									}}
									imageStyle={{ borderRadius: 10 }}
									source={{ uri: this.props.item.image_original_url }}
								>
									<TouchableOpacity
										onPress={() => {
											this.onDeleteActionHandler(this.props.item.offer_id);
										}}
									>
										<View style={styles.crossImageView}>
											<Image style={{ height: 30, width: 30 }} source={Images.Cancel.source} />
										</View>
									</TouchableOpacity>
								</ImageBackground>
							</TouchableOpacity>
						</View>
					)}
				</View>
				<View style={{ height: '1%' }} />
			</View>
		);
	}
}

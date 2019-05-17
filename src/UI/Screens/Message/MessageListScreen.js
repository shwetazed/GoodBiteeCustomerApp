import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	FlatList
} from 'react-native';
import Images from '@Images';
import { responsiveWidth, responsiveHeight, maintainRatio, SCREEN_WIDTH } from '@Utils/Helper/DeviceHelper';
import BackgroundImage from '@Components/Common/BackgroundImage';
import MessageListItem from '@Components/Message/MessageListItem';
import Navigation from '@Components/Common/Navigation';

export default class MessageListScreen extends Component {
	render() {
		const { navigation } = this.props;

		return (
			<View style={styles.container}>
				{/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5' }}> */}
				<BackgroundImage />
				<Navigation
					navigation={this.props.navigation}
					title="Support Messages"
					isLeftButtonHide={false}
					letButtonImage={Images.backButton.source}
					rightButtonImage={Images.plusIcon.source}
					isRightButtonHide={true}
				/>

				<View
					style={{
						width: '94%',
						height: '95%',
						backgroundColor: 'white',
						alignSelf: 'center',
						marginTop: 15,

						borderRadius: 10,

						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.3
					}}
				>
					<Text style={{ marginTop: '7%', marginLeft: '4%', fontSize: 14 }}>Archive</Text>
					<View style={{ height: '2%', width: '100%' }} />
					<View
						style={{
							width: '100%',
							height: '95%',
							flexDirection: 'row'
						}}
					>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={[1, 1, 1, 1, 1]}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.push('MessageDetailScreen', {});
									}}
								>
									<MessageListItem>{item.key}</MessageListItem>
									<View style={{ height: '5%', width: '100%' }} />
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#F5FCFF'
	}
});

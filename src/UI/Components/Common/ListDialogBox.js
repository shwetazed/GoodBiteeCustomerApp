import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Platform, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as colors from '@Utils/colors';
import { FlatList } from 'react-native-gesture-handler';

export default class ListDialogBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select: false,
			item_id: null,
			selectedArray: []
		};
	}

	renderSubmitButton = () => {
		if (this.props.selection == 'multi') {
			return (
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							this.props.onPressSelect(this.state.selectedArray);
						}}
						style={{
							width: '50%',
							height: 40,
							borderColor: colors.green,
							borderWidth: 1,
							borderRadius: 20,
							alignContent: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ color: colors.green, alignSelf: 'center' }}>Select</Text>
					</TouchableOpacity>
				</View>
			);
		}
	};
	renderSelectionImage = item => {
		if (this.props.selection == 'multi') {
			if (this.state.selectedArray.includes(item)) {
				return (
					<Image
						style={{ flex: 0.1, height: '100%', resizeMode: 'contain' }}
						source={require('@res/Images/right_green.png')}
					/>
				);
			}
		} else {
			if (this.state.item_id == item) {
				return (
					<Image
						style={{ flex: 0.1, height: '100%', resizeMode: 'contain' }}
						source={require('@res/Images/right_green.png')}
					/>
				);
			}
		}
	};
	renderFlatList = item => {
		if (this.props.selection == 'multi') {
			return <Text style={{ color: 'grey', flex: 0.9 }}>{item.category_name}</Text>;
		} else {
			return <Text style={{ color: 'grey', flex: 0.9 }}>{item}</Text>;
		}
	};
	render() {
		return (
			// <View style={styles.container}>
			<View style={Platform.OS == 'ios' ? styles.box : [styles.box, { flex: 0.4 }]}>
				{/* <Text>Hello</Text> */}
				<ImageBackground
					source={require('@res/Images/headerBg.png')}
					style={{ width: '100%', height: '70%', resizeMode: 'contain', flex: 1 }}
				>
					<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', flex: 3 }}>
							<Text style={{ color: 'white' }}>{this.props.title}</Text>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<TouchableOpacity onPress={this.props.onPressButton}>
								<Text style={styles.cross}>x</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.boxContent}>
						<FlatList
							style={{ flex: 0.8 }}
							data={this.props.dataSource}
							ItemSeparatorComponent={this.FlatListItemSeparator}
							keyExtractor={item => item.toString()}
							renderItem={({ item, index }) => (
								<View>
									<TouchableOpacity
										style={{ flexDirection: 'row' }}
										onPress={() => {
											if (this.props.selection != 'multi') {
												this.setState({ item_id: item });
												this.props.getPopUpItem(item, index);
											} else {
												if (this.state.selectedArray.includes(item)) {
													const valueToRemove = item;
													let values = this.state.selectedArray;
													const array = values.filter(item => item !== valueToRemove);

													this.setState({
														selectedArray: array
													});
												} else {
													let values = this.state.selectedArray;
													values.push(item);

													this.setState({
														selectedArray: values
													});
												}
											}
										}}
									>
										{this.renderFlatList(item)}
										{this.renderSelectionImage(item)}
									</TouchableOpacity>
									<View style={{ height: '20%' }} />
									<View style={{ borderWidth: 0.5, borderColor: '#f5f5f5', width: '100%' }} />
								</View>
							)}
						/>
						{this.renderSubmitButton()}
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
		width: 300,
		height: 200,
		flex: 0.3,
		//borderWidth: 5,

		borderRadius: 10,
		backgroundColor: '#fff',

		overflow: 'hidden'
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
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: '5%',
		margin: 5,
		backgroundColor: 'white',
		flex: 5,
		height: 150,
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

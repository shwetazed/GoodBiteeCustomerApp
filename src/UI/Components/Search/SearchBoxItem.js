import React, { Component } from 'react';
//import rect in our project
import {
	StyleSheet,
	ImageBackground,
	TextInput,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
	TouchableOpacity
} from 'react-native';
//import all the components we will need

export default class SearchBoxItem extends Component {
	render() {
		return (
			//<View style={styles.MainContainer}>

			// <ImageBackground style={{ width: 375, height: 300, justifyContent: 'flex-start' }} source={require('./Good.png')}>
			// 	<Text style={{ margin: 70, color: 'white', alignSelf: 'center', fontSize: 18 }}>Category</Text>

			<View
				style={{
					flexDirection: 'row',
					width: 330,
					height: 45,
					borderRadius: 20,
					backgroundColor: 'white',
					marginTop: 20,
					alignSelf: 'center'
				}}
			>
				<Image
					style={{ resizeMode: 'contain', width: 40, height: 40, marginLeft: 10, marginTop: 5 }}
					source={require('@res/Images/search.png')}
				/>
				<TextInput
					style={styles.searchBar}
					placeholder="What'd you like eat today?"
					value={this.props.value}
					onSubmitEditing={event => this.props.onSubmitSearchHandler(event.nativeEvent.text)}
					onChange={event => this.props.searchHandle(event.nativeEvent.text)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'center',
		flex: 1,
		paddingTop: 30
	},

	searchBar: {
		paddingLeft: 30,
		fontSize: 15,
		height: '100%',
		width: '80%',

		borderColor: '#E4E4E4'
	}
});

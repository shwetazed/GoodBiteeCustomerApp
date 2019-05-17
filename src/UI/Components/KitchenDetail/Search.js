import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.searchBarView}>
				<TextInput
					style={styles.searchBar} // value={this.state.searchText}
					//onChange={this.setSearchText.bind(this)}
					placeholder="Menu"
				/>

				<Image style={styles.searchImage} source={require('@res/Images/search.png')} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	searchBarView: {
		width: '100%',
		flexDirection: 'row',
		height: 55,
		borderWidth: 1,
		borderColor: '#E4E4E4',
		backgroundColor: 'white'
	},
	searchBar: {
		width: '85%',
		fontSize: 17,
		height: '100%',
		marginLeft: 20
		//borderWidth: 1
		//padding: 20
	},
	searchImage: {
		width: 30,
		height: 30,
		paddingRight: 20,
		alignSelf: 'center',
		marginRight: 50
		//borderWidth: 1
	}
});

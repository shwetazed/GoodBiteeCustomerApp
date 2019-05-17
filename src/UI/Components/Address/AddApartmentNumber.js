import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Separator from '@Components/Common/Separator';
import Button from '@Components/Common/Button';
import * as colors from '@Utils/colors';

export default class AddApartmentNumber extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Add Apartment Number',
			title2: 'Ignore'
		};
	}

	render() {
		return (
			//<View style={styles.container}>
			<View style={styles.bottomView}>
				<View style={styles.textView}>
					<Text style={{ fontSize: 20 }}>Add apartment number</Text>
					{/* <Separator style={[this.props.style, { height: '10%' }]} /> */}
					<View style={styles.gap} />
					<Text style={{ lineHeight: 20, marginBottom: 12 }}>{this.props.address}</Text>
				</View>

				<Button buttonType="bigPopup" background="#6bb003" text="#ffffff" title={this.state.title} />
				<View style={styles.gap} />
				<Button
					buttonType="bigPopup"
					background="#e5e5e5"
					text="#6bb003"
					title={this.state.title2}
					onPressButton={this.props.onPressButton}
				/>
			</View>
			//</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
		justifyContent: 'flex-end'
	},
	bottomView: {
		backgroundColor: '#fff',
		height: '32%',
		width: '100%'
		//padding: '4%'
	},
	textView: {
		flex: 0,
		width: '100%',
		//height: '35%',
		backgroundColor: '#fff',
		//borderWidth: 1,
		paddingTop: '4%',
		paddingLeft: '4%',
		paddingRight: '4%'
	},
	gap: {
		height: '5%'
	}
});

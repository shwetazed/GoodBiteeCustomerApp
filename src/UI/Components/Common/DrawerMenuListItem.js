import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Images from '@Images';

export default class DrawerMenuListItem extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					{this.props.children == 'Home' ? (
						<Image style={styles.imageView} source={Images.home.source} />
					) : this.props.children == 'Profile' ? (
						<Image style={styles.imageView} source={Images.name.source} />
					) : this.props.children == 'Orders' ? (
						<Image style={styles.imageView} source={Images.order.source} />
					) : this.props.children == 'Payment' ? (
						<Image style={styles.imageView} source={Images.payment.source} />
					) : this.props.children == 'Help' ? (
						<Image style={styles.imageView} source={Images.help.source} />
					) : this.props.children == 'About' ? (
						<Image style={styles.imageView} source={Images.about.source} />
					) : this.props.children == 'Offers' ? (
						<Image style={styles.imageView} source={Images.promos.source} />
					) : (
						<Image style={styles.imageView} source={Images.logout.source} />
					)}
					{/* <Image style={styles.imageView} source={Images.home.source} /> */}
					<Text style={styles.title}>{this.props.children}</Text>
				</View>
				<Image style={styles.line} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	titleContainer: {
		height: 59,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 10,
		paddingTop: 10
	},
	title: {
		fontSize: 18,
		height: 30,
		margin: 17,
		color: 'gray'
	},

	line: {
		backgroundColor: '#F5F5F5',
		height: 1,
		width: '100%'
	},
	imageView: {
		height: 30,
		width: 30,
		alignSelf: 'center',
		resizeMode: 'contain',
		marginRight: 10
	}
});

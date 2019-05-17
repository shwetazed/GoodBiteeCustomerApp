import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GET_LOCAL_DATA } from '@Core/Storage';
import { connect } from 'react-redux';
import { Actions } from '@Redux';

class BottomBarView extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}

	render() {
		console.warn('render BottomView', this.props.cartData);
		if (this.props.cartData != {}) {
			if (this.props.cartData.Item) {
				if (this.props.cartData.Item.length > 0) {
					return (
						<View style={[styles.bottomBarItems, this.props.style]}>
							<Text style={{ color: 'white', padding: 12, fontSize: 15 }}>{this.props.cartData.item_count}</Text>
							<Text style={{ color: 'white', padding: 12, fontSize: 15 }}>Checkout</Text>
							<Text style={{ color: 'white', padding: 12, fontSize: 15 }}>{this.props.cartData.total_amount}</Text>
						</View>
					);
				}
			}
		}
		return <View style={[styles.hiddenBarItems]} />;
	}
}
const styles = StyleSheet.create({
	bottomBarItems: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#6bb003',
		justifyContent: 'space-between',
		height: 42
	},
	hiddenBarItems: {
		flexDirection: 'row',
		width: '100%',
		height: 0,
		display: 'none'
	}
});
export default connect(
	state => ({
		userData: state.userData,
		cartData: state.cartData
	}),
	{
		setCartData: Actions.setCartData,
		fetchCartData: Actions.fetchCartData
	}
)(BottomBarView);

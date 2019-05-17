/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React from 'react';
import RNSpinner from 'react-native-spinkit';
import { View, Text } from 'react-native';

class Spinner extends React.Component {
	state = {
		isLoading: this.props.isLoading,
		title: this.props.title,
		subTitle: this.props.subTitle,
		showOffline: this.props.showOffline
	};

	show(isLoading, title, subTitle) {
		this.setState({ isLoading, title, subTitle });
	}

	showOffline(showOffline = true) {
		this.setState({ showOffline });
	}

	renderText(title, style) {
		return title ? <Text style={style}>{title}</Text> : null;
	}

	renderSpinner() {
		const styles = this.styleSheet();
		const { viewStyle, titleStyle, subTitleStyle, spinnerProps } = styles;
		return (
			<View style={[viewStyle, this.props.style]}>
				<RNSpinner
					isVisible
					size={spinnerProps.size || this.spinnerProps.size}
					type={spinnerProps.type || this.spinnerProps.type}
					color={spinnerProps.color || this.spinnerProps.color}
				/>
				{this.renderText(this.state.title, titleStyle)}
				{this.renderText(this.state.subTitle, subTitleStyle)}
			</View>
		);
	}

	render() {
		if (this.props.isLoading || this.state.isLoading) {
			return this.renderSpinner();
		}
		return null;
	}

	styleSheet() {
		return {
			viewStyle: {
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: 'rgba(0,0,0,0.7)'
			},
			spinnerProps: {
				color: '#777777',
				type: 'Pulse',
				size: 100
			},
			titleStyle: {
				marginTop: 15,
				textAlign: 'center',
				backgroundColor: 'transparent',
				fontSize: 15
			},
			subTitleStyle: {
				textAlign: 'center',
				marginTop: 5,
				fontStyle: 'italic',
				backgroundColor: 'transparent',
				fontSize: 12
			}
		};
	}
}

export default Spinner;

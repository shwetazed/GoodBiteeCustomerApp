/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import Spinner from '@Components/Common/SPinner';

export default class BaseScreen extends Component {
	showSpinner(isLoading = true, title = this.ls('loadingTitle'), subTitle = this.ls('loaderSubTitle')) {
		if (this.Spinner) {
			this.Spinner.show(isLoading, title, subTitle);
		}
	}

	hideSpinner() {
		this.showSpinner(false);
	}

	renderSpinner(title = 'Loading', subtitle = 'Please wait...') {
		return (
			<Spinner
				ref={o => (this.Spinner = o)}
				title={title}
				subTitle={subtitle}
				offlineRetry={this.onOfflineRetry.bind(this)}
				showAppBackgroundColor={true}
			/>
		);
	}
}

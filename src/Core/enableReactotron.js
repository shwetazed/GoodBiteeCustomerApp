/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import Reactotron, { openInEditor, trackGlobalErrors } from 'reactotron-react-native';
import apiSaucePlugin from 'reactotron-apisauce';

const enableReactotron = function(enable = true, config) {
	if (enable) {
		Reactotron.configure({
			name: 'Reactotron tracking',
			host: '127.0.0.1',
			port: 9090, // android don't forget to `adb reverse tcp:9090 tcp:9090`
			...config
		})
			.useReactNative()
			.use(openInEditor())
			.use(trackGlobalErrors())
			.use(apiSaucePlugin());

		/// Finally
		Reactotron.connect();
		Reactotron.clear();
		console.tron = Reactotron;
	}
};

export default enableReactotron;

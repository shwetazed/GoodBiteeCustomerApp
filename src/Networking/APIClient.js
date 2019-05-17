/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

import { baseURL } from './EndPoint';

let apiClient = null;
class APIClient {
	constructor() {
		// apiClient = axios.create({
		// 	baseURL: baseURL({ env: 'prod' }),
		// 	timeout: 1000
		// });
		apiClient = axios.create({
			baseURL: baseURL,
			timeout: 1000
		});

		// apiClient = axios.create({
		// 	baseURL: baseURL({ env: 'prod' }),
		// 	transformRequest: [
		// 		function(data, headers) {
		// 			headers['Authorization'] = auth();
		// 			return JSON.stringify(data);
		// 		}
		// 	]
		// });
	}

	get(endPoint, { config = null, fullResponse = false } = {}) {
		return new Promise((resolve, reject) => {
			apiClient
				.get(endPoint, config)
				.then(response => this.handleResponse(response, resolve, fullResponse))
				.catch(error => this.handleError(error, reject));
		});
	}

	post(endPoint, params, { config = null, fullResponse = false } = {}) {
		return new Promise((resolve, reject) => {
			apiClient
				.post(endPoint, params, config)
				.then(response => this.handleResponse(response, resolve, fullResponse))
				.catch(error => this.handleError(error, reject));
		});
	}
	multiPart(endPoint, params, { config = null, fullResponse = false } = {}) {
		console.log('multiPart', baseURL + endPoint);
		console.log('params', params);

		return new Promise((resolve, reject) => {
			RNFetchBlob.fetch(
				'POST',
				baseURL + endPoint,
				{
					Authorization: 'Bearer access-token',
					otherHeader: 'foo',
					'Content-Type': 'multipart/form-data'
				},
				params
			)
				.then(response => {
					this.handleResponse(response, resolve, fullResponse);
				})
				.catch(error => this.handleError(error, reject));
		});
	}

	put(endPoint, params, { config = null, fullResponse = false } = {}) {
		return new Promise((resolve, reject) => {
			apiClient
				.put(endPoint, params, config)
				.then(response => this.handleResponse(response, resolve, fullResponse))
				.catch(error => this.handleError(error, reject));
		});
	}

	delete(endPoint, { config = null, fullResponse = false } = {}) {
		return new Promise((resolve, reject) => {
			apiClient
				.delete(endPoint, config)
				.then(response => this.handleResponse(response, resolve, fullResponse))
				.catch(error => this.handleError(error, reject));
		});
	}

	handleResponse(response, resolve, fullResponse = false) {
		resolve(fullResponse ? response : response.data);
	}

	handleError(error, reject) {
		reject(error);
	}
}

const sharedAPIClient = new APIClient();
export default sharedAPIClient;

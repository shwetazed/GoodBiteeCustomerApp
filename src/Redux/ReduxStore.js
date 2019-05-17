/**
 * Copyright (c) 2017-Present, Zed Techno Solution.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Reducers from './Reducers';

const reduxStore = createStore(Reducers, null, applyMiddleware(thunkMiddleware));
export default reduxStore;

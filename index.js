/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import './src/Core/String.proto';
import enableReactotron from './src/Core/enableReactotron';

enableReactotron(__DEV__, {});
console.disableYellowBox = false;
AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './assets/components/redux/store';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore';

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
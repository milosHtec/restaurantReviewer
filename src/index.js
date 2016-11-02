/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss';
import { syncHistoryWithStore } from 'react-router-redux';
import { getRestaurants } from './actions/restaurants.actions';
import { getReviews } from './actions/reviews.actions';
import initialState from './reducers/initialState';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore(initialState);
store.dispatch(getRestaurants());
store.dispatch(getReviews());

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>, document.getElementById('app')
);

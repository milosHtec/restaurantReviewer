import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import RestaurantDetails from './components/restaurant-details/RestaurantDetails';
import NotFoundPage from './components/NotFoundPage.js';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/restaurant/:id" component={RestaurantDetails}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

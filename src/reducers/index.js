import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import restaurantsReducer from './restaurants.reducer';
import reviewsReducer from './reviews.reducer';
import currentUserReducer from './currentUser.reducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    restaurants: restaurantsReducer,
    reviews: reviewsReducer,
    currentUser: currentUserReducer
});

export default rootReducer;

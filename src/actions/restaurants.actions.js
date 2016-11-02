import axios from 'axios';
import * as types from './actionTypes';

export function getRestaurantsSuccess(restaurants) {
    return {type: types.GET_RESTAURANTS_SUCCESS, restaurants};
}

export function addReviewSuccess(review) {
    return {type: types.ADD_REVIEW_SUCCESS, review};
}

export function getRestaurants() {
    return function(dispatch) {
        return axios.get('https://restrest.herokuapp.com/mmilos/restaurant').then(function (response) {
            let restaurants = response.data;
            dispatch(getRestaurantsSuccess(restaurants));
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function addReview(data) {
    return function(dispatch) {
        dispatch(addReviewSuccess(data));
    };
}

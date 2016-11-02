import axios from 'axios';
import * as types from './actionTypes';

export function getReviewsSuccess(reviews) {
    return {type: types.GET_REVIEWS_SUCCESS, reviews};
}

export function addReviewSuccess(review) {
    return {type: types.ADD_REVIEW_SUCCESS, review};
}

export function deleteReviewSuccess(review) {
    return {type: types.DELETE_REVIEW_SUCCESS, review};
}

export function updateReviewSuccess(review) {
    return {type: types.UPDATE_REVIEW_SUCCESS, review};
}

//combining reviews and users
export function getReviews() {
    return function(dispatch) {
        let reviewsPromise = axios.get('https://restrest.herokuapp.com/mmilos/review');
        let usersPromise = axios.get('https://restrest.herokuapp.com/mmilos/user');
        axios.all([reviewsPromise, usersPromise]).then((response) => {
            let reviews = response[0].data,
                users = response[1].data;

            let usersMap = {};
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                usersMap[user._id] = user;
            }
            //review.user is now typeof object (user object) instead of string (user _id)
            for (let y = 0; y < reviews.length; y++) {
                reviews[y].user = usersMap[reviews[y].user] || {_id: null, name: ''};
            }

            dispatch(getReviewsSuccess(reviews));
        });
    };
}

export function addReview(data) {
    return function(dispatch) {
        let date = new Date(),
            payload = Object.assign({}, data, {date: date.toISOString()});
        return axios.post('https://restrest.herokuapp.com/mmilos/review', payload).then(function () {
            dispatch(getReviews()); //get all reviews again to ensure the newest data
        });
    };
}

export function deleteReview(data) {
    return function(dispatch) {
        return axios.delete('https://restrest.herokuapp.com/mmilos/review/' + data._id).then(function () {
            dispatch(getReviews());
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function editReview(data) {
    let date = new Date(),
        payload = Object.assign({}, data, {date: date.toISOString()}, {user: data.user._id});
    return function(dispatch) {
        return axios.put('https://restrest.herokuapp.com/mmilos/review/' + data._id, payload).then(function () {
            dispatch(getReviews());
        }).catch(function (error) {
            console.log(error);
        });
    };
}

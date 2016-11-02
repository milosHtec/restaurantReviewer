import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function reviewsReducer(state = initialState.reviews, action = {}) {
    switch(action.type) {
        case types.GET_REVIEWS_SUCCESS:
            return action.reviews;

        case types.ADD_REVIEW_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.review)
            ];
        case types.DELETE_REVIEW_SUCCESS:
            return [
                ...state.filter((item) => item._id !== action.review._id)
            ];
        case types.UPDATE_REVIEW_SUCCESS:
            return [
                ...state.filter((item) => item._id !== action.review._id)
            ];

        default:
            return state;
    }
}

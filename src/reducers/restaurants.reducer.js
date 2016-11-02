import initialState from './initialState';

export default function restaurantsReducer(state = initialState.restaurants, action = {}) {
    switch(action.type) {

        case 'GET_RESTAURANTS_SUCCESS':
            return action.restaurants;

        default:
            return state;
    }
}

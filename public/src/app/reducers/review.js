import {
    REVIEWS_SUCCESS,
    REVIEWS_FAIL,
    REVIEWS_IN_PROCESS
} from '../actions/actionTypes'

const reviews = (state = [], action = {}) => {
    switch (action.type) {
        case REVIEWS_SUCCESS:
            return Object.assign([], action.payload.reviews);
        case REVIEWS_FAIL:
            return null;
        case REVIEWS_IN_PROCESS:
            return state;
        default:
            return state;
    }
};

export default reviews

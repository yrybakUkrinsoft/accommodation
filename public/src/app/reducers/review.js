import {
    REVIEWS_SUCCESS,
    REVIEWS_FAIL,
    REVIEWS_IN_PROCESS
} from '../actions/actionTypes'

const reviews = (state = null, action = {}) => {
    switch (action.type) {
        case REVIEWS_SUCCESS:
            return Object.assign([], action.payload.reviews);
        case REVIEWS_FAIL:
            return {message: action.message};
        case REVIEWS_IN_PROCESS:
            return state;
        default:
            return state;
    }
};

export default reviews
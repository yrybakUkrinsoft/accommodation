import {
    REVIEW
} from '../actions/actionTypes'

const review = (state = [], action = {}) => {
    switch (action.type) {
        case REVIEW:
            return Object.assign([], action.payload.review);
        default:
            return state;
    }
};

export default review

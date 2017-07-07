import {
    AVERAGE_VALUES_SUCCESS,
    AVERAGE_VALUES_FAIL,
    AVERAGE_VALUES_IN_PROCESS
} from 'actions/actionTypes'

const average = (state = {}, action = {}) => {
    switch (action.type) {
        case AVERAGE_VALUES_SUCCESS:
            return Object.assign({}, action.payload.average);
        case AVERAGE_VALUES_FAIL:
            return {message: action.message};
        case AVERAGE_VALUES_IN_PROCESS:
            return null;
        default:
            return state;
    }
};

export default average;
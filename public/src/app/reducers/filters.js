import {
    FILTER_TRAVELED_WITH
} from '../actions/actionTypes'

const initialState = {
    traveledWith: {
        current: 'ALL',
        all: [
            "FAMILY"
            , "OTHER"
            , "COUPLE"
            , "FRIENDS"
            , "SINGLE"
        ]
    }
}
const review = (state = initialState, action = {}) => {
    switch (action.type) {
        case FILTER_TRAVELED_WITH:
            return {
                ...state
                , ...action.payload.current
            };
        default:
            return state;
    }
};

export default review

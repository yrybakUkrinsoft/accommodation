import {combineReducers} from 'redux'

import reviews from './review'
import average from './average'

const rootReducer = combineReducers({
    reviews
    , average
});

export default rootReducer;

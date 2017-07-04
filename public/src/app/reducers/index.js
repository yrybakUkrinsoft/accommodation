import {combineReducers} from 'redux'

import reviews from './review'
import filters from './filters'

const rootReducer = combineReducers({
    reviews
    , filters
});

export default rootReducer;

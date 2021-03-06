import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/index';

const defaultState = {
    reviews: null,
    average: null
};

const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(
        thunk
    )
);

export default store;

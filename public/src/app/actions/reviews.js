import {
    REVIEWS_SUCCESS,
    REVIEWS_FAIL,
    REVIEWS_IN_PROCESS
} from './actionTypes'
import {makeQs} from 'app/helpers'

export const getReviews = filters => {
    return dispatch => {
        dispatch({
            type: REVIEWS_IN_PROCESS
        });
        filters = filters || {};
        let query = makeQs(filters);
        fetch('/api/v1/reviews?'+query)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error('Response status: '+response.status)
                }
                return response.json()
            })
            .then(result => {
                if(!result.success) throw new Error(result.error);

                dispatch({
                    type: REVIEWS_SUCCESS,
                    payload: {
                        reviews: result.reviews
                    }
                })
            })
            .catch(err => {
                dispatch({
                    type: REVIEWS_FAIL,
                    message: err.message
                })
            })
    }
};
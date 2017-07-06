import {
    AVERAGE_VALUES_SUCCESS,
    AVERAGE_VALUES_FAIL,
    AVERAGE_VALUES_IN_PROCESS
} from './actionTypes'


export const getAverage = () => {
    return dispatch => {
        dispatch({
            type: AVERAGE_VALUES_IN_PROCESS
        });
        fetch('/api/v1/average')
            .then(response => {
                if(response.status !== 200) {
                    throw new Error('Response status: '+response.status)
                }
                return response.json()
            })
            .then(result => {
                if(!result.success) throw new Error(result.error);

                dispatch({
                    type: AVERAGE_VALUES_SUCCESS,
                    payload: {
                        average: result.reviews
                    }
                })
            })
            .catch(err => {
                dispatch({
                    type: AVERAGE_VALUES_FAIL,
                    message: err.message
                })
            })
    }
}

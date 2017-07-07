import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'actions/average'

import Average from './Average'

const mapStateToProps = state =>({
    average: state.average
})

const mapDispatchProps = dispatch => {
    return {
        getAverage: bindActionCreators(actions.getAverage, dispatch),
    }
}

const Container = connect(
    mapStateToProps,
    mapDispatchProps
)(Average)

export default  Container;

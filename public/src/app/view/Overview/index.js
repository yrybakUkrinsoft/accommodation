import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/reviews'

import Overview from './Overview'

const mapStateToProps = state =>({
    reviews: state.reviews
})

const mapDispatchProps = dispatch => {
    return {
        getReviews: bindActionCreators(actions.getReviews, dispatch),
    }
}

const ReviewContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(Overview)

export default  ReviewContainer;

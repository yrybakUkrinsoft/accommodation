import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'actions/reviews'

import Reviews from './Reviews'

const mapStateToProps = state =>({
    reviews: state.reviews
})

const mapDispatchProps = dispatch => {
    return {
        getReviews: bindActionCreators(actions.getReviews, dispatch),
    }
}

const Container = connect(
    mapStateToProps,
    mapDispatchProps
)(Reviews)

export default  Container;

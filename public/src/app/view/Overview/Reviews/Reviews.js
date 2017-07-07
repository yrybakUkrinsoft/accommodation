import React from 'react';
import {
    Button
    , Pager
    , Alert
    , Badge
} from 'react-bootstrap';
import {reviewLimit} from 'app/constants'
import Spinner from '../Spinner/Spinner'
import Filters from '../Filters/Filters'
import Pagination from '../Pagination/Pagination'
import {normalizeDate} from 'app/helpers'

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                skip: 0
                , traveledWith: 'ALL'
                , traveledDate: 'Any'
            }
        }
    }

    componentWillMount() {
        this.props.getReviews()
    }

    renderReviews() {
        return this.props.reviews.map((review, idx) => {
            return (
                <tr key={idx}>
                    <td>{review.user}</td>
                    <td>{normalizeDate(review.entryDate)}</td>
                    <td>{normalizeDate(review.travelDate)}</td>
                    <td>{review.locale}</td>
                    <td>{review.traveledWith}</td>
                </tr>
            )
        })
    }

    getError() {
        return (
            <Alert bsStyle="danger">
                <h3>
                    Error!!!
                </h3>
                <p>Some problem happened. Please, click a button below for getting reviews again.</p>
                <br/>
                <Button bsStyle="danger" onClick={() => this.props.getReviews()}>Get Reviews</Button>
            </Alert>
        )
    }

    getReviews(filters) {
        let newFilters = {};
        if (filters.traveledWith && filters.traveledWith !== this.state.filters.traveledWith) {
            newFilters.traveledWith = filters.traveledWith;
            newFilters.skip = 0;
        } else {
            newFilters.traveledWith = this.state.filters.traveledWith;
            newFilters.skip = this.state.filters.skip
        }

        if (filters.traveledDate) {
            newFilters.traveledDate = filters.traveledDate;
        } else {
            newFilters.traveledDate = this.state.filters.traveledDate
        }

        if (filters.skip || filters.skip === 0) {
            newFilters.skip = filters.skip;
        }
        this.setState({filters:newFilters});
        this.props.getReviews(newFilters)
    }

    render() {
        if (this.props.reviews === null) return <Spinner/>;
        if (this.props.reviews.message) return this.getError();
        return (
            <div>
                <h2>Reviews</h2>
                <Filters
                    traveledWith={this.state.filters.traveledWith}
                    traveledDate={this.state.filters.traveledDate}
                    getReviews={filters => this.getReviews(filters)}
                />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Entry Date</th>
                            <th>Travel Date</th>
                            <th>Locale</th>
                            <th>Traveled With</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReviews()}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    activePage={this.state.filters.skip}
                    availableNext={this.props.reviews.length === reviewLimit}
                    getReviews={filters => this.getReviews(filters)}
                />
            </div>
        )
    }
}
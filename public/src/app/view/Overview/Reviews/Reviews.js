import React from 'react';
import {
    Button
    ,Pager
    , Alert
    , Badge
} from 'react-bootstrap';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        }
    }

    componentWillMount() {
        this.props.getReviews()
    }

    renderReviews() {
        return this.props.reviews.map((review, idx)=> {
            return (
                <tr key={idx}>
                    <td>{review.user}</td>
                    <td>{this._normalizeDate(review.entryDate)}</td>
                    <td>{this._normalizeDate(review.travelDate)}</td>
                    <td>{review.locale}</td>
                    <td>{review.traveledWith}</td>
                </tr>
            )
        })
    }

    _normalizeDate(date) {
        let _date = new Date(+date);
        return `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`
    }

    changePage(value) {
        this.setState({
            activePage: this.state.activePage + value
        })
    }

    getError() {
        return (
            <Alert bsStyle="danger">
                <h3>
                    Error!!!
                </h3>
                <p>
                    Some problem happened. Please, click a button below for getting reviews again.
                </p>
                <p>
                    <Button bsStyle="danger" onClick={()=>{this.getReviews()}}>Get Reviews again</Button>
                </p>
            </Alert>
        )
    }

    getReviews() {
        console.log('get')
    }

    render() {
        if (!this.props.reviews) return this.getError();
        return (
            <div>
                <h2>Reviews</h2>
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
                <Pager>
                    <Pager.Item onClick={()=>this.changePage(0)}>&larr; Previous</Pager.Item>
                    <span>  Current page: </span>
                    <Badge>{this.state.activePage}</Badge>
                    <span>  </span>
                    <Pager.Item onClick={()=>this.changePage(1)}>Next &rarr;</Pager.Item>
                </Pager>
            </div>
        )
    }
}
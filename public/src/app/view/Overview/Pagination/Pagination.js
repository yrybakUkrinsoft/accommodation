import React from 'react';
import {
    Pager
    , Badge
} from 'react-bootstrap';

export default class Pagination extends React.Component {
    changePage(increment) {
        let skip = increment ? this.props.activePage + 1 : this.props.activePage - 1;
        this.props.getReviews({skip: skip})
    }

    render() {
        let disabledPrev = this.props.activePage === 0;
        return (
            <Pager>
                <Pager.Item disabled={disabledPrev} onClick={() => this.changePage(false)}>&larr; Previous</Pager.Item>
                <span>  Current page: </span>
                <Badge>{this.props.activePage + 1}</Badge>
                <span>  </span>
                <Pager.Item disabled={!this.props.availableNext} onClick={() => this.changePage(true)}>Next &rarr;</Pager.Item>
            </Pager>
        )
    }
}
import React from 'react';
import {
    DropdownButton
    , Row
    , Col
    , MenuItem
    , Alert
} from 'react-bootstrap';
import {traveledWith, sortDates} from 'app/constants'
import {normalizeValue} from 'app/helpers'
export default class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            traveledWith: this.props.traveledWith
            , traveledDate: this.props.traveledDate
        }
    }

    renderMenuItems(key,array) {
        return array.map((el, idx) => {
            return (
                <MenuItem eventKey={idx} key={idx} onSelect={e=>this.onSelectElement(key,array[idx])}>
                    {normalizeValue(el)}
                </MenuItem>
            )
        })
    }

    onSelectElement(key,element){
        let newState = null;
        switch(key){
            case 1:
                newState ={
                    traveledWith: element
                };
                break;
            case 2:
                newState = {
                    traveledDate: element
                };
                break;
        }
        if(newState) {
            this.setState(newState);
            this.props.getReviews(Object.assign({}, this.state, newState))
        }
    }

    render() {
        return (
            <Alert bsStyle="info">
                <Row>
                    <Col sm={3}>
                        <strong>Filter by "Traveled with": </strong>
                        <DropdownButton
                            bsSize="xsmall"
                            title={normalizeValue(this.state.traveledWith)}
                            id="dd-travel-with-filter"
                            style={{marginBottom: '6px'}}
                        >
                            {this.renderMenuItems(1,traveledWith)}
                        </DropdownButton>
                    </Col>
                    <Col sm={3}>
                        <strong>Sort by "Date": </strong>
                        <DropdownButton
                            bsSize="xsmall"
                            title={this.state.traveledDate}
                            id="dd-date-sort"
                            style={{marginBottom: '6px'}}
                        >
                            {this.renderMenuItems(2,sortDates)}
                        </DropdownButton>
                    </Col>
                </Row>
            </Alert>
        )
    }
}

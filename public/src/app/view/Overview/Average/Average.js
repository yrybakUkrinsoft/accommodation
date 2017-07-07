import React from 'react';
import {
    ListGroupItem
    , Button
    , ListGroup
    , MenuItem
    , Glyphicon
    , DropdownButton
    , Row
    , Col
    , Panel
    , Alert
} from 'react-bootstrap';
import Spinner from '../Spinner/Spinner'
import {traveledWith} from 'app/constants'
import {normalizeValue, unCamelCase} from 'app/helpers'
let h3Style = {
    display: 'inline-block'
    , margin: '0 15px 0 0'
};
export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'ALL'
            , opened: true
        }
    }

    componentWillMount() {
        this.props.getAverage()
    }



    renderTitles() {
        return traveledWith.map((value, idx) => {
            return <MenuItem eventKey={idx} onSelect={e => this.onSelectTab(e)} key={idx}>
                {normalizeValue(value)}
            </MenuItem>
        })
    }

    onSelectTab(idx) {
        this.setState({
            current: traveledWith[idx]
        })
    }

    renderContent() {
        let currentTab = this.state.current;
        let currentObject = this.props.average[currentTab];
        let dividedKeys = this.divideKeysByTwo(Object.keys(currentObject));

        return dividedKeys[0].map((keyA, idx) => {
            let keyB = dividedKeys[1][idx];
            let keyC = dividedKeys[2][idx];
            let style = idx % 2 && {bsStyle: 'warning'};
            let renderCol = key => key ? <Col xs={4}><strong>{unCamelCase(key)}:</strong> {currentObject[key]}</Col> : '';

            return <ListGroupItem {...style} key={idx}>
                <Row>
                    {renderCol(keyA)}
                    {renderCol(keyB)}
                    {renderCol(keyC)}
                </Row>
            </ListGroupItem>
        })
    }

    divideKeysByTwo(keys) {
        let first = [];
        let second = [];
        let third = [];
        keys.forEach((e, i) => i % 3 === 0 ? first.push(e) : (i + 1) % 3 ? second.push(e) : third.push(e));
        return [first, second, third]
    }

    switchPanel(e) {
        this.setState({opened: !this.state.opened})
    }

    getPanelTitle() {
        let glyphValue = this.state.opened ? 'chevron-up' : 'chevron-down';
        return <div onClick={ () => this.switchPanel()}>
            <h3 style={h3Style}>Average values for {normalizeValue(this.state.current)}</h3>
            <Glyphicon glyph={glyphValue} style={{color: 'white'}}/>
        </div>
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
                <br/>
                <Button bsStyle="danger" onClick={() => this.props.getAverage()}>Get Average values</Button>
            </Alert>
        )
    }

    render() {
        if (this.props.average === null) return <Spinner/>;
        if (this.props.average.message) return this.getError();
        return (
            <Row className="clearfix">
                <Col sm={12}>
                    <h3 style={h3Style}>You can chose any traveledWith value of the accommodation for the average computations:</h3>
                    <DropdownButton
                        bsSize="xsmall"
                        bsStyle="warning"
                        title={normalizeValue(this.state.current)}
                        id="dd-travel-with"
                        style={{marginBottom: '6px'}}
                    >
                        {this.renderTitles()}
                    </DropdownButton>
                </Col>
                <Col sm={12}>
                    <Panel collapsible header={this.getPanelTitle()} bsStyle="primary" expanded={this.state.opened}>
                        <ListGroup fill>
                            {this.renderContent()}
                        </ListGroup>
                    </Panel>
                </Col>
            </Row>
        )
    }
}
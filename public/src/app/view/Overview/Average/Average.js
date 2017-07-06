import React from 'react';
import {
    ListGroupItem
    , Button
    ,ListGroup
    ,MenuItem
    , Glyphicon
    ,DropdownButton
    ,Row
    ,Col
    , Panel
} from 'react-bootstrap';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'ALL'
            , opened: true
            , traveledWith: [
                , "ALL"
                , "FAMILY"
                , "OTHER"
                , "COUPLE"
                , "FRIENDS"
                , "SINGLE"
            ]
        }
    }

    componentWillMount() {
        //this.props.getAverage()
    }

    normalizeValue(value) {
        return value.toLowerCase().replace(/\w/, w=>w.toUpperCase())
    }

    renderTitles() {
        return this.state.traveledWith.map((value, idx) => {
            return <MenuItem eventKey={idx} onSelect={e=>this.onSelectTab(e)} key={idx}>
                {this.normalizeValue(value)}
            </MenuItem>
        })
    }

    onSelectTab(idx) {
        this.setState({
            current: this.state.traveledWith[idx]
        })
    }

    renderContent() {
        return [{sdfsdf: 12}, {as232sd: 123}, {as232sd: 123}, {as232sd: 123}, {as232sd: 123}, {as232sd: 123}, {as232sd: 123}, {as232sd: 312},]
            .map((el, idx)=> {
                let key = Object.keys(el)[0];
                let style = idx % 2 && {bsStyle: 'warning'}
                return (
                    <ListGroupItem {...style} key={idx}>
                        {key}: {el[key]}
                    </ListGroupItem>
                )
            })
    }

    switchPanel(e) {
        e.preventDefault()
        this.setState({opened: !this.state.opened})
    }

    getPanelTitle() {
        let glyphValue = this.state.opened ? 'chevron-up' : 'chevron-down'
        let h3Style = {
            display: 'inline-block'
            , margin: '0 15px 0 0'
        }
        return <div>
            <h3 style={h3Style}>Average values for {this.normalizeValue(this.state.current)}</h3>
            <a href=""
               onClick={ e=> this.switchPanel(e)}
            >
                <Glyphicon glyph={glyphValue} style={{color: 'white'}}/>
            </a>
        </div>
    }

    render() {
        return (
            <Row className="clearfix">
                <Col sm={12}>
                    <span>
                        Please, chose the average of the rating of the accommodation:
                    </span>
                    <DropdownButton
                        bsStyle="warning"
                        title={this.normalizeValue(this.state.current)}
                        id="dd-trael-with"
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
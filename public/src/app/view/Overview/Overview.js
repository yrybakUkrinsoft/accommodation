import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';

export default class Overview extends React.Component {
    getReviews(){
        this.props.getReviews()
    }

    renderReviews(){
        return this.props.reviews.map((review,idx)=>{
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

    _normalizeDate(date){
        let _date = new Date(+date);
        return `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`
    }

    render() {
        console.log(this.state, this.props)
        return (
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <h1>Dashboard</h1>

                <ButtonToolbar>
                    {/* Standard button */}
                    <Button onClick={() => this.getReviews()}>Default</Button>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary">Primary</Button>

                    {/* Indicates a successful or positive action */}
                    <Button bsStyle="success">Success</Button>

                    {/* Contextual button for informational alert messages */}
                    <Button bsStyle="info">Info</Button>

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning">Warning</Button>

                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger">Danger</Button>

                    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                    <Button bsStyle="link">Link</Button>
                </ButtonToolbar>

                <h2>Section title</h2>
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
            </main>
        )
    }
}

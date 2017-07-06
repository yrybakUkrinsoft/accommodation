import React from "react";
import {
    Navbar
} from 'react-bootstrap';
export default () => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="" onClick={event=>event.preventDefault()}>Accomodation</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

        </Navbar>
    )
}

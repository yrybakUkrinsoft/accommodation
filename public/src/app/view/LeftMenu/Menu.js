import React from "react";

export default () => {
    return (
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="">Overview <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Reports</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Analytics</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Export</a>
                </li>
            </ul>
        </nav>
    )
}

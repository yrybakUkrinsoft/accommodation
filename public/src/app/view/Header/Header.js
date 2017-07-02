import React from "react";

export default () => {
    return (
        <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button">
                <span className="navbar-toggler-icon"/>
            </button>
            <a className="navbar-brand" href="">Dashboard</a>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="">Main <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Help</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

import { Component } from "react";
import './Header.css';

import { NavLink, BrowserRouter as Router } from 'react-router-dom';


class Header extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">SUM</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <NavLink  className="link"  to="/">Dashboard</NavLink>

                            </li>


                        </ul>
                    </div>

                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-power"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Router>)
    }
}

export default Header;
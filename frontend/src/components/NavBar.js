import "../css/navbar.css"
import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link to="/" className="link-text">
                        <span className="navbar-brand">Ben Porayko</span>
                    </Link>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarToggler"
                      aria-controls="navbarToggler"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                      <ul className="navbar-nav ms-auto">
                        <Link to="/" className="link-text">
                            <li className="nav-item">
                                <span className="nav-link">Home</span>
                            </li>
                        </Link>
                        <Link to="/blog" className="link-text">
                            <li className="nav-item">
                                <span className="nav-link">Blog</span>
                            </li>
                        </Link>
                        <Link to="/contact" className="link-text">
                            <li className="nav-item">
                                <span className="nav-link">Contact</span>
                            </li>
                        </Link>
                      </ul>
                    </div>
                </nav>
        </div>
    )
}

export default NavBar;
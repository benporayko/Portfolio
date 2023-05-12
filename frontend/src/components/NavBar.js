import "../css/navbar.css"
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const NavBar = () => {
    const { logout, isLoggedIn } = useContext(AuthContext);

    function handleLogout() {
        logout();
    }

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
                        {
                            isLoggedIn ? 
                            <div>
                                <Link className="link-text">
                                    <li className="nav-item">
                                        <span className="nav-link" onClick={handleLogout}>Logout</span>
                                    </li>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link to="/login" className="link-text">
                                    <li className="nav-item">
                                        <span className="nav-link">Login</span>
                                    </li>
                                </Link>
                            </div>
                        }
                      </ul>
                    </div>
                </nav>
        </div>
    )
}

export default NavBar;
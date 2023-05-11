import "../css/navbar.css"
import React, { useEffect, useState } from 'react';
import BlogDataService from "../services/blogService";
import { Link, Navigate, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [username, setUserName] = useState(null);

    const navigate = useNavigate();

    async function logout() {
        localStorage.removeItem("token");
        setUserName(null);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            let isUserLoggedIn = await BlogDataService.isUserAuth()
                .then(response => {
                    // console.log(response.data);
                    setUserName(response.data.username);
                })
        }
        fetchUserData();
    }, [username]);

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
                            username ? 
                            <div>
                                <Link className="link-text">
                                    <li className="nav-item">
                                        <span className="nav-link" onClick={logout}>Logout</span>
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
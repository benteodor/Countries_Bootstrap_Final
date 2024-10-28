// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from 'firebase/auth';
import '../css/navbarStyles.css';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand custom-brand" to="/">Countries Teodor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link custom-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link custom-link" to="/search">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link custom-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link custom-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light custom-logout-btn nav-link" onClick={handleLogout}>
                                <i className="fa fa-sign-out"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
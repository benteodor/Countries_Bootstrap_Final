// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import '../css/Login.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate('/'); // Navigate to home after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.message); // Show error message
        }
    };

    return (
        <div className="auth-container d-flex justify-content-center align-items-center">
            <div className="auth-card">
                <div className="auth-card-body">
                    <h3 className="auth-card-title text-center">Login</h3>
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="auth-input-group mb-3">
                            <label htmlFor="email" className="auth-label">Email address</label>
                            <input
                                type="email"
                                className="auth-input form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-input-group mb-3">
                            <label htmlFor="password" className="auth-label">Password</label>
                            <input
                                type="password"
                                className="auth-input form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
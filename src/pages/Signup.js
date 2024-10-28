
// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import '../css/Login.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signup successful! Please login.");
            navigate('/login'); // Navigate to login after successful signup
        } catch (error) {
            console.error('Error signing up:', error);
            alert(error.message); // Show error message
        }
    };

    return (
        <div className="auth-container d-flex justify-content-center align-items-center">
            <div className="auth-card">
                <div className="auth-card-body">
                    <h3 className="auth-card-title text-center">Signup</h3>
                    <form onSubmit={handleSignup} className="auth-form">
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
                        <div className="auth-input-group mb-3">
                            <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                            <input
                                type="password"
                                className="auth-input form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn btn btn-primary w-100">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

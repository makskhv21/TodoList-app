import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSSpage/Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

import iconLock from './img/iconLock.png';
import iconUser from './img/iconUser.png';
import iconEyeClose from './img/iconEyeClose.png';
import iconEyeOpen from './img/iconEyeOpen.png';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
            navigate('/app');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <img src={iconLock} alt="Email Icon" className="input-icon" />
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <img src={iconUser} alt="Password Icon" className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img
                                src={showPassword ? iconEyeOpen : iconEyeClose}
                                alt={showPassword ? "Hide password" : "Show password"}
                                className="eye-icon"
                            />
                        </span>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="footer">
                    <p className="footer-text">
                        Don't have an account? <Link to="/signup" className="footer-link">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
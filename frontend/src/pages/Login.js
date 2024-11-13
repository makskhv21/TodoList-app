import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        onLogin();
        navigate('/app');
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default Login;
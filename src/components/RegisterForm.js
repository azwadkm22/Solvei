import React, { useState } from 'react';
import "./styles/AuthForm.css";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [univRegNumber, setUnivRegNumber] = useState('');
    const [email, setEmail] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [recaptchaResponse, setRecaptchaResponse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <label htmlFor="univRegNumber">University Registration Number</label>
                <input
                    type="text"
                    id="univRegNumber"
                    value={univRegNumber}
                    onChange={(e) => setUnivRegNumber(e.target.value)}
                    required
                />

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="batchNumber">Batch Number</label>
                <input
                    type="number"
                    id="batchNumber"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {/* Recaptcha Prompt component here */}
                {/* Replace the below placeholder with your actual Recaptcha component */}
                <p>Recaptcha Prompt component here</p>

                <button id='submit-button' type="submit">Submit</button>

                <Link to="/login" className='link-page'>Already have an account? Login</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
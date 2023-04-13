import React, { useState } from 'react';
import "./styles/AuthForm.css";
import { useLogin } from '../hook/useLogin'
import { Link , useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const {login, error, isLoading} = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const redirectToHome = () => {
        console.log("in redirect to home");
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const ok = await login(email, password)
        
        if(ok) {
            redirectToHome();
        } else {
            alert("Could not log in")
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="login-email" >Email Address</label>
                <input
                    className='auth-form-content'
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password" >Password</label>
                <input
                    className='auth-form-content'
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                {/* Recaptcha Prompt component here */}
                {/* Replace the below placeholder with your actual Recaptcha component */}
                {/* <p>Recaptcha Prompt component here</p> */}

                <button className='submit-button' type="submit">Submit</button>

                <Link to="/register" className='link-page'>Don’t have an account? Create one</Link>
            </form>
            
        </div>
    );
};

export default LoginForm;
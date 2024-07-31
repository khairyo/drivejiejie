import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// import css
import '../App.css';
import djjlogo from '../images/drivejiejie-logo-blue.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [auth, setAuth] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { username, password };
        try {
            const response = await axios.post('http://127.0.0.1:8004/api/userlogin', user);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem("email", response.data.data.email_add);
            alert("Login successful");
            setAuth(true)
        } catch (error) {
            alert("Login unsuccessful. Please try again.");
        }
    };

    if (auth) {
        return <Navigate to='/' />
    } else {
        return (
            <div className="auth-page">
                <div className="auth-white-bg">
                    <div className="form-box">
                        <p className="outfit-font">Welcome Back!</p>
                        <p className="outfit-font2">It's terrific to see you again.</p>
                        <form method="POST" name="login_form" onSubmit={handleSubmit}>
                            <div className='input-group'>
                                <div className='input-field'>
                                    <input type='text'
                                        name='username'
                                        required
                                        value={username}
                                        onChange={(event) => { setUsername(event.target.value) }}
                                        className='login-text-field'
                                        placeholder='Username'
                                        autoComplete="off" />
                                </div>
                                <div className='input-field'>
                                    <input type={visible ? "text" : "password"}
                                        name='password'
                                        required
                                        className='login-text-field'
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        placeholder='Password'
                                        autoComplete="off" />
                                    <div className='visibility-btn' onClick={() => {setVisible(!visible)}}>
                                        {visible ? <Visibility /> : <VisibilityOff />}
                                    </div>
                                </div>
                            </div>

                            <div className='login-btn-location'>
                                <input className='login-btn' type='submit' value="Let's Go!" />
                            </div>
                        </form>

                        <div className='register-link'>
                            <a href='./register'>First time? Sign up here</a>
                        </div>
                    </div>
                </div>

                <div className="auth-yellow-bg">
                    <img className='auth-djj-icon' src={djjlogo} alt='"logo' />
                    <div className='auth-djj-logotext'>
                        <span className='auth-djj-text-blue'>drive</span>
                        <span className='auth-djj-text-black'>JieJie</span>
                    </div>
                    <br />
                    <div className='auth-djj-slogantext'>
                        <span className='auth-djj-slogan-black'>"Your </span>
                        <span className='auth-djj-slogan-blue'>ultimate </span>
                        <span className='auth-djj-slogan-black'>driving</span> <br />
                        <span className='auth-djj-slogan-black'>companion."</span>
                    </div>
                </div>
            </div>
        );
    };
};
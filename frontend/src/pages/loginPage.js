import { React, useState } from 'react';
import axios from 'axios';

// import css
import '../App.css';
import djjlogo from '../images/drivejiejie-logo-blue.png';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:8004/createuser', { username, password })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }

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
                                <input type='password'
                                    name='password'
                                    required
                                    className='login-text-field'
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    placeholder='Password'
                                    autoComplete="off" />
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





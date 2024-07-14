import { React, useState } from 'react';
import axios from 'axios';

// import css
import '../App.css';
import djjlogo from '../images/drivejiejie-logo-blue.png';

export default function RegisterPage() {
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
                    <p className="outfit-font">It's great to get to know you.</p>
                    <p className="outfit-font2">Begin your adventure with us!</p>
                    <form method="POST" name="register_form" onSubmit={handleSubmit}>
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

                        <div className='register-btn-location'>
                            <input className='login-btn' type='submit' value="Take me in!" />
                        </div>
                    </form>

                </div>
            </div>

            <div className="auth-yellow-bg">
                <img className='auth-djj-icon' src={djjlogo} alt='logo' />
                <div className='auth-djj-logotext'>
                    <span className='auth-djj-text-blue'>drive</span>
                    <span className='auth-djj-text-black'>JieJie</span>
                </div>
                <br />
                <div className='auth-djj-slogantext'>
                    <span className='auth-djj-slogan-black'>“Where every drive is a</span> <br />
                    <span className='auth-djj-slogan-blue'>breeze</span><span className='auth-djj-slogan-black'>.”</span>
                </div>
            </div>
        </div>
    );
};
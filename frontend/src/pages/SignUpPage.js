import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// import css
import '../App.css';
import djjlogo from '../images/drivejiejie-logo-blue.png';

export function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [create, setCreate] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { username, password, email };
        try {
            const response = await axios.post('http://127.0.0.1:8004/createuser', user);
            console.log(response.data);
            setCreate(true);
            alert("User created successfully");
        } catch (error) {
            console.error(error);
            // Display error message to user
            alert("User creation unsuccessful, try again later.");
        }
    };

    if (create === true) {
        return <Navigate to='/login' />
    } else {
        return (
            <div className="auth-page">
                <div className="auth-white-bg">
                    <div className="form-box">
                        <p className="outfit-font">It’s great to get to know you.</p>
                        <p className="outfit-font2">Begin your adventure with us!</p>
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
                                    <input type='text'
                                        name='email'
                                        required
                                        value={email}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        className='login-text-field'
                                        placeholder='Email'
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
                            <a href='./login'>Already have an account? Log in here!</a>
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
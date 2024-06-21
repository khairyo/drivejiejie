import React from 'react';

// import components
import { Button } from '@mui/material';

// import css
import '../App.css';

export function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-white-bg">
                <div className="form-box">
                    <p className="outfit-font">Welcome Back!</p>
                    <p className="outfit-font2">It's terrific to see you again.</p>
                    <form className="login-form" method="POST" name="login_form">
                        <div className='input-group'>
                            <div className='input-field'>
                                <input type='text' className='login-text-field' name='username' placeholder='Username' />
                            </div>
                            <div className='input-field'>
                                <input type='password' className='login-text-field' name='password' placeholder='Password' />
                            </div>
                        </div>

                        <div classname="login-btn">
                            <Button type='submit'>Let's Go!</Button>
                        </div>
                    </form>

                    <div className='register-link'>
                        <a href='./register'>First time? Sign up here</a>
                    </div>
                </div>


            </div>

            <div className="login-yellow-bg">
                <div className='login-icon'>
                    
                </div>
            </div>
        </div>
    );
};

function loginAuthentication() {
    // INCOMPLETE
    var username = document.forms['login_form']['username']
    var password = document.forms['login_form']['password']

    var username_error = document.getElementById('username_error');
    var password_error = document.getElementById('password_error');

    username.addEventListener('textInput', username_verify);
    password.addEventListener('textInput', password_verify);

    function validated() {
        if (username.value.length < 1) {
            return false;
        }
        if (password.value.length < 1) {
            return false;
        }
        return true;
        // any restrictions?
    }

    function username_verify() {
        return true;
        // add api calls
    }

    function password_verify() {
        return true;
        // add api calls
    }

}



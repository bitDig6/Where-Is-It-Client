import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import auth from '../firebase/firebase.init';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.pass.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(res => console.log(res.user))
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div>
            <form onSubmit={ handleLogin }>
                <input type="email" name="email" id="" />
                <input type="password" name="pass" id="" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Login;
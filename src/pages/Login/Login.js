import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Login = () => {
    const { providerLogin, login } = useContext( AuthContext )
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


    // handle created user login
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log( user )

        login( email, password )
            .then( result => {
                const user = result.user
                // console.log( user );
                form.reset();
                navigate( from, { replace: true } )
            } )
            .catch( error => {
                // console.error( 'error ', error )
                toast.error( 'Register first to login' )
                form.reset();
            } )
    }

    // handle google login
    const handleGoogleSignIn = () => {
        providerLogin( googleProvider )
            .then( result => {
                const user = result.user;
                // console.log( user );
                saveUsers( user?.displayName, user?.email );
                navigate( from, { replace: true } )
            } )
            .catch( error => console.error( 'error ', error ) )

        const saveUsers = ( name, email ) => {
            const info = { name, email };
            console.log( info )
            fetch( 'http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( info )
            } )
                .then( res => res.json() )
                .then( data => {
                    // console.log( data )
                } )
        }
    }

    return (
        <div className="hero w-full my-24">
            <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-10">
                <h1 className="text-5xl text-center font-bold">Login </h1>
                <form onSubmit={ handleLogin } className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered rounded-lg" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type="text" name='password' placeholder="password" className="input input-bordered rounded-lg" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-base">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary rounded-lg text-lg" type="submit" value="Login" />
                    </div>
                </form>
                <p className='text-center'>New to Adda <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>
                {/* login btn of google login */ }
                <button onClick={ handleGoogleSignIn } className="btn btn-outline btn-info mx-9 mt-5 rounded-lg text-lg"><FaGoogle /> <span className='ml-2'>Google</span></button>

            </div>
        </div>
    );
};

export default Login;

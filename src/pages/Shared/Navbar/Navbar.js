import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.ico'
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext( AuthContext )
    // console.log( user )

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const menuItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/media'>Media</Link></li>
            <li><Link to='/message'>Message</Link></li>
            <li><Link to='/about'>About</Link></li>
            {
                user?.email ?
                    <li> <button onClick={ handleLogOut } className='btn-ghost'>Log Out</button></li>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>SignUp</Link></li>
                    </>
            }
        </>


    return (
        <div className="navbar bg-slate-500 text-white fixed top-0 z-30 left-0 right-0 px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={ 0 } className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={ 0 } className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-600 rounded-box w-52">
                        { menuItems }

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-3xl"><img src={ logo } alt="" width='150px' /></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-semibold">
                    { menuItems }
                </ul>
            </div>

        </div>
    );
};

export default Navbar;

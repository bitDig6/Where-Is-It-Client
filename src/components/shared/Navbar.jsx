import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import userIcon from '../../assets/user.png';

const Navbar = () => {
    const { user, setUser, logOutUser } = useAuth();

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allItems">Lost & Found Items</NavLink></li>
    </>

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                setUser(null);
            }).catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="navbar bg-orange-100 text-black shadow-sm lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-orange-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        { navLinks }
                    </ul>
                </div>
                {/* site name and logo */}
                <div className='flex gap-2 items-center'>
                    <div>
                        <img src={logo} alt="site logo" className='w-12' />
                    </div>
                    <div>
                        <Link to="/" className="lg:text-2xl font-federo font-bold">Where is it</Link>
                        <p className='text-xs md:ml-4 font-inter'>Search. Reach Out. Repossess</p>
                    </div>
                </div>
                {/* end of site name and logo */}
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    { navLinks }
                </ul>
            </div>

            <div className="navbar-end">
                {/* profile photo */}
                <div>
                    {
                        user ? <>
                            <div className='dropdown dropdown-center tooltip tooltip-left mr-2' data-tip={user?.displayName ? user?.displayName : 'You'}>
                                <div tabIndex={0} role="button" className="btn btn-circle m-1">
                                    <div className='avatar'>
                                        <div className='rounded-full'>
                                            <img className='w-28' src={user?.photoURL ? user?.photoURL : userIcon} alt="profile photo"></img>
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-orange-200 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><Link>Add Items</Link></li>
                                    <li><Link>Recovered Items</Link></li>
                                    <li><Link>Manage Items</Link></li>
                                </ul>
                            </div>
                        </>
                            : ''
                    }
                </div>
                {/* login or logout */}
                {
                    user ?
                        <button onClick={handleLogOut} className='btn btn-primary'>Logout</button>
                        : <Link to="/login">
                            <button className='btn btn-primary'>Login</button>
                        </Link>
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Navbar;
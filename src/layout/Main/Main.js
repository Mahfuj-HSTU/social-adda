import React from 'react';
import Navbar from '../../pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='mt-20 max-w-[1440px] mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;

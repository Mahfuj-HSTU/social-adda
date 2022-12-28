import React from 'react';
import Aside from '../../pages/Home/Aside/Aside';
import Home from '../../pages/Home/Home/Home';

const HomeLayout = () => {
    return (
        <div className="flex mt-24">
            <div className='max-w-sm mr-10'>
                <Aside></Aside>
            </div>
            <div className='max-w-2xl mx-auto'>
                <Home></Home>
            </div>
        </div>
    );
};

export default HomeLayout;

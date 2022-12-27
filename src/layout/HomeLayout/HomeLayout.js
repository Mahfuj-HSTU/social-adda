import React from 'react';
import Aside from '../../pages/Home/Aside/Aside';
import Home from '../../pages/Home/Home/Home';

const HomeLayout = () => {
    return (
        <div className="">
            <div className="flex justify-around">
                <div className='max-w-xs text-start'>
                    <Aside></Aside>
                </div>
                <div className='max-w-2xl flex justify-start'>
                    <Home></Home>
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;

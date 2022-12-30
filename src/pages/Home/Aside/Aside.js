import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Aside = () => {
    const { data: users = [] } = useQuery( {
        queryKey: [ 'users' ],
        queryFn: () => fetch( 'http://localhost:5000/users' )
            .then( res => res.json() )
    } )
    // console.log( users );

    return (
        <div>
            <h3 className='text-2xl font-semibold'>People you may know</h3>
            {
                users.slice( 0, 5 ).map( user =>
                    <div className="card card-compact bg-base-100 shadow-2xl mx-auto p-10 my-7">
                        <div className='text-start flex mb-5'>
                            <figure><img className='w-14 h-14 rounded-full mr-3' src={ user.photoUrl } alt="profile" /></figure>
                            <div className=' mt-1'>
                                <h2 className='text-2xl'>{ user.name }</h2>
                            </div>
                        </div>
                    </div> )
            }
        </div>
    );
};

export default Aside;

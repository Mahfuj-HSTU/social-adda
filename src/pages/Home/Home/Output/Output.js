import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const Output = () => {

    const { data: posts = [] } = useQuery( {
        queryKey: [ 'posts' ],
        queryFn: () => fetch( 'http://localhost:5000/posts' )
            .then( res => res.json() )
    } )


    return (
        <div className='mt-10'>
            <h3 className='text-3xl text-slate-700 font-semibold'>Top 3 posts</h3>
            <div>
                {
                    posts.slice( 0, 3 ).map( post => <div key={ post._id }>
                        <div div className="card card-compact bg-base-100 shadow-2xl mx-auto p-10 my-7">
                            <div className='text-start flex mb-5'>
                                <figure><img className='w-14 h-14 rounded-full mr-3' src={ post.photoUrl } alt="profile" /></figure>
                                <div className=' mt-1'>
                                    <h2 className='text-2xl'>{ post.name }</h2>
                                    <h4>{ post.date }</h4> </div>
                            </div>
                            <figure><img src={ post.image } alt="loading" /></figure>
                            <div className="card-body text-start mt-5">
                                <h2 className='text-2xl mb-3'>{ post.message }</h2>
                                {/* show post details */ }
                                <div className="card-actions justify-end">
                                    <Link to={ `/posts/${ post._id }` }><button className="btn btn-primary round">Details</button></Link>
                                </div>
                            </div>
                        </div>
                    </div> )
                }
            </div>
        </div>
    );
};

export default Output;

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
// import { Link, useLoaderData } from 'react-router-dom';
import Comments from './Comments';
import CommentsCard from './CommentsCard';

const PostDetails = () => {
    const [ visible, setVisible ] = useState( 'false' )
    const [ fill, setFill ] = useState( 'false' )
    const [ like, setLike ] = useState( 'false' )
    const post = useLoaderData()
    const { _id, name, photoUrl, message, image, date } = post;

    const handleComment = () => {
        setVisible( ( visible ) => !visible )
    }

    const handleLike = () => {
        setFill( ( fill ) => !fill )
        setLike( ( like ) => !like )

        fetch( `http://localhost:5000/posts/${ _id }`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( '1' )
        } )
            .then( res => res.json() )
            .then( data => {
                // toast.success( 'updated successfully' )
            } )
    }

    // console.log( like )
    // if ( like === true ) {
    //     console.log( 1 )
    // }
    // else {
    //     console.log( 0 );
    // }

    const { data: comments = [], isLoading } = useQuery( {
        queryKey: [ 'posts' ],
        queryFn: () => fetch( `http://localhost:5000/comments/${ _id }` )
            .then( res => res.json() )
    } )

    if ( isLoading ) {
        <Loading></Loading>
    }

    return (
        <div className="card card-compact w-1/2 bg-base-100 shadow-2xl mx-auto p-10 my-7">
            <div className='text-start flex mb-5'>
                <figure><img className='w-14 h-14 rounded-full mr-3' src={ photoUrl } alt="profile" /></figure>
                <div className=' mt-1'>
                    <h2 className='text-2xl'>{ name }</h2>
                    <h4>{ date }</h4> </div>
            </div>
            <figure><img src={ image } alt="loading" /></figure>
            <div className="card-body text-start mt-5">
                <h2 className='text-2xl mb-3'>{ message }</h2>
                <div className='flex justify-around mt-5'>
                    <button onClick={ handleLike } className={ `btn btn-sm btn-info w-2/5 ${ fill ? 'btn-outline' : '' }` }> { `${ like ? '0' : '1' } ` } Like</button>
                    <button onClick={ handleComment } className="btn btn-sm btn-outline btn-info w-2/5">Comment</button>
                </div>

                <div className={ visible ? "invisible" : "visible" }>
                    <Comments post={ post }></Comments>
                </div>
                <div>
                    {
                        comments.map( cmnt => <CommentsCard key={ cmnt._id } cmnt={ cmnt }></CommentsCard> )

                    }
                </div>

            </div>
        </div>
    );
};

export default PostDetails;

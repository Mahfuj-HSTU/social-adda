import React, { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Comments = ( { post } ) => {
    const { user } = useContext( AuthContext )
    const [ comment, setComment ] = useState( [] );
    // const [ showComment, setShowComment ] = useState( '' )
    const [ control, setControl ] = useState( false )
    const { _id } = post;

    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const Name = user?.displayName;
        const comment = form.comment.value;

        const comments = {
            post: _id,
            Name,
            comment,
            userPhoto: post?.photoURL || <FaUser />,
            date: new Date().toLocaleString()
        }
        // console.log( comments )
        // setShowComment( comments )

        const url = ( 'http://localhost:5000/comments' )
        fetch( url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( comments )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.acknowledged ) {
                    form.reset();
                    setControl( !control )
                    toast.success( 'Thanks for your comments' )
                }
            } )
    }

    return (
        <div>
            <form onSubmit={ handleComment } className='mb-5'>
                <input onChange={ event => setComment( event.target.value ) } name="comment"
                    value={ comment } type="text" placeholder="Write a comment.." className="input input-bordered w-full h-9 mt-5" />
            </form>
            <div>
                {/* <h2>{ showComment }</h2> */ }
            </div>
        </div>
    );
};

export default Comments;


/*

    const handleSubmit = event => {
        event.preventDefault();
        const message = event.target.comment.value;
        setShowComment( message )
        // console.log( message )
        const url = ( 'http://localhost:5000/comments' )
        fetch( url, {
            method: "PUT",
            headers: {
                'content-type': 'text/plain'
            },
            body: JSON.stringify( comment )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.acknowledged ) {
                    toast.success( 'comment successful' )
                    event.target.reset();
                }
                console.log( data )
            } )
    };
 */

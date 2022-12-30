import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';

const Input = () => {
    const [ services, setServices ] = useState( {} )
    const { user } = useContext( AuthContext )
    const navigate = useNavigate();

    const { data: details = [] } = useQuery( {
        queryKey: [ 'details' ],
        queryFn: () => fetch( `http://localhost:5000/users/${ user.email }` )
            .then( res => res.json() )
    } )

    const { data: users = [] } = useQuery( {
        queryKey: [ 'users' ],
        queryFn: () => fetch( 'http://localhost:5000/users' )
            .then( res => res.json() )
    } )

    const handleSubmit = ( event ) => {
        if ( !user ) {
            toast.error( 'To give post please login first.' )
            return navigate( "/login" );
        }

        event.preventDefault();

        const url = ( 'http://localhost:5000/posts' )
        fetch( url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( services )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.acknowledged ) {
                    toast.success( 'post uploaded' )
                    event.target.reset();
                }
                console.log( data )
            } )
    }

    const handleChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const date = new Date().toLocaleString()
        const { name, photoUrl } = details;
        const newServices = { ...services, date, name, photoUrl };
        newServices[ field ] = value;
        setServices( newServices )
    }

    return (
        <div>
            <div className='grid grid-cols-4 gap-1 mb-5'>
                {
                    users.slice( 0, 4 ).map( user =>
                        <div className="card card-compact bg-base-100 shadow-2xl mx-auto p-2 my-5">
                            <div className='text-start flex mb-5'>
                                <div className='h-5'
                                    style={ {
                                        backgroundImage: `url(${ user.photoUrl })`
                                    } }>
                                </div>
                                <div className=' mt-1'>
                                    <h2 className=''>{ user.name }</h2>
                                </div>
                            </div>
                        </div> )
                }
            </div>
            <div className='border-2 p-7 rounded-xl'>
                <form onSubmit={ handleSubmit }>
                    <div className='flex'>
                        <textarea onChange={ handleChange } type='text' className="input input-bordered w-96 rounded-lg mr-5" name='message' placeholder="Type here" required />
                        <input onChange={ handleChange } type="text" name='image' className="input input-bordered w-96 rounded-lg" placeholder="Photo url" required />
                    </div>
                    <div>
                        <input onChange={ handleChange } className="btn btn-primary px-5 mt-5 text-lg rounded-lg" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Input;

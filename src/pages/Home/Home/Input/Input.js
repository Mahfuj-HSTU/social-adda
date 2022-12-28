import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';

const Input = () => {
    const [ services, setServices ] = useState( {} )
    const { user } = useContext( AuthContext )
    const navigate = useNavigate();

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
        const newServices = { ...services, date };
        newServices[ field ] = value;
        setServices( newServices )
    }

    return (
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
    );
};

export default Input;

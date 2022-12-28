import React, { useState } from 'react';

const Input = () => {
    const [ services, setServices ] = useState( {} )


    const handleSubmit = ( event ) => {
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
                    event.target.reset();
                }
                console.log( data )
            } )
    }

    const handleChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newServices = { ...services };
        newServices[ field ] = value;
        setServices( newServices )
    }

    return (
        <div className='border-2 p-7 rounded-xl'>
            <form onSubmit={ handleSubmit }>
                <div className='flex'>
                    <input onChange={ handleChange } type='text' className="input input-bordered w-96 rounded-lg mr-5" name='message' placeholder="Type here"></input>
                    <input onChange={ handleChange } type="text" name='image' className="input input-bordered w-96 rounded-lg" placeholder="Photo url" />
                </div>
                <div>
                    <input onChange={ handleChange } className="btn btn-primary px-5 mt-5 text-lg" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default Input;

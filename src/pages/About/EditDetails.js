import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const EditDetails = ( { details } ) => {
    const { _id, name, email, institute, photoUrl, address } = details;
    const [ user, setUser ] = useState( details )


    // handle user create
    const handleUpdate = event => {
        event.preventDefault();

        fetch( `http://localhost:5000/users/${ _id }`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( user )
        } )
            .then( res => res.json() )
            .then( data => {
                toast.success( 'updated successfully' )
            } )
    }

    const handleChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = { ...user };
        newUser[ field ] = value;
        setUser( newUser )
    }


    return (
        <div>
            <input type="checkbox" id="details-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="details-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="hero w-full mt-5">
                        <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-10">
                            <h1 className="text-4xl text-center font-bold">Update Profile </h1>
                            <form onSubmit={ handleUpdate } className="card-body">
                                <div className="form-control">
                                    <input onChange={ handleChange } type="text" defaultValue={ name } name='name' placeholder="Enter your name" className="input input-bordered rounded-lg" />
                                </div>

                                <div className="form-control">
                                    <input onChange={ handleChange } type="email" defaultValue={ email } name='email' placeholder="Enter your email" className="input input-bordered rounded-lg" />
                                </div>

                                <div className="form-control">
                                    <input onChange={ handleChange } type="text" defaultValue={ photoUrl } name='photoUrl' placeholder="photo url" className="input input-bordered rounded-lg" />
                                </div>

                                <div className="form-control">
                                    <input onChange={ handleChange } type="text" defaultValue={ institute } name='institute' placeholder="your institute" className="input input-bordered rounded-lg" />
                                </div>

                                <div className="form-control">
                                    <input onChange={ handleChange } type="text" defaultValue={ address } name='address' placeholder="your address" className="input input-bordered rounded-lg" />
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary text-lg" type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDetails;

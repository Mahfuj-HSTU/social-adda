import React from 'react';

const MediaCard = ( { post } ) => {
    const { name, photoUrl, message, image, date } = post;

    return (
        <div>
            <div className="card card-compact w-2/5 bg-base-100 shadow-2xl mx-auto p-10 my-7">
                <div className='text-start flex mb-5'>

                    <figure><img className='w-14 h-14 rounded-full mr-3' src={ photoUrl } alt="profile" /></figure>
                    <div className=' mt-1'>
                        <h2 className='text-2xl'>{ name }</h2>
                        <h4>{ date }</h4> </div>
                </div>
                <figure><img src={ image } alt="loading" /></figure>
                <div className="card-body text-start mt-5">
                    <h2 className='text-2xl mb-3'>{ message }</h2>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;

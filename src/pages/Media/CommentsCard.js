import React from 'react';

const CommentsCard = ( { cmnt } ) => {
    const { Name, comment, userPhoto } = cmnt;
    // console.log( cmnt );
    return (
        <div>
            <div className="card-body">
                <div className='flex'>
                    <img className=' mr-2 rounded-full' src={ userPhoto || 'user' } alt="profile" height='50px' width='50px' />
                    <h2 className="card-title">
                        { Name }
                    </h2>
                </div>
                <p className='text-start'>{ comment }</p>
            </div>
        </div>
    );
};

export default CommentsCard;

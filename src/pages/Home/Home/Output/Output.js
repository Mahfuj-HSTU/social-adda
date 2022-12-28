import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Output = () => {

    const { data: posts = [] } = useQuery( {
        queryKey: [ 'posts' ],
        queryFn: () => fetch( 'http://localhost:5000/posts' )
            .then( res => res.json() )
    } )


    return (
        <div>
            <h3>get post</h3>
        </div>
    );
};

export default Output;

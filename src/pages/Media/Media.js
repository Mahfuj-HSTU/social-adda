import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';
import MediaCard from './MediaCard';

const Media = () => {

    const { data: posts = [], isLoading } = useQuery( {
        queryKey: [ 'posts' ],
        queryFn: () => fetch( 'http://localhost:5000/posts' )
            .then( res => res.json() )
    } )

    if ( isLoading ) {
        <Loading></Loading>
    }

    return (
        <div>
            <div>
                {
                    posts.map( post => <MediaCard key={ post._id } post={ post }></MediaCard> )
                }
            </div>
        </div>
    );
};

export default Media;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../components/shared/common/Loading';

const LostAndFoundItems = () => {
    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get('https://where-is-it-server-xi.vercel.app/allItems');
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return 'An error has occurred ' + error.message;
    }


    return (
        <div>
            number of posts : {posts.length}
        </div>
    );
};

export default LostAndFoundItems;
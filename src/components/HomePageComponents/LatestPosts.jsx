import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../shared/common/Loading';
import LFItemCard from '../shared/LfItems/LFItemCard';
import { Link } from 'react-router';

const LatestPosts = () => {
    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get('https://where-is-it-server-xi.vercel.app/latestPosts');

            return res.data;
        }
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return 'An error has occurred ' + error.message;
    }

    return (
        <section className='w-11/12 mx-auto my-20 space-y-4'>
            <h3 className='text-3xl text-center font-bold text-pink-600'>Latest Find & Lost Posts</h3>
            <div className='w-4/5 mx-auto lg:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    posts.map(post => <LFItemCard key={post._id} post={post}></LFItemCard>)
                }
            </div>
            <div className='text-center'>
                <Link to='/allItems'>
                    <button className="btn btn-secondary btn-wide lg:btn-lg">See All</button>
                </Link>
            </div>
        </section>
    );
};

export default LatestPosts;
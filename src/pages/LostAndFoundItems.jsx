import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../components/shared/common/Loading';
import { useLoaderData } from 'react-router';
import LFItemCard from '../components/shared/LfItems/LFItemCard';


const LostAndFoundItems = () => {
    const { count } = useLoaderData();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);

    const totalPage = Math.ceil(count / itemsPerPage);
    const pages = [...Array(totalPage).keys()];

    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axios.get(`https://where-is-it-server-xi.vercel.app/allItems?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return 'An error has occurred ' + error.message;
    }

    const handleItemsPerPage = (e) => {
        const i = parseInt(e.target.value);
        setItemsPerPage(i);
        setCurrentPage(0);
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            const newCurrentPage = currentPage - 1;
            setCurrentPage(newCurrentPage);
        }
    }

    const handleNext = () => {
        if(currentPage < pages.length - 1){
            const newCurrentPage = currentPage + 1;
            setCurrentPage(newCurrentPage);
        }
    }


    return (
        <section className='w-11/12 mx-auto my-20 space-y-4'>
            <h3 className='text-3xl text-center font-bold text-pink-600'>Latest Find & Lost Posts</h3>
            <div className='w-4/5 mx-auto lg:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    posts.map(post => <LFItemCard key={post._id}></LFItemCard>)
                }
            </div>
            {/* pagination */}
            <div className='flex flex-wrap gap-3 justify-center'>
                <button onClick={handlePrev} className='btn btn-ghost'> Prev</button>
                {
                    pages.map((page, idx) => <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'btn btn-secondary' : 'btn btn-outline'}
                        key={idx}>
                        {page + 1}
                    </button>)
                }
                <button onClick={handleNext} className='btn btn-ghost'>Next</button>
                <select onChange={handleItemsPerPage} defaultValue="items per page" className='w-24 text-xs select'>
                    <option disabled>items per page</option>
                    <option>6</option>
                    <option>8</option>
                    <option>9</option>
                </select>
            </div>
        </section>
    );
};

export default LostAndFoundItems;
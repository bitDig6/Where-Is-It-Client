import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../components/shared/common/Loading';
import { Link, useLoaderData, useNavigate } from 'react-router';
import LFItemCard from '../components/shared/LfItems/LFItemCard';
import { BiSolidGrid } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import useDynamicTitle from '../hooks/useDynamicTitle';

const LostAndFoundItems = () => {
    const addDynamicTitle = useDynamicTitle();
    addDynamicTitle('All Items');

    const { count } = useLoaderData();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [table, setTable] = useState(false);
    const [card, setCard] = useState(true);
    const navigate = useNavigate();

    const totalPage = Math.ceil(count / itemsPerPage);
    const pages = [...Array(totalPage).keys()];

    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axios.get(`https://where-is-it-server-xi.vercel.app/allItems?page=${currentPage}&size=${itemsPerPage}`, {});
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return error.message;
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
        if (currentPage < pages.length - 1) {
            const newCurrentPage = currentPage + 1;
            setCurrentPage(newCurrentPage);
        }
    }

    const handleCardLayout = () => {
        setCard(true);
        setTable(false);
    }

    const handleTableLayout = () => {
        setTable(true);
        setCard(false);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        const term = e.target.term.value;
        navigate(`/searchItem/${term}`);
    }


    return (
        <section className='w-11/12 mx-auto my-20 space-y-4'>
            <h3 className='text-3xl text-center font-bold text-pink-600'>Latest Find & Lost Posts</h3>
            <div>
                {/* search bar */}
                <div className='lg:w-4/5 mx-auto flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between'>
                    <div>
                        <form onSubmit={handleFilter} className='join'>
                            <input className='input join-item lg:w-96' name="term" type="search" required placeholder="Search Item" />
                            <button className='btn btn-neutral'>Search</button>
                        </form>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div>View: </div>
                        <div className='tooltip' data-tip="table layout">
                            <button onClick={handleTableLayout} className='btn btn-primary'><BiSolidGrid></BiSolidGrid></button>
                        </div>
                        <div className='tooltip' data-tip="card layout">
                            <button onClick={handleCardLayout} className='btn btn-primary'><IoMenu></IoMenu></button></div>
                    </div>
                </div>
            </div>

            {/* card layout */}
            {
                card && <div className='w-4/5 mx-auto lg:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        posts.map(post => <LFItemCard key={post._id} post={post}></LFItemCard>)
                    }
                </div>
            }
            {/* table layout */}
            {
                table && <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Lost/Found Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(post => <tr key={post._id}>
                                    <td>
                                        <div className='flex items-center gap-3'>
                                            <div className='avatar'>
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={post.imageUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='font-bold'>{post.title}</div>
                                                <div className='text-sm opacity-50'>{post.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{post.date}</td>
                                    <td>
                                        <div className='flex items-center gap-3'>
                                            <div className='max-w-32 truncate'>
                                                {post.description}
                                            </div>
                                            <Link to={`/items/${post._id}`}>
                                                <button className='btn btn-link'>See Details</button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import Loading from '../components/shared/common/Loading';
import LFItemCard from '../components/shared/LfItems/LFItemCard';
import { BiSolidGrid } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import useDynamicTitle from '../hooks/useDynamicTitle';

const SearchItems = () => {
    const addDynamicTitle = useDynamicTitle();
    addDynamicTitle('Search Results');

    const { search } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(true);
    const [table, setTable] = useState(false);

    const { isPending, error, data: filteredItems } = useQuery({
        queryKey: ['filteredItems', search],
        queryFn: async () => {
            const res = await axios.get(`https://where-is-it-server-xi.vercel.app/searchItem?search=${search}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return error.message;
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
        <div className='w-11/12 mx-auto my-20 space-y-4 min-h-screen'>
            {
                filteredItems.length === 0 ?
                    <div className='my-20 flex flex-col items-center gap-5'>
                        <div className='lg:w-4/5 mx-auto flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between'>
                            {/* search bar */}
                            <div>
                                <form onSubmit={handleFilter} className='join'>
                                    <input className='input join-item lg:w-96' name="term" type="search" required placeholder="Search item by post title or lost/found location" />
                                    <button className='btn btn-neutral'>Search</button>
                                </form>
                            </div>
                            {/* change view format */}
                            <div className='flex gap-3 items-center'>
                                <div>View: </div>
                                <div className='tooltip' data-tip="table layout">
                                    <button onClick={handleTableLayout} className='btn btn-primary'><BiSolidGrid></BiSolidGrid></button>
                                </div>
                                <div className='tooltip' data-tip="card layout">
                                    <button onClick={handleCardLayout} className='btn btn-primary'><IoMenu></IoMenu></button></div>
                            </div>
                        </div>
                        <h2 className='my-20 text-xl text-center font-semibold'>No posts found for '{search}'. Search with another keyword</h2>
                    </div>
                    : <div>
                        <h2 className='mb-5 text-xl text-center font-semibold'>Showing results for '{search}'</h2>
                        <div className='lg:w-4/5 mx-auto flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between'>
                            {/* search bar */}
                            <div>
                                <form onSubmit={handleFilter} className='join'>
                                    <input className='input join-item lg:w-96' name="term" type="search" required placeholder="Search item by post title or lost/found location" />
                                    <button className='btn btn-neutral'>Search</button>
                                </form>
                            </div>
                            {/* change view format */}
                            <div className='flex gap-3 items-center'>
                                <div>View: </div>
                                <div className='tooltip' data-tip="table layout">
                                    <button onClick={handleTableLayout} className='btn btn-primary'><BiSolidGrid></BiSolidGrid></button>
                                </div>
                                <div className='tooltip' data-tip="card layout">
                                    <button onClick={handleCardLayout} className='btn btn-primary'><IoMenu></IoMenu></button></div>
                            </div>
                        </div>

                        {
                            card && <div className='w-4/5 mx-auto lg:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    filteredItems.map(filteredItem => <LFItemCard key={filteredItem._id} post={filteredItem}></LFItemCard>)
                                }
                            </div>
                        }

                        {
                            table && <div className="w-4/5 mx-auto my-20 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>filteredItem</th>
                                            <th>Lost/Found Date</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredItems.map(filteredItem => <tr key={filteredItem._id}>
                                                <td>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='avatar'>
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={filteredItem.imageUrl}
                                                                    alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='font-bold'>{filteredItem.title}</div>
                                                            <div className='text-sm opacity-50'>{filteredItem.location}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{filteredItem.date}</td>
                                                <td>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='max-w-32 truncate'>
                                                            {filteredItem.description}
                                                        </div>
                                                        <Link to={`/items/${filteredItem._id}`}>
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
                    </div>
            }


        </div>
    );
};

export default SearchItems;
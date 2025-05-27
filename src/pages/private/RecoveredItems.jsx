import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/shared/common/Loading';
import { Link } from 'react-router';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const RecoveredItems = () => {
    const addDynamicTitle = useDynamicTitle()
    addDynamicTitle('Recovered Items');

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { isPending, error, data: recoveredItems } = useQuery({
        queryKey: ['recoveredItems'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allRecovered?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return error.message;
    }

    console.log(recoveredItems);

    if (recoveredItems?.length === 0) {
        return (
            <div className='my-20 flex flex-col items-center gap-5'>
                <h2 className='text-xl text-center font-bold'>You currently have No Recovered Items</h2>
                <Link to='/allItems'>
                    <button className='text-base btn btn-link'>See Posts</button>
                </Link>
            </div>
        );
    }

    return (
        <div className='min-h-screen py-20'>
            <div className="w-4/5 mx-auto overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Item Category</th>
                            <th>Recovered Date</th>
                            <th>Recovered Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recoveredItems.map( rItem => <tr key={rItem._id}>
                                <td>
                                    <div className='flex gap-3 items-center'>
                                        <div className='avatar'>
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={rItem.imageUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className='font-bold'>{rItem.title}</div>
                                    </div>
                                </td>
                                <td>{rItem.category}</td>
                                <td>{rItem.recoveryDate}</td>
                                <td>{rItem.recoveryLocation}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecoveredItems;
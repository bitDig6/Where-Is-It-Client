import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/shared/common/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const MyItems = () => {
    const addDynamicTitle = useDynamicTitle();
    addDynamicTitle('My Items');

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { isPending, error, data: myItems } = useQuery({
        queryKey: ['myItems'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myItems?email=${user.email}`, {});
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return error.message;
    }

    if (myItems.length === 0) {
        return (
            <div className='my-20 flex flex-col items-center gap-5'>
                <h2 className='text-xl text-center font-bold'>You currently have No Posts</h2>
                <Link to='/addItems'>
                    <button className='text-base btn btn-link'>Add a Post</button>
                </Link>
            </div>
        );
    }

    const handleDeleteItem = id => {
        Swal.fire({
            title: "Are you sure to delete this post?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/items/${id}`, {})
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                            queryClient.invalidateQueries(['myItems']);
                        }
                    }).catch(error => {
                        toast.error(error.message);
                    })
            }
        })
    }

    return (
        <div className='min-h-screen py-20'>
            <div className="w-4/5 mx-auto overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Lost/Found Date</th>
                            <th>Post Type</th>
                            <th>Item Category</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myItems.map(myItem => <tr key={myItem._id}>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <div className='avatar'>
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={myItem.imageUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>{myItem.title}</div>
                                            <div className='text-sm opacity-50'>{myItem.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{myItem.date}</td>
                                <td>{myItem.postType}</td>
                                <td>{myItem.category}</td>
                                <td>
                                    <Link to={`/items/${myItem._id}`} className='text-blue-400 underline underline-offset-2'>
                                       See Details
                                    </Link>
                                </td>
                                <td>
                                    <div className='flex gap-2'>

                                        <Link to={`/updateItems/${myItem._id}`}>
                                            <button className='btn btn-info'>Update</button>
                                        </Link>
                                        <button onClick={() => handleDeleteItem(myItem._id)} className='btn btn-error'>Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyItems;
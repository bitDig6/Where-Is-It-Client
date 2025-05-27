import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/shared/common/Loading';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const UpdateItems = () => {
    const addDynamicTitle = useDynamicTitle();
    addDynamicTitle('Update Item');

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { isPending, error, data: post } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosSecure(`/items/${id}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return error.message;
    }

    const { title, postType, imageUrl, description, category, date, location, isRecovered } = post;

    const handleUpdateItem = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
        updatedData.isRecovered = isRecovered === "Recovered" ? true : false;
        console.log(updatedData);

        Swal.fire({
            title: "Are you sure to modify this post?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update!"
        }).then(res => {
            if (res.isConfirmed) {
                axiosSecure.patch(`/items/${id}`, updatedData)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Update Successful!",
                                text: "Your post has been updated.",
                                icon: "success"
                            });
                            queryClient.invalidateQueries(['post']);
                        }
                    }).catch(error => {
                        Swal.fire({
                            title: "Failed!",
                            text: error.message,
                            icon: "error"
                        });
                    })
            }
        }).catch(error => {
            Swal.fire({
                title: "Failed!",
                text: error.message,
                icon: "error"
            });
        })

    }

    return (
        <div className='min-h-screen py-20 bg-gradient-to-l from-[#FFC7C7] to-[#EDFFBB]'>
            <div className='w-3/5 mx-auto'>
                <h1 className='text-3xl text-black font-bold font-inter text-center mb-5'>Update Your Post</h1>
                <form onSubmit={handleUpdateItem} className="fieldset space-y-3 *:w-full">
                    {/* post type */}
                    <label className="label text-black">Post Type</label>
                    <select defaultValue={postType} name='postType' required className="select">
                        <option>Lost</option>
                        <option>Found</option>
                    </select>

                    {/* imageUrl */}
                    <label className="label text-black">Thumbnail</label>
                    <input type="url" className="input" name='imageUrl' required autoComplete='off' defaultValue={imageUrl} />

                    {/* title */}
                    <label className="label text-black">Title</label>
                    <input type="text" name='title' required autoComplete='off' className="input" defaultValue={title} />

                    {/* description */}
                    <label className="label text-black">Description</label>
                    <textarea className='textarea' name="description" autoComplete='off' defaultValue={description}></textarea>

                    {/* category */}
                    <label className="label text-black">Item Category</label>
                    <select defaultValue={category} name='category' required className="select">
                        <option>Pets</option>
                        <option>Accessories</option>
                        <option>Gadgets</option>
                        <option>Documents</option>
                    </select>

                    {/* location */}
                    <label className="label text-black">Location</label>
                    <input type="text" name='location' autoComplete='off' required className="input" defaultValue={location} />

                    {/* date */}
                    <label className="label text-black">Date</label>
                    <input type="date" name="date" className='input' defaultValue={date} />

                    {/* item recovery status */}
                    <label className='label text-black'>Recovery Status</label>
                    {/* <input type="text" name="isRecovered" className='input' defaultValue={} /> */}
                    <select defaultValue={isRecovered ? 'Recovered' : 'Not Recovered'} name='isRecovered' required className="select">
                        <option>{isRecovered ? 'Recovered' : 'Not Recovered'}</option>
                        <option>Recovered</option>
                        <option>Not Recovered</option>
                    </select>


                    {/* userName */}
                    <label className="label text-black">User Name</label>
                    <input type="text" className="input" defaultValue={user?.displayName} readOnly />

                    {/* user email */}
                    <label className="label text-black">HR Email</label>
                    <input type="email" className="input" defaultValue={user?.email} readOnly />

                    <button className="btn btn-neutral mt-4">Update Post</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;
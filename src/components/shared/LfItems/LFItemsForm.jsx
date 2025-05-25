import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const LFItemsForm = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());

    const handleAddItem = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemData = Object.fromEntries(formData.entries());
        itemData.date = startDate.toISOString().split('T')[0];
        itemData.userEmail = user?.email;
        itemData.userName = user?.displayName;

        axiosSecure.post('/allItems', itemData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Posted Successfully!",
                        text: "Your item has been posted!",
                        icon: "success"
                    })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Post Failed!",
                    text: error.message,
                    icon: "error"
                })
            });
    }

    return (
        <div className='w-3/5 mx-auto'>
            <form onSubmit={handleAddItem} className="fieldset space-y-3 *:w-full">
                {/* post type */}
                <label className="label text-black">Post Type</label>
                <select defaultValue="Select post type" name='postType' required className="select">
                    <option disabled={true}>Select post type</option>
                    <option>Lost</option>
                    <option>Found</option>
                </select>

                {/* imageUrl */}
                <label className="label text-black">Thumbnail</label>
                <input type="url" className="input" name='imageUrl' required placeholder="Thumbnail" />

                {/* title */}
                <label className="label text-black">Title</label>
                <input type="text" name='title' required className="input" placeholder="Post Title" />

                {/* description */}
                <label className="label text-black">Description</label>
                <textarea className='textarea' name="description" placeholder='add some recognizable information about the item'></textarea>

                {/* category */}
                <label className="label text-black">Item Category</label>
                <select defaultValue="Select item category" name='category' required className="select">
                    <option disabled={true}>Select item category</option>
                    <option>Pets</option>
                    <option>Accessories</option>
                    <option>Gadgets</option>
                    <option>Documents</option>
                </select>

                {/* location */}
                <label className="label text-black">Location</label>
                <input type="text" name='location' required className="input" placeholder="Location of the Lost or Found Item" />

                {/* date */}
                <label className="label text-black">Date</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


                {/* userName */}
                <label className="label text-black">User Name</label>
                <input type="text" className="input" defaultValue={user?.displayName} disabled />

                {/* user email */}
                <label className="label">HR Email</label>
                <input type="email" className="input" defaultValue={user?.email} disabled />

                <button className="btn btn-neutral mt-4">Add Post</button>
            </form>
        </div>

    );
};

export default LFItemsForm;
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../../hooks/useAuth';

const RecoveryModal = ({ isRecovered, handleItemRecovery }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth();

    return (
        <>
            <dialog id="dialog" className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box text-center bg-linear-to-r from-sky-500 to-indigo-500">
                    <h3 className="font-bold text-lg mb-5">Update Item Status</h3>
                    {/* close modal button */}
                    <form method="dialog">
                        <button className="text-base btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                    </form>
                    {/* recover item form */}
                    {
                        isRecovered ?
                            <p>This Item is already Recovered</p>
                            :
                            <form onSubmit={handleItemRecovery} className="w-4/5 mx-auto p-5 rounded-xl fieldset bg-sky-400 shadow-xl">
                                <label className="label text-black">Recovered Location</label>
                                <input type="text" name='location' className="input w-full text-black bg-blue-200" placeholder="Item Receive/Return Location" required autoComplete='off' />
                                <label className="label text-black">Date of Item Return or Receive</label>
                                <DatePicker className='w-full input bg-blue-200 text-black' name='date' value={startDate} selected={startDate} onChange={(date) => setStartDate(date)} />

                                <label className="label text-black">User Name</label>
                                <input type="text" className="input w-full text-black bg-blue-200" defaultValue={user.displayName} readOnly />

                                <label className="label text-black">User Email</label>
                                <input type="email" className="input w-full text-black bg-blue-200" defaultValue={user.email} readOnly />

                                <label className='label text-black'>Image URL</label>
                                <input type="url" className='w-full input text-black bg-blue-200' defaultValue={user.photoURL} readOnly />
                                <button className="btn btn-neutral rounded-full mt-4">Submit</button>
                            </form>
                    }
                </div>
            </dialog></>
    );
};

export default RecoveryModal;
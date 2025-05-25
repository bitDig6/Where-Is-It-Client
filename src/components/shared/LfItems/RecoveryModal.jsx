import React from 'react';

const Modal = ({ total }) => {


    // const handleNavigate = () => {
    //     navigate('/');
    // }


    return (
        <>
            <dialog id="dialog" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-center">
                    {/* <img className="w-auto mx-auto" src={} alt="" /> */}
                    <h3 className="font-bold text-lg">Payment Successful</h3>
                    <p className="py-4">Thank you for purchasing.</p>
                    <p>Total: ${total}</p>
                    <button className="btn mt-4 bg-gray-300 hover:bg-gray-400 text-base font-bold hover:text-white w-full rounded-full">
                        Close
                    </button>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
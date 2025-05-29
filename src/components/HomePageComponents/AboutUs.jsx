import React from 'react';

const AboutUs = () => {
    return (
        <section className='w-11/12 mx-auto my-20 space-y-4'>
            <h3 className='text-3xl text-center font-bold text-pink-600'>About Us</h3>
            <p className='text-xl text-center font-semibold text-pink-400'><span className='text-2xl text-sky-400 font-playwrite-dk-loopet'>Where It Is is</span> one of the largest and trusted Web Archive For Lost and Find Items.</p>

            <div className='w-4/5 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* card 1 */}
                <div className="card bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-700 to-90% shadow-xl shadow-sky-300">
                    <div className="card-body items-center text-center text-pink-700">
                        <h2 className="card-title text-2xl font-bold">Head Office and Branches</h2>
                        <div className='text-base font-semibold text-left space-y-2'>
                            <p><span className='text-pink-900'>Main: </span> 32, Atish Dip Das Road, Shabujbag Thana, Dhaka-1214</p>
                            <p><span className='text-pink-900'>Chittagong: </span> 54, Kadamtoli Road, Raujan Thana, Chittagong</p>
                            <p><span className='text-pink-900'>Khulna: </span> 127/2, Shimulia, Rupsha Thana, Khulna</p>
                        </div>
                    </div>
                </div>
                {/* card 2 */}
                <div className="card bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-700 to-90% shadow-xl shadow-sky-300">
                    <div className="card-body items-center text-center text-pink-700">
                        <h2 className="card-title text-2xl font-bold">Contact Info</h2>
                        <div className='text-base font-semibold text-left space-y-2'>
                            <p>
                                <span className='text-pink-900'>
                                    Hotline:
                                </span>
                                <span className='text-blue-900 underline'>+880-2-5789-9761</span></p>

                            <p>
                                <span className='text-pink-900'>
                                    Mobile: </span>
                                <span className='text-blue-900 underline'>
                                    +880195622301
                                </span>
                            </p>

                            <p>
                                <span className='text-pink-900'>
                                    Gmail: </span>
                                <span className='text-blue-900 underline'>where-is-it@gmail.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
import React from 'react';
import userIcon from '../../assets/user.png';

const Testimonials = () => {
    return (
        <section className='w-11/12 mx-auto my-20 space-y-4'>
            <h3 className='text-3xl text-center font-bold text-pink-600'>Testimonials</h3>
            <p className='text-xl text-center font-semibold text-pink-400'>Here's some testimonials from different people who were satisfied with our assistance and services.</p>
            {/* testimonies */}
            <div className='w-4/5 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* testimony 1 */}
                <div className='p-5 bg-pink-100 rounded-xl border border-pink-100 shadow-xl shadow-red-200 space-y-4'>
                    <div className='avatar'>
                        <div className="w-16 rounded-full">
                            <img src={userIcon} />
                        </div>
                    </div>
                    <p className='font-inter text-black font-semibold'>
                        <i>"I found my Lost Work Laptop in a few days with the help of 'Where Is It' which I couldn't find even after I filed a GD at the Police Station."</i><br />
                        - Shamsul Hossain, Software Engineer
                    </p>
                </div>
                {/* testimony 2 */}
                <div className='p-5 bg-pink-100 rounded-xl border border-pink-100 shadow-xl shadow-red-200 space-y-4'>
                    <div className='avatar'>
                        <div className="w-16 rounded-full">
                            <img src={userIcon} />
                        </div>
                    </div>
                    <p className='font-inter text-black font-semibold'>
                        <i>"I found my Lost Work Laptop in a few days with the help of 'Where Is It' which I couldn't find even after I filed a GD at the Police Station."</i><br />
                        - Abdul Sajjad, Businessman
                    </p>
                </div>
            </div>           
        </section>
    );
};

export default Testimonials;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <section className='overflow-hidden'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                breakpoints={{
                    640: {
                        spaceBetween: 10,
                        slidesPerView: 1
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 1
                    },
                    1024: {
                        spaceBetween: 30,
                        slidesPerView: 1
                    }
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,

                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper bg-black h-dvw lg:h-dvh"
            >

                <SwiperSlide className='h-full bg-gradient-to-br from-white to-lime-400'>
                    <div className="hero h-full">
                        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                            <img
                                src="https://i.ibb.co/0Hftck6/lafb1.jpg"
                                className="w-40 lg:w-96 rounded-lg shadow-2xl"
                            />
                            <div className='w-1/2 mx-auto'>
                                <h1 className="text-3xl text-center lg:text-left lg:text-5xl font-bold text-lime-500"><span className='text-blue-500'>Search</span> And <span className='text-green-700'>Reclaim</span> <br /> <span className='text-red-500'>Lost Belongings</span> <br /> With Ease</h1>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='px-5 absolute flex flex-col gap-4 justify-center items-center inset-0 bg-[url("https://i.ibb.co/JWsFy7DJ/lafb2.jpg")] bg-no-repeat bg-cover bg-center'>
                        <h1 className='text-3xl lg:text-5xl font-bold text-black text-center'>Make A Post For An Item You Lost Or Found</h1>
                        <p className='lg:w-1/2 lg:mx-auto lg:text-justify text-center text-xl font-semibold text-black'>Sign Up with us and make posts to find your lost item or find the rightful owner for an unclaimed item or a lost pet.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='p-5 absolute flex flex-col gap-4 justify-center items-center inset-0 bg-[url("https://i.ibb.co/mrBg3ZQ1/lafb3.jpg")] bg-no-repeat bg-cover bg-center'>
                        <h1 className='text-5xl text-black font-bold text-center'>Connect With The Community</h1>
                        <p className='lg:w-1/2 lg:mx-auto lg:text-justify text-center text-xl text-black  font-semibold'>Get valuable information for a lost or found item or pet by looking into various amounts of posts made by the other users.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='p-5 absolute flex flex-col lg:flex-row justify-center lg:justify-end items-center inset-0 bg-[url("https://i.ibb.co/DfJhc2LW/lafb4.jpg")] bg-no-repeat bg-cover bg-center'>
                        <div className='hidden lg:visible'></div>
                        <div className='lg:w-5/12'>
                            <h1 className='text-5xl lg:text-5xl text-black text-center font-bold lg:mb-4'> Look For Your Pet</h1>
                            <p className='lg:px-4 text-center text-xl text-black font-semibold'>Look for your beloved pet.</p>
                        </div>
                    </div></SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='p-5 absolute flex flex-col lg:flex-row justify-center lg:justify-start lg:items-center inset-0 bg-[url("https://i.ibb.co/Lh0H5M5P/lafb5.jpg")] bg-no-repeat bg-cover bg-center'>
                        <div className='lg:w-1/2'>
                            <h1 className='text-3xl lg:text-5xl text-gray-300 text-center font-bold mb-4'>A Trustworthy Archive</h1>
                            <p className='lg:px-4 text-center lg:text-justify text-xl text-gray-200 font-semibold'>We are always determined to provide extreme assistance to the clients to recover or return the lost or found items. Read our blogs to learn about our versatile activities. Contact us anytime to receive any kind of assistance or information you need for your item.</p>
                        </div>
                        <div className='hidden lg:visible'></div>
                    </div></SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;
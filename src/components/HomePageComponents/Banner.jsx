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
                {/* no 1 slide img link:  */}

                <SwiperSlide className='h-full'>
                    <div className="hero h-full">
                        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                            <img
                                src="https://i.ibb.co/0Hftck6/lafb1.jpg"
                                className="w-40 lg:w-full rounded-lg shadow-2xl"
                            />
                            <div>
                                <h1 className="text-3xl text-center lg:text-left lg:text-5xl font-bold">Search And Reclaim Your Lost Belongings With Ease</h1>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='px-5 absolute flex flex-col gap-4 justify-center items-center inset-0 bg-[url("https://i.ibb.co/JWsFy7DJ/lafb2.jpg")] bg-no-repeat bg-cover bg-center'>
                        <h1 className='text-5xl font-bold text-black text-center'>Fund and Help Others</h1>
                        <p className='lg:w-1/2 lg:mx-auto lg:text-justify text-center text-xl font-semibold text-black'>Become a part of contributing to numerous social welfare and nonprofit campaigns and help people with innovative ideas to build their impactful and magnificent projects.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='p-5 absolute flex flex-col gap-4 justify-center items-center inset-0 bg-[url("https://i.ibb.co/mrBg3ZQ1/lafb3.jpg")] bg-no-repeat bg-cover bg-center'>
                        <h1 className='text-5xl text-black font-bold text-center'>Let's Make the Impossible, Possible</h1>
                        <p className='lg:w-1/2 lg:mx-auto lg:text-justify text-center text-xl text-black  font-semibold'> Join us today to play a role in something special. Together, we can make changes and bring your dreams to reality</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='relative h-full'>
                    <div className='p-5 absolute flex flex-col lg:flex-row justify-center lg:justify-end items-center inset-0 bg-[url("https://i.ibb.co/DfJhc2LW/lafb4.jpg")] bg-no-repeat bg-cover bg-center'>
                        <div className='hidden lg:visible'></div>
                        <div className='lg:w-5/12'>
                            <h1 className='text-5xl lg:text-5xl text-black text-center font-bold lg:mb-4'> Look For Your Pet</h1>
                            <p className='lg:px-4 text-center lg:text-justify text-xl text-black font-semibold'>Start your Business or become a entrepreneur with the help many of supportive and kind benefactors.</p>
                        </div>
                    </div></SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;
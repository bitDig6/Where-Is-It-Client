import React from 'react';
import Banner from '../components/HomePageComponents/Banner';
import LatestPosts from '../components/HomePageComponents/LatestPosts';
import useDynamicTitle from '../hooks/useDynamicTitle';
import AboutUs from '../components/HomePageComponents/AboutUs';

const Home = () => {
    const addDynamicTitle  = useDynamicTitle();
    addDynamicTitle('Home');

    return (
        <div className='pb-20 bg-gradient-to-r from-[#FFE9E9] to-[#EDFFBB]'>
            <Banner></Banner>
            <LatestPosts></LatestPosts>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;
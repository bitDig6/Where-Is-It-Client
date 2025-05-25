import React from 'react';
import Banner from '../components/HomePageComponents/Banner';
import LatestPosts from '../components/HomePageComponents/LatestPosts';

const Home = () => {

    return (
        <div className='pb-20 bg-gradient-to-r from-[#FFE9E9] to-[#EDFFBB]'>
            <Banner></Banner>
            <LatestPosts></LatestPosts>
        </div>
    );
};

export default Home;
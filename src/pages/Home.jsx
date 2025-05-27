import React from 'react';
import Banner from '../components/HomePageComponents/Banner';
import LatestPosts from '../components/HomePageComponents/LatestPosts';
import useDynamicTitle from '../hooks/useDynamicTitle';

const Home = () => {
    const addDynamicTitle  = useDynamicTitle();
    addDynamicTitle('Home');

    return (
        <div className='pb-20 bg-gradient-to-r from-[#FFE9E9] to-[#EDFFBB]'>
            <Banner></Banner>
            <LatestPosts></LatestPosts>
        </div>
    );
};

export default Home;
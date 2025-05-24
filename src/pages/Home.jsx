import React from 'react';
import Banner from '../components/HomePageComponents/Banner';
import LatestPosts from '../components/HomePageComponents/LatestPosts';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <LatestPosts></LatestPosts>
        </div>
    );
};

export default Home;
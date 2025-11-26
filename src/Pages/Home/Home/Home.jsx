import React from 'react';
import Banner from '../Banner/Banner';
import Howitwork from '../Howitwork/Howitwork';
import Ourservices from '../Ourservices/Ourservices';
import Brands from '../Brands/Brands';
import Reviwes from '../Reviwes/Reviwes';


const reviewspromise =fetch('reviews.json') .then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div>
                <Howitwork></Howitwork>
            </div>
            <div>
                <Ourservices></Ourservices>
            </div>
            <div>
                <Brands></Brands>
            </div>
            <div>
                <Reviwes reviewspromise ={reviewspromise}></Reviwes>
            </div>
        </div>
    );
};

export default Home;
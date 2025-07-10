import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import SuccessStory from './SuccessStory';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <h1 className="text-4xl text-center">6 premium card</h1>

      <HowItWorks />
      <SuccessCounter></SuccessCounter>
      <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;

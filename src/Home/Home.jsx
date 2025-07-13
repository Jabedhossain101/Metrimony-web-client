import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import SuccessStory from './SuccessStory';
import Faq from './Faq';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <h1 className="text-4xl text-center">6 premium card</h1>

      <HowItWorks />
      <SuccessCounter></SuccessCounter>
      <SuccessStory></SuccessStory>
      <Faq></Faq>
    </div>
  );
};

export default Home;

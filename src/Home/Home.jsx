import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import SuccessStory from './SuccessStory';
import Faq from './Faq';
import PremiumMembers from './PremiumMembers';
import Success from './Success';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <PremiumMembers></PremiumMembers>

      <HowItWorks />
      <SuccessCounter></SuccessCounter>

      <SuccessStory></SuccessStory>
      <Faq></Faq>
    </div>
  );
};

export default Home;

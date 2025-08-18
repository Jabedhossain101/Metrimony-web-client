import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import SuccessStory from './SuccessStory';
import Faq from './Faq';
import PremiumMembers from './PremiumMembers';
import Success from './Success';
import FeaturedBiodatas from './FeaturedBiodatas';
import MembershipPlans from './MembershipPlans';
import About from '../Components/About';
import CallToAction from './CallToAction';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <PremiumMembers></PremiumMembers>

      <HowItWorks />
      <SuccessCounter></SuccessCounter>

      <SuccessStory></SuccessStory>
      <MembershipPlans></MembershipPlans>
      <About></About>
      <CallToAction></CallToAction>
      <Faq></Faq>
    </div>
  );
};

export default Home;

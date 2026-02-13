import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
  return (
    <div>
      <div className='mb-16'>
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

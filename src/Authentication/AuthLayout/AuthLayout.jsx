import React from 'react';
import { Outlet } from 'react-router';
import loveImg from '../../assets/Alean.json';
import Lottie from 'lottie-react';

const AuthLayout = () => {
  return (
    <div className="flex flex-col max-w-6xl mx-auto md:flex-row items-center justify-between gap-4 p-4 mt-2">
      <div className="flex-1 justify-center flex w-full  ">
        <Lottie className="max-w-md " animationData={loveImg} loop={true} />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

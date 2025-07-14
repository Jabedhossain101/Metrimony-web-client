import React from 'react';
import { Link, Outlet } from 'react-router';
import loveImg from '../../assets/Alean.json';
import Lottie from 'lottie-react';

const AuthLayout = () => {
  return (
    <div className="flex flex-col max-w-6xl mx-auto md:flex-row items-center justify-between gap-4 p-4 mt-2">
      <Link
        to={'/'}
        className="border p-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition font-bold"
      >
        Go to Home
      </Link>
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

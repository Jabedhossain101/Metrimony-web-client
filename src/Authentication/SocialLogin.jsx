import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
  const { signInWithGoogle } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        navigate(from);
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition mb-2"
      >
        <FaGoogle className="text-lg" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;

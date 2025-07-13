import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseAuth from '../Hooks/UseAuth';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        navigate(from);
        console.log('User created successfully:', user);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br ">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Create Your <span className="text-blue-500">Account</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Create a password"
                required
              />
              {errors.password && errors.password.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer mb-1 "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Photo URL
            </label>
            <input
              type="text"
              {...register('photoURL')}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Paste your photo URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md px-4 py-2 transition"
          >
            Register
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500 font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div>
          <SocialLogin></SocialLogin>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

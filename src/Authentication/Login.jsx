import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import SocialLogin from './SocialLogin';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { email, password } = data;
    signInUser(email, password)
      .then(result => {
        navigate(from);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome Back!',
          text: 'You have logged in successfully.',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'rounded-[2rem] font-serif',
          },
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
          confirmButtonColor: '#db2777',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf9] px-6 py-12 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-[100px] opacity-50 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full blur-[100px] opacity-50 -z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-14 w-full max-w-lg z-10"
      >
        {/* Brand Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600 rounded-2xl shadow-lg shadow-pink-200 mb-6 text-white">
            <Heart size={32} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
            Welcome <span className="text-pink-600 italic">Back</span>
          </h2>
          <p className="text-gray-500 mt-2 font-light">
            Login to continue your search for the perfect match.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                <Mail size={20} />
              </span>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full bg-white border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/5 transition-all text-gray-700 placeholder:text-gray-300"
                placeholder="example@mail.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                Password
              </label>
              <Link
                to="#"
                className="text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                <Lock size={20} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className="w-full bg-white border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/5 transition-all text-gray-700 placeholder:text-gray-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gray-900 hover:bg-pink-600 text-white font-bold rounded-2xl py-4 transition-all shadow-xl hover:shadow-pink-200"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-100"></div>
          <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
            Social Login
          </span>
          <div className="flex-grow h-px bg-gray-100"></div>
        </div>

        {/* Social Login Component */}
        <div className="space-y-4">
          <SocialLogin />
        </div>

        {/* Bottom Link */}
        <p className="text-center text-gray-500 mt-10 text-sm font-light">
          New to Soulmate?{' '}
          <Link
            to="/register"
            className="text-pink-600 font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

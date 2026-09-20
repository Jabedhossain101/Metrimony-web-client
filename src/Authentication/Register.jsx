import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, Image, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const saveUserToDB = async userInfo => {
    try {
      const res = await fetch('https://metrimony-server-ten.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      console.log('User saved to DB:', data);
    } catch (error) {
      console.error('Failed to save user to DB:', error);
    }
  };

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(result => {
        const firebaseUser = result.user;

        const userInfo = {
          uid: firebaseUser.uid,
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
          role: 'user', // default role
        };

        saveUserToDB(userInfo);

        navigate(from);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome to Soulmate!',
          text: 'Registration successful.',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
             popup: 'rounded-[2rem] font-serif',
          }
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#9F1239',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50 -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] opacity-50 -z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/80 backdrop-blur-xl border border-border rounded-[3rem] shadow-xl p-10 md:p-14 w-full max-w-xl z-10 my-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg shadow-primary/20 mb-6 text-primary-foreground">
             <Heart size={32} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-foreground leading-tight">
            Create Your <span className="text-primary italic">Account</span>
          </h2>
          <p className="text-muted-foreground mt-2 font-light">
            Start your journey to finding the perfect match.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Name Field */}
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                 Full Name
               </label>
               <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                   <User size={20} />
                 </span>
                 <input
                   type="text"
                   {...register('name', { required: 'Name is required' })}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
                   placeholder="John Doe"
                 />
               </div>
               {errors.name && (
                 <p className="text-destructive text-xs ml-1">{errors.name.message}</p>
               )}
             </div>

             {/* Email Field */}
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                 Email Address
               </label>
               <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                   <Mail size={20} />
                 </span>
                 <input
                   type="email"
                   {...register('email', { required: 'Email is required' })}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
                   placeholder="mail@example.com"
                 />
               </div>
               {errors.email && (
                 <p className="text-destructive text-xs ml-1">{errors.email.message}</p>
               )}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Photo URL Field */}
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                 Photo URL
               </label>
               <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                   <Image size={20} />
                 </span>
                 <input
                   type="text"
                   {...register('photoURL', { required: 'Photo URL is required' })}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
                   placeholder="https://..."
                 />
               </div>
               {errors.photoURL && (
                 <p className="text-destructive text-xs ml-1">{errors.photoURL.message}</p>
               )}
             </div>

             {/* Password Field */}
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                 Password
               </label>
               <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                   <Lock size={20} />
                 </span>
                 <input
                   type={showPassword ? 'text' : 'password'}
                   {...register('password', {
                     required: 'Password is required',
                     minLength: { value: 6, message: 'Must be at least 6 characters' },
                     pattern: {
                       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                       message: 'Needs uppercase, lowercase & number',
                     },
                   })}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
                   placeholder="••••••••"
                 />
                 <button
                   type="button"
                   onClick={togglePassword}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
               </div>
               {errors.password && (
                 <p className="text-destructive text-xs ml-1">{errors.password.message}</p>
               )}
             </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl py-4 transition-all shadow-xl hover:shadow-primary/20 mt-4"
          >
            Register Now
          </motion.button>
        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="flex-grow h-px bg-border"></div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Or Join With
          </span>
          <div className="flex-grow h-px bg-border"></div>
        </div>

        <SocialLogin />

        <p className="text-center text-muted-foreground mt-10 text-sm font-light">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

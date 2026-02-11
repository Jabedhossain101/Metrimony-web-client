import React from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Search,
  Heart,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: 'Create Profile',
      desc: 'Build your detailed biodata and showcase your authentic self.',
      tag: 'Step 01',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Find Matches',
      desc: 'Use our advanced filters to find profiles aligned with your values.',
      tag: 'Step 02',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Initiate Chat',
      desc: 'Connect securely with interested members through our platform.',
      tag: 'Step 03',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: 'Verify Intent',
      desc: 'Discuss compatibility and involve families for a blessed union.',
      tag: 'Step 04',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'The Big Day',
      desc: 'Complete your journey and start your beautiful future together.',
      tag: 'Step 05',
    },
  ];

  return (
    <section className="relative py-28 bg-[#FCFBFA] overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -mr-64 -mt-32" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-rose-500 text-[11px] font-bold uppercase tracking-[0.4em]">
              The Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-medium text-slate-900"
          >
            Path to Your <span className="italic text-rose-600">Soulmate</span>
          </motion.h2>
          <p className="mt-6 text-slate-500 font-light max-w-xl mx-auto text-lg">
            A simple, secure, and dignified process designed to help you find
            your perfect life partner.
          </p>
        </div>

        {/* Steps Flexbox/Grid - Centered and Balanced */}
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(20%-2rem)] group"
            >
              {/* Vertical Connector for Mobile / Horizontal for Desktop (Logic simplified for UI) */}
              {index !== steps.length - 1 && (
                <div className="hidden xl:block absolute top-14 left-full w-full h-[1px] bg-slate-100 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="w-24 h-24 mb-6 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-rose-500 shadow-sm transition-all duration-500 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-rose-100 group-hover:-translate-y-2">
                  {step.icon}
                </div>

                {/* Tag */}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {step.tag}
                </span>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light px-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block p-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full max-w-2xl mb-12" />

          <Link
            to="/login"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold overflow-hidden transition-all hover:pr-12"
          >
            <span className="relative z-10">Start Your Free Journey</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <p className="mt-6 text-slate-400 text-sm">
            Already have a profile?{' '}
            <Link
              to="/login"
              className="text-rose-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

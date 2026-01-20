import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaGem, FaCrown, FaPaperPlane } from 'react-icons/fa';

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: 'Free',
      price: '0',
      features: [
        'Basic Search',
        'Limited Biodatas',
        'Email Support',
        'Profile Visibility',
      ],
      color: 'from-slate-400 to-slate-600',
      icon: <FaPaperPlane />,
      amount: 0,
      popular: false,
    },
    {
      title: 'Premium',
      price: '500',
      features: [
        'Unlimited Search',
        'View All Biodatas',
        'Priority Support',
        'Contact Details',
      ],
      color: 'from-pink-500 to-rose-500',
      icon: <FaGem />,
      amount: 500,
      popular: true, // Highlighted card
    },
    {
      title: 'Gold',
      price: '1000',
      features: [
        'Direct Contact',
        'Dedicated Support',
        'Featured Listing',
        'No Ads',
      ],
      color: 'from-amber-400 to-orange-500',
      icon: <FaCrown />,
      amount: 1000,
      popular: false,
    },
  ];

  const handleChoosePlan = plan => {
    navigate(`/checkout/${plan.title}`, { state: { planAmount: plan.amount } });
  };

  return (
    <section className="py-28 px-6 bg-[#fdfaf9] relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-600 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Upgrade Your Journey
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-gray-900"
          >
            Membership <span className="text-pink-600 italic">Plans</span>
          </motion.h2>
          <p className="text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
            Choose the perfect plan to find your soulmate with advanced tools
            and exclusive features.
          </p>
        </div>

        {/* --- Plans Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white border ${plan.popular ? 'border-pink-200 scale-105 shadow-[0_40px_80px_-20px_rgba(236,72,153,0.15)] z-20' : 'border-gray-100 shadow-xl shadow-gray-100/50 z-10'} rounded-[3rem] p-10 flex flex-col h-full transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Icon & Title */}
              <div className="text-center mb-8">
                <div
                  className={`w-20 h-20 mx-auto rounded-[2rem] bg-gradient-to-br ${plan.color} flex items-center justify-center text-white text-3xl shadow-xl mb-6`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900">
                  {plan.title}
                </h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-lg font-bold text-gray-400">৳</span>
                  <span className="text-5xl font-black text-gray-900 leading-none">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 font-medium italic">/mo</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600 text-sm font-medium"
                  >
                    <FaCheckCircle
                      className={`${plan.popular ? 'text-pink-500' : 'text-gray-300'} text-lg flex-shrink-0`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => handleChoosePlan(plan)}
                className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-300 active:scale-95 ${
                  plan.popular
                    ? 'bg-gray-900 text-white hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-200'
                    : 'bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white'
                }`}
              >
                SELECT {plan.title.toUpperCase()}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;

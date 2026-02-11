import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Check, Gem, Crown, Send, Zap, Star } from 'lucide-react';

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: 'Free',
      price: '0',
      description:
        'Perfect for exploring the platform and seeing how it works.',
      features: [
        'Basic Search & Filters',
        'View Limited Biodatas',
        'Email Support',
        'Profile Visibility',
      ],
      icon: <Send className="w-6 h-6" />,
      amount: 0,
      popular: false,
      color: 'slate',
    },
    {
      title: 'Premium',
      price: '500',
      description: 'Our most loved plan for serious seekers and fast results.',
      features: [
        'Unlimited Search Access',
        'View All Biodata Details',
        'Priority Customer Support',
        'Access Direct Contact Info',
        'Verified Badge',
      ],
      icon: <Gem className="w-6 h-6" />,
      amount: 500,
      popular: true,
      color: 'rose',
    },
    {
      title: 'Gold',
      price: '1000',
      description:
        'Maximum exposure and dedicated assistance for your journey.',
      features: [
        'Featured Profile Listing',
        'Dedicated Match Manager',
        'Direct Family Contact',
        'No Platform Advertisements',
        'Advanced Privacy Controls',
      ],
      icon: <Crown className="w-6 h-6" />,
      amount: 1000,
      popular: false,
      color: 'amber',
    },
  ];

  const handleChoosePlan = plan => {
    navigate(`/checkout/${plan.title}`, { state: { planAmount: plan.amount } });
  };

  return (
    <section className="py-24 px-6 bg-[#FCFBFA] relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-rose-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-amber-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Zap className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-rose-500 text-[11px] font-bold uppercase tracking-[0.4em]">
              Investment in Future
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-medium text-slate-900"
          >
            Membership <span className="italic text-rose-600">Plans</span>
          </motion.h2>
          <p className="mt-6 text-slate-500 font-light max-w-xl mx-auto text-lg leading-relaxed">
            Upgrade your experience to unlock meaningful connections and
            advanced tools tailored for your search.
          </p>
        </div>

        {/* --- Plans Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-10 rounded-[3rem] transition-all duration-500 ${
                plan.popular
                  ? 'bg-white border-2 border-rose-100 shadow-[0_40px_80px_-15px_rgba(225,29,72,0.1)] scale-105 z-20'
                  : 'bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-slate-200 z-10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Star size={12} fill="currentColor" /> Most Popular
                </div>
              )}

              {/* Icon & Title */}
              <div className="mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.popular
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  {plan.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 font-light leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  ৳{plan.price}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  /lifetime
                </span>
              </div>

              {/* Features */}
              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <div
                      className={`mt-1 flex-shrink-0 ${plan.popular ? 'text-rose-500' : 'text-slate-400'}`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleChoosePlan(plan)}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-slate-900 text-white hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-100'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                }`}
              >
                Choose {plan.title}
              </button>
            </motion.div>
          ))}
        </div>

        {/* --- Trust Note --- */}
        <p className="text-center mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest">
          Secure payment processing • No hidden charges • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default MembershipPlans;

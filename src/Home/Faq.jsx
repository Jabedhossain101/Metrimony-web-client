import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const faqData = [
  {
    question: 'How do I create a profile?',
    answer:
      "Click on the 'Sign Up' button and fill in your details. Providing detailed information about your values and lifestyle ensures we can find the most compatible matches for your journey.",
  },
  {
    question: 'Is my information safe and private?',
    answer:
      'Absolutely. We use industry-standard encryption and privacy controls. Your contact details are never shared without your explicit consent, and profiles are manually verified.',
  },
  {
    question: 'How can I search for matches?',
    answer:
      'Our advanced filtering system allows you to search by location, profession, education, and values. Premium members also get access to AI-driven recommendations.',
  },
  {
    question: 'How do I contact someone I am interested in?',
    answer:
      'Once you find a profile you like, you can send an "Interest Request." If they accept, our secure messaging system will be unlocked for both parties.',
  },
  {
    question: 'Are there any charges for using the website?',
    answer:
      'Registration and basic browsing are free. To unlock direct communication and premium visibility, we offer several affordable membership tiers.',
  },
  {
    question: 'How do I share my success story?',
    answer:
      "We love celebrating unions! Once you've found your partner, visit your dashboard's 'Success Stories' section to submit your journey and inspire others.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-28 px-6 bg-[#FCFBFA] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
          <div className="lg:max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Help Center
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 leading-tight">
              Common <span className="italic text-rose-600">Inquiries</span>
            </h2>
            <p className="mt-6 text-slate-500 font-light text-lg">
              Everything you need to know about finding your perfect match on
              our platform. Can't find what you're looking for? Reach out to us.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
              <Sparkles className="text-rose-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Need Instant Help?
              </p>
              <p className="text-xs text-slate-400">
                Our agents are online now.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- FAQ Accordion Layout --- */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`group border transition-all duration-500 rounded-[2rem] overflow-hidden ${
                  isOpen
                    ? 'border-rose-100 bg-white shadow-xl shadow-rose-100/30'
                    : 'border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-8 py-7 text-left outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      isOpen ? 'text-rose-600' : 'text-slate-700'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isOpen
                        ? 'bg-rose-600 text-white rotate-180'
                        : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'circOut' }}
                    >
                      <div className="px-8 pb-8 text-slate-500 font-light leading-relaxed border-t border-slate-50 pt-5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- Support Callout --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 relative overflow-hidden p-10 lg:p-16 bg-slate-900 rounded-[3.5rem] text-center"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-rose-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-rose-500 w-8 h-8" />
            </div>
            <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Still have more questions?
            </h4>
            <p className="text-slate-400 mb-10 font-light max-w-md mx-auto">
              Our concierge team is available around the clock to ensure your
              experience is smooth and successful.
            </p>
            <button className="group relative inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold transition-all hover:bg-rose-600 hover:text-white">
              Contact Support{' '}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;

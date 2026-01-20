import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

const faqData = [
  {
    question: 'How do I create a profile?',
    answer:
      "Click on the 'Sign Up' button and fill in your details to create your profile. Make sure to provide accurate information for better matches.",
  },
  {
    question: 'Is my information safe and private?',
    answer:
      'Yes, your privacy is our top priority. Your personal information is protected and only visible to registered users.',
  },
  {
    question: 'How can I search for matches?',
    answer:
      'Use the search bar and filters on the homepage to find profiles that match your preferences such as age, religion, and location.',
  },
  {
    question: 'How do I contact someone I am interested in?',
    answer:
      'You can express interest in a profile and start a conversation using our secure messaging system once your interest is accepted.',
  },
  {
    question: 'Are there any charges for using the website?',
    answer:
      'Basic features are free. For premium features like unlimited messaging and highlighted profiles, you can upgrade to a premium membership.',
  },
  {
    question: 'How do I post my marriage success story?',
    answer:
      "After your marriage, you can share your story by submitting it through the 'Share Your Story' section in your account dashboard.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-xs font-black uppercase tracking-widest mb-6"
          >
            <FaQuestionCircle />
            Common Inquiries
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
            Frequently Asked <br />
            <span className="text-pink-600 italic">Questions</span>
          </h2>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-pink-600 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* --- FAQ Accordion Layout --- */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group border rounded-[2rem] transition-all duration-500 ${
                  isOpen
                    ? 'border-pink-200 bg-[#fdf8f7] shadow-xl shadow-pink-100/20'
                    : 'border-gray-100 bg-white hover:border-pink-100 hover:shadow-lg hover:shadow-gray-100/50'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span
                    className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-pink-600' : 'text-gray-700'}`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-pink-600 text-white rotate-180' : 'bg-pink-50 text-pink-500'}`}
                  >
                    {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-gray-500 font-light leading-relaxed border-t border-pink-100/50 pt-4">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center p-12 bg-[#fdfaf9] rounded-[3rem] border border-white shadow-sm"
        >
          <h4 className="text-2xl font-serif font-bold text-gray-800 mb-2">
            Still have more questions?
          </h4>
          <p className="text-gray-500 mb-8 font-light">
            Don't worry, our dedicated support team is here to assist you 24/7.
          </p>
          <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-pink-200">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;

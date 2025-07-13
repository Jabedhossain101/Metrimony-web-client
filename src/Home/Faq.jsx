import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

  const toggleFaq = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-5xl mx-auto mt-16 px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-700">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFaq(idx)}
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>
              {openIndex === idx ? (
                <FaChevronUp className="text-pink-500" />
              ) : (
                <FaChevronDown className="text-pink-500" />
              )}
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;

import React from 'react';

const MembershipPlans = () => {
  const plans = [
    {
      title: 'Free',
      price: '৳0/month',
      features: ['Basic Search', 'Limited Biodatas', 'Email Support'],
      color: 'from-gray-400 to-gray-600',
    },
    {
      title: 'Premium',
      price: '৳500/month',
      features: ['Unlimited Search', 'View All Biodatas', 'Priority Support'],
      color: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Gold',
      price: '৳1000/month',
      features: ['Unlimited Search', 'Direct Contact', 'Dedicated Support'],
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-8">
        💎 Membership Plans
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white font-bold text-lg`}
            >
              {plan.title[0]}
            </div>
            <h3 className="text-xl font-bold mt-4">{plan.title}</h3>
            <p className="text-pink-600 text-lg font-semibold">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              {plan.features.map((f, idx) => (
                <li key={idx}>✅ {f}</li>
              ))}
            </ul>
            <button className="mt-6 w-full px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipPlans;

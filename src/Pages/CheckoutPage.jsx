import React, { useContext } from 'react';
import { useParams } from 'react-router';

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../Contexts/AuthContext';

// Your Stripe Public Key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ biodataId, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Send request info to backend (simulate)
    const res = await fetch('http://localhost:3000/contact-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        biodataId,
        email: userEmail,
        paymentMethodId: paymentMethod.id,
        status: 'pending',
        requestedAt: new Date(),
      }),
    });

    const result = await res.json();

    if (result.insertedId || result.success) {
      alert('✅ Contact info request submitted. Wait for admin approval.');
    } else {
      alert('❌ Something went wrong!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
        Checkout - Request Contact Info
      </h2>

      <div>
        <label className="block mb-1 font-semibold">Biodata ID</label>
        <input
          type="text"
          value={biodataId}
          readOnly
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Your Email</label>
        <input
          type="email"
          value={userEmail}
          readOnly
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Card Details</label>
        <CardElement className="p-2 border rounded" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Pay $5 & Submit Request
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { biodataId } = useParams(); // from /checkout/:biodataId
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm biodataId={biodataId} userEmail={user.email} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

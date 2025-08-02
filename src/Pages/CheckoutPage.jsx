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
import { toast } from 'react-toastify';

// Your Stripe Public Key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


const CheckoutForm = ({ biodataId, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) {
      alert('Card element not found');
      return;
    }

    // Step 1: Create PaymentIntent on server
    const res = await fetch(
      'https://metrimony-server-ten.vercel.app/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500 }), // $5.00 in cents
      }
    );

    const { clientSecret } = await res.json();

    // Step 2: Confirm card payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: userEmail,
          },
        },
      }
    );

    if (error) {
      alert(error.message);
      return;
    }

    // Step 3: Save to DB if payment is successful
    if (paymentIntent.status === 'succeeded') {
      const saveRes = await fetch(
        'https://metrimony-server-ten.vercel.app/contact-request',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            biodataId,
            email: userEmail,
            paymentMethodId: paymentIntent.id,
            status: 'pending',
            requestedAt: new Date(),
          }),
        }
      );

      const saveResult = await saveRes.json();

      if (saveResult.insertedId || saveResult.success) {
        toast.success('✅ Payment successful. Contact request submitted.');
      } else {
        toast.error('❌ Payment succeeded, but request failed!');
      }
    } else {
      toast.error('❌ Payment failed!');
    }
  };

  return (
    <div>
      <div className='h-12'></div>
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
          <div className="p-4 border rounded">
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Pay $5 & Submit Request
        </button>
      </form>
    </div>
  );
};

const CheckoutPage = () => {
  const { biodataId } = useParams(); // from /checkout/:biodataId
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm biodataId={biodataId} userEmail={user.email}  />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

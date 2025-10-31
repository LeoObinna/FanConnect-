import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface Props {
 creatorId: string;
}

function TipInner({ creatorId }: Props) {
 const [amount, setAmount] = useState(0);
 const stripe = useStripe();
 const elements = useElements();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tips`, { amount, creatorId });
   const { clientSecret } = data;
   const result = await stripe!.confirmCardPayment(clientSecret, {
     payment_method: {
       card: elements!.getElement(CardElement)!,
     },
   });
   if (result.error) {
     console.error(result.error);
   } else {
     alert('Tip sent!');
   }
 };

 return (
   <form onSubmit={handleSubmit}>
     <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} placeholder="Amount (EUR)" className="p-2 border rounded mb-2" />
     <CardElement className="p-2 border rounded mb-2" />
     <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Send Tip</button>
   </form>
 );
}

export default function TipForm(props: Props) {
 return (
   <Elements stripe={stripePromise}>
     <TipInner {...props} />
   </Elements>
 );
}
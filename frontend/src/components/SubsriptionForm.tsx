import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface Props {
 priceId: string;
 creatorId: string;
}

function SubscriptionInner({ priceId, creatorId }: Props) {
 const stripe = useStripe();
 const elements = useElements();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscriptions`, { priceId, creatorId });
   const { clientSecret } = data;
   const result = await stripe!.confirmCardPayment(clientSecret, {
     payment_method: {
       card: elements!.getElement(CardElement)!,
     },
   });
   if (result.error) {
     console.error(result.error);
   } else {
     alert('Subscribed!');
   }
 };

 return (
   <form onSubmit={handleSubmit}>
     <CardElement className="p-2 border rounded mb-2" />
     <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Subscribe</button>
   </form>
 );
}

export default function SubscriptionForm(props: Props) {
 return (
   <Elements stripe={stripePromise}>
     <SubscriptionInner {...props} />
   </Elements>
 );
}
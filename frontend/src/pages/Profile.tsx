import { useParams } from 'react-router-dom';
import SubscriptionForm from '../components/SubscriptionForm';
import TipForm from '../components/TipForm';

export default function Profile() {
 const { id } = useParams();

 return (
   <div>
     <h2>Profile {id}</h2>
     <SubscriptionForm priceId="price_123" creatorId={id || ''} />
     <TipForm creatorId={id || ''} />
     <a href={`/live/${id}`}>Join Live</a>
   </div>
 );
}
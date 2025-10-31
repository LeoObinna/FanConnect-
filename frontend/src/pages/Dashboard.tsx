import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [coActorEmail, setCoActorEmail] = useState('');
 const user = JSON.parse(localStorage.getItem('user') || '{}');

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, { title, content, creatorId: user.id });
   if (coActorEmail) {
     // Simulate consent
     alert('Consent link sent to ' + coActorEmail);
   }
   alert('Posted!');
 };

 return (
   <div className="flex">
     <nav className="w-64 bg-white border-r p-4">
       <ul>
         <li><a href="#" onClick={() => alert('My profile')}>My profile</a></li>
         <li><a href="#" onClick={() => alert('Referrals')}>Referrals</a></li>
         <li><a href="#" onClick={() => alert('Collections')}>Collections</a></li>
         <li><a href="#" onClick={() => alert('Queue')}>Queue</a></li>
         <li><a href="#" onClick={() => alert('Vault')}>Vault</a></li>
         <li><a href="#" onClick={() => alert('Settings')}>Settings</a></li>
         <li><a href="#" onClick={() => alert('Statements')}>Statements</a></li>
         <li><a href="#" onClick={() => alert('Statistics')}>Statistics</a></li>
         <li><a href="#" onClick={() => alert('Promotions')}>Promotions</a></li>
         <li><a href="#" onClick={() => alert('My Actors')}>My Actors</a></li>
         <li><a href="#" onClick={() => alert('Your cards (to subscribe)')}>Your cards (to subscribe)</a></li>
         <li><a href="#" onClick={() => alert('Add bank (to earn)')}>Add bank (to earn)</a></li>
         <li><a href="#" onClick={() => alert('Help and support')}>Help and support</a></li>
       </ul>
     </nav>
     <div className="flex-1 p-4">
       <form onSubmit={handleSubmit}>
         <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded mb-2 w-full" />
         <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content or Video URL" className="p-2 border rounded mb-2 w-full" />
         <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Post</button>
       </form>
       <a href={`/live/${user.id}`} className="text-blue-500 mt-4 block">Start Live</a>
     </div>
   </div>
 );
}
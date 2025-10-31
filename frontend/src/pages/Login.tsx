import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showForgot, setShowForgot] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
   localStorage.setItem('user', JSON.stringify(data));
   navigate(data.role === 'creator' ? '/dashboard' : '/feed');
 };

 const sendResetLink = () => {
   // Simulate sending link
   alert('Reset link sent to ' + email);
   setShowForgot(false);
 };

 return (
   <div>
     <form onSubmit={handleSubmit}>
       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded mb-2" />
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded mb-2" />
       <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Log In</button>
     </form>
     <button onClick={() => setShowForgot(true)} className="text-blue-500 mt-2">Forgot password?</button>
     {showForgot && (
       <div>
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for reset" className="p-2 border rounded mb-2" />
         <button onClick={sendResetLink} className="bg-blue-500 text-white p-2 rounded w-full">Send Reset Link</button>
       </div>
     )}
   </div>
 );
}
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AgeVerificationForm from '../components/AgeVerificationForm';

export default function Register() {
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [reEnterPassword, setReEnterPassword] = useState('');
 const [role, setRole] = useState('fan');
 const [userId, setUserId] = useState('');
 const [showVerify, setShowVerify] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (password !== reEnterPassword) {
     alert('Passwords do not match');
     return;
   }
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, { email, username, password, role });
   setUserId(data.id);
   setShowVerify(true);
 };

 const onVerifySuccess = () => {
   navigate('/login');
 };

 return (
   <form onSubmit={handleSubmit}>
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded mb-2" />
     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2 border rounded mb-2" />
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded mb-2" />
     <input type="password" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} placeholder="Re-enter Password" className="p-2 border rounded mb-2" />
     <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded mb-2">
       <option value="fan">Fan</option>
       <option value="creator">Creator</option>
     </select>
     <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
     {showVerify && <AgeVerificationForm userId={userId} onSuccess={onVerifySuccess} />}
   </form>
 );
}
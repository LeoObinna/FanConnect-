import { useNavigate } from 'react-router-dom';

export default function Header() {
 const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem('user') || '{}');

 const handleLogout = () => {
   localStorage.removeItem('user');
   navigate('/');
 };

 return (
   <header className="bg-white text-black p-4 flex justify-between border-b border-gray-200">
     <h1 className="text-2xl font-bold text-blue-500">FanConnect</h1>
     {user.email ? (
       <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
     ) : (
       <div>
         <button onClick={() => navigate('/login')} className="mr-2 text-blue-500">Login</button>
         <button onClick={() => navigate('/register')} className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
       </div>
     )}
   </header>
 );
}
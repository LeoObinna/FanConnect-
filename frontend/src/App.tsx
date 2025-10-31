import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import LiveStream from './components/LiveStream';
import Post from './pages/Post';

function App() {
 return (
   <Router>
     <div className="min-h-screen bg-white flex flex-col">
       <Header />
       <main className="flex-1 container mx-auto p-4 md:p-8">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />
           <Route path="/profile/:id" element={<Profile />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/feed" element={<Feed />} />
           <Route path="/live/:id" element={<LiveStream />} />
           <Route path="/post/:id" element={<Post />} />
         </Routes>
       </main>
     </div>
   </Router>
 );
}

export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';

export default function Feed() {
 const [posts, setPosts] = useState<any[]>([]);

 useEffect(() => {
   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`).then(res => setPosts(res.data));
 }, []);

 return (
   <div>
     {posts.map(post => (
       <div key={post.id} className="mb-4">
         <h3 className="font-bold">{post.title}</h3>
         {post.content.endsWith('.m3u8') ? <VideoPlayer src={post.content} /> : <p>{post.content}</p>}
       </div>
     ))}
   </div>
 );
}
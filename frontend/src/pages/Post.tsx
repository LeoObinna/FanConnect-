import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';

/**
 * Post page component
 */

export default function Post() {
 const { id } = useParams();
 const [post, setPost] = useState<any>(null);

 useEffect(() => {
   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`).then(res => setPost(res.data));
 }, [id]);

 if (!post) return <div>Loading...</div>;

 return (
   <div>
     <h2 className="font-bold text-2xl mb-4">{post.title}</h2>
     {post.content.endsWith('.m3u8') ? <VideoPlayer src={post.content} /> : <p>{post.content}</p>}
   </div>
 );
}
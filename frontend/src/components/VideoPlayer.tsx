import { useRef, useEffect } from 'react';
import Hls from 'hls.js';

interface Props {
 src: string;
}

export default function VideoPlayer({ src }: Props) {
 const videoRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
   if (Hls.isSupported()) {
     const hls = new Hls();
     hls.loadSource(src);
     hls.attachMedia(videoRef.current!);
   } else if (videoRef.current) {
     videoRef.current.src = src;
   }
 }, [src]);

 return <video ref={videoRef} controls className="w-full h-auto rounded" />;
}
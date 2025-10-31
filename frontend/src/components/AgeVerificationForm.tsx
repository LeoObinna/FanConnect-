import { useState } from 'react';
import axios from 'axios';

interface Props {
 userId: string;
 onSuccess: () => void;
}

export default function AgeVerificationForm({ userId, onSuccess }: Props) {
 const [file, setFile] = useState<File | null>(null);

 const handleSubmit = async () => {
   if (!file) return;
   const formData = new FormData();
   formData.append('selfie', file);
   formData.append('userId', userId);
   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/verify-age`, formData);
   onSuccess();
 };

 return (
   <div>
     <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-2" />
     <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Verify</button>
   </div>
 );
}
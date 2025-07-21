// app/message/[id]/page.jsx atau pages/message/[id].js
'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; // App Router
// atau
// import { useRouter } from 'next/router'; // Pages Router
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase"; // sesuaikan path

export default function MessageDetail() {
  const { id } = useParams(); // App Router
  // const router = useRouter(); const { id } = router.query; // Pages Router

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) return;
      const docRef = doc(db, "messages", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessage(docSnap.data());
      }
    };
    fetchMessage();
  }, [id]);

  if (!message) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">To: {message.to}</h1>
      <p className="mb-4">{message.message}</p>
      <div className="flex items-center">
        <iframe
                src={`https://open.spotify.com/embed/track/${message.track.id}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-black; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
        </div>
    </div>
  )
  
}

'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase"; 

export default function MessageDetail() {
  const { id } = useParams();

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
    <div className="flex flex-col p-6 min-h-screen justify-center">
      <h1 className="text-3xl font-bold ">Hey, someone just dropped a message and maybe a piece of their heart too.</h1>
      <div className="mt-20 bg-[#FAFBFB] shadow rounded-lg overflow-hidden hover:shadow-lg transition w-full p-4">
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
    </div>
  )
  
}

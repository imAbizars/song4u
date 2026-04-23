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

  if (!message){
    return(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="animate-bounce text-3xl font-bold">Load Message...</div>
      </div>
    )
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[28rem] justify-center items-center sm:mx-auto p-6 pt-10 ">
      <img src={message.imageUrl} alt="messageImage" className="rounded-lg" />
      <h1 className="p-4 text-3xl font-bold ">Hey {message.to}, someone just dropped a message and maybe a piece of their heart too.</h1>
      <div className="mt-5 bg-[#FAFBFB] shadow rounded-lg overflow-hidden hover:shadow-lg transition w-full p-4">
        <div className="flex items-center">
          {message.track?.previewUrl ? (
            <div className="w-full bg-black rounded-xl p-3 flex items-center gap-3">
              <img
                src={message.track.image}
                className="w-14 h-14 rounded-md"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-white font-bold text-sm truncate">{message.track.name}</p>
                <p className="text-gray-400 text-xs truncate">
                  {message.track.artists.join(", ")}
                </p>
                <audio controls src={message.track.previewUrl} className="w-full mt-1 h-8" />
              </div>
            </div>
          ) : (
            // Fallback kalau tidak ada preview
            <div className="w-full bg-black rounded-xl p-3 flex items-center gap-3">
              <img
                src={message.track.image}
                className="w-14 h-14 rounded-md"
              />
              <div>
                <p className="text-white font-bold text-sm">{message.track.name}</p>
                <p className="text-gray-400 text-xs">
                  {message.track.artists.join(", ")}
                </p>
                <p className="text-gray-500 text-xs mt-1">Preview not available</p>
              </div>
            </div>
          )}
        </div>
        <h1 className="mt-5 text-2xl font-bold mb-2">To: {message.to}</h1>
        <p className="mb-4">{message.message}</p>
      </div>
    </div>
  )
  
}

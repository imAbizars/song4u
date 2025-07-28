'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/app/lib/firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export function useSendMessage() {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const sendMessage = async ({ to, message, selected }) => {
    if (!to || !message || !selected) return;

    try {
      setIsSending(true);

      const docRef = await addDoc(collection(db, "messages"), {
        to,
        message,
        track: {
          id: selected.id,
          name: selected.name,
          image: selected.album.images[0]?.url,
          artists: selected.artists.map((a) => a.name),
        },
        createdAt: Timestamp.now(),
      });

      router.push(`/message/${docRef.id}`);
    } catch (err) {
      console.error("Firestore save error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
}

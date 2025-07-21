'use client'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase/firebase";
import Link from "next/link";

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMessages(); 
  }, []);

  const fetchMessages = async (term = "") => {
    let q;
    if (term.trim() !== "") {
      q = query(collection(db, "messages"), where("To", "==", term));
    } else {
      q = collection(db, "messages");
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(data);
  };

  const handleSearch = () => {
  if (!searchTerm.trim()) {
    setIsSearching(false);
    return;
  }

  const results = messages.filter(msg =>
    msg.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredMessages(results);
  setIsSearching(true);
};


  return (
    <section className="flex flex-col justify-center items-center min-h-screen max-w-[25rem]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">All Message Made By Them</h1>
        <p className="">See What Everyone Has Shared</p>
      </div>

      <div className="flex justify-center items-center mt-20 w-full space-x-4">
            <input
                type="text"
                className="p-2 border border-black w-50 rounded-xl h-10"
                placeholder="Search Your Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-[#383737] cursor-pointer"
                onClick={handleSearch}
            >
                Search
            </button>
       </div>


      <div className="mt-20 w-full px-4 sm:px-6">
            <div className="grid gap-6">
                {(isSearching ? filteredMessages : messages).map((msg) => {
                const previewLength = 30;
                const words = msg.message.split(" ");
                const previewText = words.slice(0, previewLength).join(" ");

                return (
                    <Link
                    key={msg.id}
                    href={`/message/${msg.id}`}
                    className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition w-full p-4"
                    >
                    {/* Bagian atas */}
                    <div className="mb-3">
                        <span className="text-sm text-gray-500">To: {msg.to}</span>
                        <p className="text-sm text-gray-700 fade-text-mask mt-1">{previewText}</p>
                    </div>

                    {/* Bagian bawah: horizontal */}
                    <div className="flex items-center">
                        <img
                        src={msg.track.image}
                        alt={msg.track.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex flex-col">
                        <span className="font-semibold text-md text-gray-800">{msg.track.name}</span>
                        <span className="text-sm text-gray-600">{msg.track.artists}</span>
                        </div>
                    </div>
                    </Link>
                );
                })}
            </div>
        </div>
    </section>
  );
}

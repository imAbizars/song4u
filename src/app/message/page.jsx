'use client'
import { useState } from "react";
import Link from "next/link";
import { useMessages } from "../hooks/useMessages";
import MessageCard from "../components/message/MessageCard";

export default function Message() {
  const [messages, isLoading] = useMessages();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
  if (!searchTerm.trim()) {
    setIsSearching(false);
    setFilteredMessages([]);
    return;
  }

  const results = messages.filter(msg =>
    msg.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredMessages(results);
  setIsSearching(true);
};


  return (
    <section className="flex flex-col justify-center items-center pt-10 pb-20 min-h-screen max-w-[25rem]">
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


      <div className="mt-10 w-full px-4 sm:px-6">
        <div className="grid gap-6 relative">
            {isLoading ? (
                <div className="absolute inset-0 flex justify-center items-center space-x-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                </div>
            ) :
            (isSearching ? filteredMessages : messages).map((msg) => (
              <MessageCard key={msg.id} msg={msg} />
            ))}
            {(isSearching ? filteredMessages :messages).length == 0 && !isLoading &&(
                <p className="text-center">No Message Found.</p>
            )}
        </div>
      </div>
    </section>
  );
}

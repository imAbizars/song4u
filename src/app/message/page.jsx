'use client'
import { useState } from "react";
import { useMessages } from "../hooks/useMessages";
import MessageCard from "../components/message/MessageCard";
import LoadingDots from "../components/common/LoadingDots";
import InputSearch from "../components/common/InputSearch";

export default function Message() {
  const {messages, isLoading} = useMessages();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (term) => {
  if (!term.trim()) {
    setIsSearching(false);
    setFilteredMessages([]);
    return;
  }

  const results = messages.filter(msg =>
    msg.to.toLowerCase().includes(term.toLowerCase())
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

      
      <InputSearch onSearch={handleSearch}/>

      <div className="mt-10 w-full px-4 sm:px-6">
        <div className="grid gap-6 relative">
            {isLoading ? (
                <LoadingDots/>
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

'use client'
import Link from "next/link"
import { useMessages } from "./hooks/useMessages"
import MessageCard from "./components/message/MessageCard"
export default function Home(){
  const {messages} = useMessages();
  return(
    <section className="flex flex-col w-full px-4 justify-center items-center text-center h-screen">
      <h1 className="text-3xl font-bold">
        Create Ur Message With They Favorite Song
      </h1>
      <div className="flex flex-row justify-center gap-10 mt-20">
          <Link href="/receipt" className="bg-foreground p-5 font-bold rounded-2xl text-white hover:bg-[#343434]">
            Create Ur Message
          </Link>
          <Link href="/message" className="bg-white p-5 border border-black font-bold rounded-2xl hover:bg-[#EEEEEE]">
            Show All Message
          </Link>
      </div>
      <div className="mt-20 marquee-container max-h-50 ">
      <div className="marquee-content gap-5 ">
          {[...messages, ...messages].map((msg, index) => (
            <MessageCard className="bg-white text-left border border-color  rounded-lg overflow-hidden  w-full p-2" key={`${msg.id}-${index}`} msg={msg} />
          ))}
        </div>
      </div>

    </section>
  )
}
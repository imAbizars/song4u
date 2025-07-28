'use client'
import { useMessages } from "../../hooks/useMessages"
import MessageCard from "../message/MessageCard"
export default function MarqueeCostum(){
    const {messages} = useMessages();
    return(
        <div className="mt-20 marquee-container max-h-50 ">
            <div className="marquee-content gap-5 ">
                {[...messages, ...messages].map((msg, index) => (
                <MessageCard className="bg-white text-left border border-color  rounded-lg overflow-hidden  w-full p-2" key={`${msg.id}-${index}`} msg={msg} />
                ))}
            </div>
        </div>
    )
}
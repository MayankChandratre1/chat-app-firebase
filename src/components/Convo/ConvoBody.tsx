import { useEffect, useState } from "react"
import { auth } from "@/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { MessageCard } from "./MessageCard";
import useConversationMessages from "@/hooks/useConversationMessags";
import { LucideLoader2 } from "lucide-react";
import { AIConversation } from "@/config/ai.config";
import { AIMessageCard } from "./AIMessageCard";

const ConvoBody = ({conversationId, isAIPartner, aIConversation}: {conversationId: string, isAIPartner?: boolean, aIConversation?:AIConversation}) => {
    // const [messages, setMessages] = useState<any[]>([])
    const {messages, loading} = useConversationMessages(conversationId)
    const [userName, setUserName] = useState<string | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user?.displayName) {
            setUserName(user.displayName);
          } else {
            setUserName(null);
          } 
        });
    
        return () => unsubscribe(); 
      }, []);
  
  return (
    <div className='flex-1'>
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar px-3 md:px-5 py-3">
        {loading && <div className="flex justify-center items-center h-full">
          <LucideLoader2 />
        </div>
        } 
      {
        conversationId && !isAIPartner && messages.map((message) => (
            <MessageCard key={message.id} conversationId={conversationId} messageId={message.id} {...message} currentUserName={userName} />
        ))
      }
      {
        isAIPartner && aIConversation && aIConversation.map((message, index) => (
            <AIMessageCard key={index} role={message.role} text={message.parts[0].text} />
        ))
      }
      </div>
    </div>
  )
}

export default ConvoBody
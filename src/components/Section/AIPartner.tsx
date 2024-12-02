import DashboardLayout from "../Dashboard/Layout"
import { useCallback, useEffect, useState } from "react"
import {  getConversationHistory, saveConversationHistory } from "@/lib/firestore.actions"
import ConvoHeader from "../Convo/ConvoHeader"
import ConvoBody from "../Convo/ConvoBody"
import ConvoInput from "../Convo/ConvoInput"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase.config"
import { ChatSession } from "@google/generative-ai"
import { AIConversation, getChatSession } from "@/config/ai.config"
import { LucideLoader2 } from "lucide-react"

const AIPartner = () => { 

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [chatSession, setChatSession] = useState<ChatSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<AIConversation>([]);
    const [isLimited, setIsLimited] = useState(false);

    const [conversation, setConversation] = useState<AIConversation>([])

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user?.email) {
          setUserEmail(user.email);
        } else {
          setUserEmail(null);
        }
        setLoading(false); 
      });
      return () => unsubscribe(); 
    }, []);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(conversation.length > 0) {
                handleSaveConversation()
            }
        }, 10000)
        return () => clearTimeout(timeout)
    }, [conversation])  

    useEffect(() => {
        if (!userEmail) return;
        setLoading(true)
        getConversationHistory(userEmail).then((res) => {
            if(res.length > 16) {
                setIsLimited(true)
            }
            setHistory(res)
            setLoading(false)
        })
    }, [userEmail])

    useEffect(() => {
        if (!history) return;
        const chatSession = getChatSession({history})
        setChatSession(chatSession) 
    }, [history])


    
    const handleSaveConversation = useCallback(async () => {
      if (!userEmail || conversation.length === 0) return;
  
      // Merge and deduplicate conversations
      const mergedConversations = [...history, ...conversation];
      const uniqueConversations = Array.from(
        new Map(mergedConversations.map((item) => [`${item.role}-${item.parts[0].text}`, item])).values()
      );
  
      setHistory(uniqueConversations); // Update local history state
      setConversation([]); // Clear current conversation to avoid duplicate saves
  
      await saveConversationHistory(userEmail, uniqueConversations);
      console.log("Conversation saved:", uniqueConversations);
    }, [userEmail, conversation, history]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        handleSaveConversation();
      }, 10000);
      return () => clearTimeout(timeout);
    }, [conversation, handleSaveConversation]);
  
    const handleSendMessage = async (message: string) => {
      if (!chatSession) return;
  
      const response = await chatSession.sendMessage(message);
      setConversation((prev) => [
        ...prev,
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: response.response.text() }] },
      ]);
    };


  return (
    <DashboardLayout>
        <div className="flex flex-col flex-1 h-full">
            <ConvoHeader conversation={conversation} isAIPartner  />
            {
              loading ? <div className="flex justify-center items-center h-full"><LucideLoader2 className="animate-spin text-primary" /></div> :
              <ConvoBody conversationId={""} isAIPartner={true} aIConversation={Array.from(
                new Map([...history, ...conversation].map((item) => [`${item.role}-${item.parts[0].text}`, item])).values()
            )} />
            }
            {
              isLimited && <p className="text-center text-sm text-gray-500">You have reached the limit of 16 messages. Go get a real partner.</p>
            }
            {
              !isLimited && <ConvoInput conversationId={""} isAIPartner={true} handleSendMessage={handleSendMessage} />
            }
        </div>
    </DashboardLayout>
  )
}

export default AIPartner
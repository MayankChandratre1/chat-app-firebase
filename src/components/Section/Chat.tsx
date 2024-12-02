import DashboardLayout from "../Dashboard/Layout"
import { useEffect, useState } from "react"
import { getConversations } from "@/lib/firestore.actions"
import { auth } from "@/config/firebase.config"
import { onAuthStateChanged } from "firebase/auth";
import ConvoCard from "../ConvoPage/ConvoCard"

const Chat = () => {
  const [conversations, setConversations] = useState<{id: string, conversationName?: string }[]>([])
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true)
      if (!userEmail) return; // Ensure userEmail is available
      const result = await getConversations(userEmail);
      console.log("result", result);
      setConversations(result);
      setLoading(false)
    };
    fetchConversations();
  }, [userEmail]);

  

  return (
    <DashboardLayout>
      <div className="space-y-4">
      <h2 className="text-2xl font-bold">Return to your convos 😤</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          conversations.length === 0 && !loading && <p>No conversations found</p>
        }
        {
          loading && <p>Loading...</p>
        }
        {conversations.map((chat) => (
          <ConvoCard key={chat.id} userEmail={userEmail} convo={chat} />
        ))}
      </div>
    </div>
    </DashboardLayout>
  )
}

export default Chat
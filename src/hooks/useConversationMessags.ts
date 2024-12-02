import { useEffect, useState } from "react";
import { firestore } from "@/config/firebase.config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getMessages } from "@/lib/firestore.actions";

const useConversationMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const messagesRef = collection(firestore, "conversations", conversationId, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    if(messages.length === 0) {
      setLoading(true);
      getMessages(conversationId).then((res) => {
        setMessages(res)
        setLoading(false);
      })
    }

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      console.log("snapshot", snapshot)
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    // Clean up the subscription when the component unmounts or conversationId changes
    return () => unsubscribe();
  }, [conversationId]);

  return { messages, loading };
};

export default useConversationMessages;

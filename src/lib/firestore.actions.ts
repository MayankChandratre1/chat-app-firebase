import { firestore } from "@/config/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

// Create a conversation
export const createConversation = async (data: {
  participants: string[];
  conversationName: string;
}) => {
  const { participants, conversationName } = data;
  const ownerId = participants[0]
  const docRef = await addDoc(collection(firestore, "conversations"), {
    participants,
    conversationName,
    createdAt: serverTimestamp(),
    ownerId
  });
  return docRef.id;
};

// Send a message
export const sendMessage = async (data: {
  conversationId: string;
  senderId: string;
  message: string;
  senderName: string;
}) => {
  const { conversationId, senderId, message, senderName } = data;
  const docRef = await addDoc(
    collection(firestore, `conversations/${conversationId}/messages`),
    {
      senderId,
      senderName,
      message,
      createdAt: serverTimestamp(),
    }
  );
  return docRef.id;
};

// Get all conversations for a user
export const getConversations = async (userId: string) => {
  const q = query(
    collection(firestore, "conversations"),
    where("participants", "array-contains", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get messages for a specific conversation
export const getMessages = async (conversationId: string) => {
  const q = query(
    collection(firestore, `conversations/${conversationId}/messages`),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Update conversation details (e.g., name)
export const updateConversation = async (conversationId: string, data: Partial<{ conversationName: string }>) => {
  const docRef = doc(firestore, "conversations", conversationId);
  await updateDoc(docRef, data);
};

// Delete a conversation
export const deleteConversation = async (conversationId: string) => {
  const docRef = doc(firestore, "conversations", conversationId);
  await deleteDoc(docRef);
};

// Get a single conversation by ID
export const getConversationById = async (conversationId: string) => {
  const docRef = doc(firestore, "conversations", conversationId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    throw new Error("Conversation not found");
  }
};

// Mark a message as read
export const markMessageAsRead = async (conversationId: string, messageId: string) => {
  const docRef = doc(firestore, `conversations/${conversationId}/messages`, messageId);
  await updateDoc(docRef, { read: true });
};

export const deleteMessage = async (conversationId: string, messageId: string) => {
    try {
      if (!conversationId || !messageId) {
        console.error("Missing conversationId or messageId");
        return;
      }
      const messageRef = doc(firestore, "conversations", conversationId, "messages", messageId);
      console.log("Attempting to delete:", messageRef.path);
  
      await deleteDoc(messageRef);
      console.log("Message deleted successfully");
    } catch (error: any) {
      console.error("Error deleting message:", error.message);
    }
  };

// Search conversations by name
export const searchConversationsByName = async (userId: string, searchQuery: string) => {
  const q = query(
    collection(firestore, "conversations"),
    where("participants", "array-contains", userId),
    where("conversationName", ">=", searchQuery),
    where("conversationName", "<=", searchQuery + "\uf8ff"),
    orderBy("conversationName")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const joinConversation = async (conversationId: string, userId: string) => {
  const docRef = doc(firestore, "conversations", conversationId);
  await updateDoc(docRef, { participants: arrayUnion(userId) });
};

export const getConversationHistory = async (userEmail: string) => {
  const docRef = doc(firestore, "ai_sessions", userEmail);
  const snapshot = await getDoc(docRef);
  return snapshot.data()?.history || [];
};

export const saveConversationHistory = async (userEmail: string, history: {
  role: "user" | "model",
  parts: {text: string}[],
}[]) => {
  const docRef = doc(firestore, "ai_sessions", userEmail);
  await setDoc(docRef, { history });
};

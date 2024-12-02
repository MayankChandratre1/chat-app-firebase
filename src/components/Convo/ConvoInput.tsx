
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { randomSuggestion } from '@/lib/constants/suggestions'
import { useEffect, useState } from 'react'
import { DicesIcon } from 'lucide-react'
import { sendMessage } from '@/lib/firestore.actions'
import { auth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'

const ConvoInput = ({conversationId, isAIPartner, handleSendMessage}: {conversationId: string, isAIPartner?: boolean, handleSendMessage?: (message: string) => Promise<void>}) => {
  const [message, setMessage] = useState("")
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      } 
      if (user?.displayName) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      } 
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const suggestRandom = () => {
    setMessage(randomSuggestion[Math.floor(Math.random() * randomSuggestion.length)])
  }
  const handleSend = async () => {
    if (!userEmail || !userName || !message) return;
    try {
        setLoading(true)
        if(isAIPartner && handleSendMessage) {
          await handleSendMessage(message)
        } else {
      await sendMessage({
        conversationId,
        message,
        senderId: userEmail,
        senderName: userName
      });
      }
      setMessage("")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center gap-2 '>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} className='bg-white' placeholder={randomSuggestion[Math.floor(Math.random() * randomSuggestion.length)]} />
        <Button onClick={suggestRandom} className='bg-blue-500 text-white hover:bg-blue-600 active:animate-spin' ><DicesIcon className='active:animate-spin' size={24} /></Button>
        <Button disabled={loading} onClick={handleSend} className={` bg-blue-500 text-white hover:bg-blue-600`}>{!loading ? "Send":"Wait..."}</Button>
    </div>
  )
}

export default ConvoInput
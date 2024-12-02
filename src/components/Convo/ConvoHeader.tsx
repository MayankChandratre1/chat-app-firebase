import { Button } from '../ui/button'
import { ArrowLeftCircle} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ShareModal from './ShareModal'
import { useState } from 'react'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase.config'
import LeaveModal from './LeaveModal'
import MenuModal from './MenuModal'


const ConvoHeader = ({conversation, isAIPartner}: {conversation: any, isAIPartner?: boolean}) => {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState<string | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user?.email) {
            setUserEmail(user.email);
          } else {
            setUserEmail(null);
          } 
        });
    
        return () => unsubscribe(); 
      }, []);     


    if(isAIPartner) {
      return (
        <div className='flex justify-between'>
          <div className='flex flex-1 items-center gap-1 md:gap-2 '>
          <Button className='p-0 m-0' variant={"ghost"} onClick={() => navigate("/dashboard/conversations")}><ArrowLeftCircle size={18} /></Button>
          <h1 className='text-md md:text-xl font-bold hover:animate-pulse'>Chat with AI Partner 💖</h1>
          </div>
        </div>
      )
    }
  return (
    <div className='flex justify-between'>
      <div className='flex flex-1 items-center gap-1 md:gap-2 '>
        <Button className='p-0 m-0' variant={"ghost"} onClick={() => navigate("/dashboard/conversations")}><ArrowLeftCircle size={18} /></Button>
        <h1 className='text-md md:text-xl font-bold hover:animate-pulse'>{conversation ? conversation.conversationName : "Wait, It's loading..."}</h1>
      </div>
      <div className='hidden md:flex items-center gap-1 md:gap-2'>
       <ShareModal />
        {userEmail && userEmail === conversation?.ownerId && <LeaveModal />}
      </div>
        <MenuModal>
          <ShareModal />
          {userEmail && userEmail === conversation?.ownerId && <LeaveModal />}
        </MenuModal>  
    </div>
  )
}

export default ConvoHeader
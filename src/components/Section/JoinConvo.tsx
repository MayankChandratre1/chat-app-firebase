import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircleQuestion } from 'lucide-react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase.config'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getConversationById, joinConversation } from "@/lib/firestore.actions"

export default function JoinConvo() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const id = useParams().id
  const [conversation, setConversation] = useState<any>(null)

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

  useEffect(() => {
    getConversationById(id || "").then((res) => {
      setConversation(res)
    })
  }, [id])

  const handleJoin = async () => {
    setLoading(true)
    try {
      await joinConversation(id || "", userEmail || "")
      navigate('/dashboard/conversations')
    } catch (err) {
      console.log(err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex items-center">
          <MessageCircleQuestion className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
            Buddy, You sure want to join this?
            <p className="text-xl sm:text-2xl">{conversation?.conversationName}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Button onClick={handleJoin} className="w-full max-w-xs sm:max-w-sm" size="lg" disabled={loading}>
            <span className="text-sm sm:text-base">Throw me in</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


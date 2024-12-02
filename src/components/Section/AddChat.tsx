import DashboardLayout from '../Dashboard/Layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { auth } from '@/config/firebase.config'
import { createConversation } from '@/lib/firestore.actions'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AddChat = () => {
  const [loading, setLoading] = useState(false)
  const [chatName, setChatName] = useState('')
  const navigate = useNavigate()
  const randomEmoji = ['🤖', '👾', '👻', '💩', '🤡', '👽', '👿', '🤠', '🤡', '👹', '👺', '💀', '👻', '👽', '👿', '🤠', '🤡', '👹', '👺', '💀', '👻', '👽', '👿', '🤠', '🤡', '👹', '👺', '💀']
  const user = auth?.currentUser?.email
  const addConvo = async () => {
    if(!user) return;
    setLoading(true)
    try {
      const result = await createConversation({
        participants: [user],
        conversationName: chatName+" "+randomEmoji[Math.floor(Math.random() * randomEmoji.length)],
      })
      console.log(result)
      navigate('/dashboard/conversations')   
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a convo so you can bore others too 🥱</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input value={chatName} onChange={(e) => setChatName(e.target.value)} id="chatName" placeholder="Enter A Badass Name (e.g. ChatNo69)" />
              </div>
              <Button onClick={addConvo} disabled={loading} className="w-full">Create convo</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  )
}

export default AddChat
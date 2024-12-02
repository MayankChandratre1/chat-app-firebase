import { useParams } from "react-router-dom"
import DashboardLayout from "../Dashboard/Layout"
import { useEffect, useState } from "react"
import { getConversationById } from "@/lib/firestore.actions"
import ConvoHeader from "../Convo/ConvoHeader"
import ConvoBody from "../Convo/ConvoBody"
import ConvoInput from "../Convo/ConvoInput"

const Coversation = () => {
    const params = useParams()

    const [conversation, setConversation] = useState<any>({})

    useEffect(() => {
        getConversationById(params?.id || "").then((res) => {
            setConversation(res)
        })
    }, [])

  return (
    <DashboardLayout>
        <div className="flex flex-col flex-1 h-full">
            <ConvoHeader conversation={conversation} />
            <ConvoBody conversationId={conversation?.id} />
            <ConvoInput conversationId={conversation?.id} />
        </div>
    </DashboardLayout>
  )
}

export default Coversation
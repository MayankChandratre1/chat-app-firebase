import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { deleteConversation } from "@/lib/firestore.actions"

const DeleteModal = ({convoId}:{convoId:string}) => {
    const deleteConvo = async () => {
        await deleteConversation(convoId)
        window.location.reload()
        toast({
            title: "Deleted",
            description: "This convo has been deleted",
            variant: "default"
        })
    }
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant={"ghost"}><Trash2 size={18} /></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>End this convo?🤧</DialogTitle>
      <DialogDescription>
        <div className="flex items-center justify-between my-2">
            <Button onClick={deleteConvo} variant={"destructive"} size={"sm"}>Delete</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default DeleteModal
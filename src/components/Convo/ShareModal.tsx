import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Share2 } from "lucide-react"
import { useLocation } from "react-router-dom"
import APP_CONFIG from "../../config/app.config"
import { toast } from "@/hooks/use-toast"

const ShareModal = () => {
    const localtion = useLocation()
    const copy = () => {
        navigator.clipboard.writeText(APP_CONFIG.BASE_URL+"/join/"+localtion.pathname.split("/")[2])
        toast({
            title: "Copied to clipboard",
            description: "You can now share this link with your homiz ✨",
            variant: "default"
        })
    }
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant={"ghost"}>Invite <Share2 size={18} /></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite your homiz to join your convo 😉</DialogTitle>
      <DialogDescription>
        <div className="flex items-center justify-between my-2">
            <p className="text-sm p-3 bg-gray-100 rounded-md">{APP_CONFIG.BASE_URL+"/join/"+localtion.pathname.split("/")[2]}</p>
            <Button onClick={copy} variant={"outline"} size={"sm"}>Copy</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default ShareModal
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"
import { useLocation } from "react-router-dom"
import APP_CONFIG from "../../config/app.config"
import { toast } from "@/hooks/use-toast"

const LeaveModal = () => {
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
    <Button variant={"ghost"}>Exit <ChevronRight size={18} /></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-center">Leaving after all? 😒</DialogTitle>
      <DialogDescription>
        <div className="flex flex-col items-center justify-between">
            <p className="text-md text-center my-2">Well, They say in hindi, <span className="font-bold italic">jaane wale ko koun rok sakta hai ?</span></p>
            <Button onClick={copy} variant={"destructive"} size={"sm"}>Leave <ChevronRight size={18} /></Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default LeaveModal
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MenuIcon } from "lucide-react"


export default function MenuModal({children}:{children:React.ReactNode}) {
  return (
    <Popover>
      <PopoverTrigger className="md:hidden" asChild>
        <Button variant="outline"><MenuIcon size={18} /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-20 p-2 mr-3">
        <div className="flex flex-col items-center justify-between gap-2">
            {children}  
        </div>
      </PopoverContent>
    </Popover>
  )
}

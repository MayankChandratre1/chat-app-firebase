"use client"


import { LogOut, MessageSquare, PlusCircle, HeartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { auth } from "@/config/firebase.config"
import { signOut } from "firebase/auth"
import { useState } from "react"

const sidebarItems = [
  { name: "AI Partner", href: "/ai-partner", icon: HeartIcon },
  { name: "Convos", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Add Convo", href: "/dashboard/add-conversation", icon: PlusCircle },
]

export function Sidebar() {
  const pathname = useLocation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth)
    navigate("/")
    setLoading(false);
  }

  return (
    <div className="flex h-full w-16 flex-col justify-between border-r bg-white lg:w-64">
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex h-16 w-full items-center justify-center border-b px-4 lg:justify-start">
          <h1 className="hidden text-xl font-bold lg:block">NoConvo✨</h1>
          <MessageSquare className="h-6 w-6 lg:hidden" />
        </div>
        <nav className="flex flex-col items-center gap-4 pt-4 lg:items-stretch lg:px-4">
          {sidebarItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-center lg:justify-start",
                  pathname.pathname === item.href && "bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:inline-block">{item.name}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mb-4 flex justify-center lg:px-4">
        <Button disabled={loading} onClick={handleLogout} variant="ghost" className="w-full justify-center lg:justify-start">
          <LogOut className="h-5 w-5 lg:mr-2" />
          <span className="hidden lg:inline-block">Logout</span>
        </Button>
      </div>
    </div>
  )
}


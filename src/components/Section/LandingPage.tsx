import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from 'lucide-react'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/config/firebase.config'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        navigate('/dashboard/conversations')
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      navigate('/dashboard/chat')
      console.log(result)
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
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
            Start Chatting Now
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <MessageCircle className="w-16 h-16 sm:w-24 sm:h-24 text-blue-500" />
          <p className="text-center text-sm sm:text-base text-gray-600 px-4 sm:px-0">
            Connect with friends, family, and colleagues instantly. Join our chat community today!
          </p>
          <Button onClick={handleLogin} className="w-full max-w-xs sm:max-w-sm" size="lg" disabled={loading}>
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            <span className="text-sm sm:text-base">Get Started with Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


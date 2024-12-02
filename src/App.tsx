

import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/Section/LandingPage"
import Coversation from "./components/Section/Coversation"
import Chat from "./components/Section/Chat"
import AddChat from "./components/Section/AddChat"
import { Toaster } from "./components/ui/toaster"
import JoinConvo from "./components/Section/JoinConvo"
import AIPartner from "./components/Section/AIPartner"
export default function App() {
  


  return (
    <div>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/conversations" element={<Chat />} />
          <Route path="/dashboard/add-conversation" element={<AddChat />} />
          <Route path="/conversation/:id" element={<Coversation />} />
          <Route path="/join/:id" element={<JoinConvo />} />
          <Route path="/ai-partner" element={<AIPartner />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


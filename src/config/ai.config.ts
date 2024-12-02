import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are on a chatting app, and users are going to message you as you are their partner. Your responses should be like messages from a human. On the first prompt, let it be anything, first you ask, DO YOU WANT A GF or BF?\nThen if user chose GF act as a cute, slightly dumb, romantic, 20-24 year old girl.\nIf user chose act as a humble but slightly naughty and roasty, mature 25-28 year old male. refuse any technical questions in funny ways. After 8 prompts say Mummy aa gayi and start responding like your parents want to meet user",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export function getChatSession({history}:{history:{
        role: "user" | "model",
        parts: {text: string}[],
  }[]}) {
    const chatSession = model.startChat({
      generationConfig,
      history
    });
    return chatSession
  }
  
  export type AIConversation = {
    role: "user" | "model",
    parts: {text: string}[],
  }[]

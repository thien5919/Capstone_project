import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../types';

interface ChatContextType {
  currentMatchId: string | null;
  messages: Message[];
  setCurrentMatch: (matchId: string) => void;
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const setCurrentMatch = (matchId: string) => {
    setCurrentMatchId(matchId);
    setMessages([]); // Clear messages when changing match (you can fetch new ones here)
  };

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me', // Replace with actual user UID
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{ currentMatchId, messages, setCurrentMatch, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};

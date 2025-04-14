import React, {createContext, useContext, useEffect, useState} from "react";
import {sendMessage, listenForMessages} from "../services/firebase";
import database from "@react-native-firebase/database";

interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: number;
}

interface ChatContextType {
    messages: Message[];
    send: (matchId: string, message: Message) => Promise<void>;
    startListening: (matchId: string) => void;
    stopListening: (matchId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({children}: {children: React.ReactNode}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [listeners, setListeners] = useState<{[matchId: string]: () => void}>({});

    const send = async (matchId: string, message: Message) => {
        await sendMessage(matchId, message);
    };

    const startListening = (matchId: string) => {
        if (listeners[matchId]) return;
        const unsub = listenForMessages(matchId, (msgs) => setMessages(msgs));
        setListeners((prev) => ({
            ...prev,
            [matchId]: () =>
                database().ref(`/messages/${matchId}`).off("value", unsub),
        }));
    };

    const stopListening = (matchId: string) => {
        if (listeners[matchId]) {
            listeners[matchId]();
            setListeners((prev) => {
                const {[matchId]: _, ...rest} = prev;
                return rest;
            });
        }
    };

    return (
        <ChatContext.Provider value={{messages, send, startListening, stopListening}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

// src/context/NotificationContext.tsx

import React, {createContext, useContext, useEffect, useState} from "react";
import messaging from "@react-native-firebase/messaging";
import {updateUserProfile} from "../services/firebase";
import {useAuth} from "./AuthContext";

interface NotificationContextType {
    fcmToken: string | null;
    matchAlerts: boolean;
    messageAlerts: boolean;
    toggleMatchAlerts: () => void;
    toggleMessageAlerts: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({children}: {children: React.ReactNode}) => {
    const {user} = useAuth();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [matchAlerts, setMatchAlerts] = useState(true);
    const [messageAlerts, setMessageAlerts] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await messaging().getToken();
            setFcmToken(token);
            if (user?.uid && token) {
                await updateUserProfile(user.uid, {
                    fcmToken: token,
                    settings: {
                        notifications: {
                            matchAlerts,
                            messageAlerts,
                        },
                    },
                });
            }
        };
        fetchToken();
    }, [user]);

    const toggleMatchAlerts = async () => {
        setMatchAlerts((prev) => !prev);
        if (user?.uid) {
            await updateUserProfile(user.uid, {
                settings: {
                    notifications: {
                        matchAlerts: !matchAlerts,
                        messageAlerts,
                    },
                },
            });
        }
    };

    const toggleMessageAlerts = async () => {
        setMessageAlerts((prev) => !prev);
        if (user?.uid) {
            await updateUserProfile(user.uid, {
                settings: {
                    notifications: {
                        matchAlerts,
                        messageAlerts: !messageAlerts,
                    },
                },
            });
        }
    };

    return (
        <NotificationContext.Provider
            value={{fcmToken, matchAlerts, messageAlerts, toggleMatchAlerts, toggleMessageAlerts}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};

import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserProfile, updateUserProfile, saveMatchPreference} from "../services/user.service";
import {useAuth} from "./AuthContext";

interface UserContextType {
    profile: any;
    updateProfile: (data: any) => Promise<void>;
    updateMatchPreference: (pref: any) => Promise<void>;
    reloadProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const {user} = useAuth();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (user?.uid) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        if (!user?.uid) return;
        const data = await getUserProfile(user.uid);
        setProfile(data);
    };

    const updateProfile = async (data: any) => {
        if (!user?.uid) return;
        await updateUserProfile(user.uid, data);
        await loadProfile();
    };

    const updateMatchPreference = async (pref: any) => {
        if (!user?.uid) return;
        await saveMatchPreference(user.uid, pref);
        await loadProfile();
    };

    return (
        <UserContext.Provider value={{profile, updateProfile, updateMatchPreference, reloadProfile: loadProfile}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

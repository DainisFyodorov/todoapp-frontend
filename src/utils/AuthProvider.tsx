import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { SpinnerLoading } from "../layouts/Util/SpinnerLoading";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    username: string;
    setUsername: (value: string) => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, { credentials: 'include' });
            
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log(data);
            setUsername(data.username);
            setIsLoggedIn(data.loggedIn);
            setLoading(false);
        } catch {
            setIsLoggedIn(false);
            setLoading(false);
        } finally {
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if(loading) {
        return <SpinnerLoading />
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, checkAuth }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
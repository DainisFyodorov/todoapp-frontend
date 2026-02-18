import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/status', { credentials: 'include' });
            
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();

            setIsLoggedIn(data.isLoggedIn);
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

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth }}>
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
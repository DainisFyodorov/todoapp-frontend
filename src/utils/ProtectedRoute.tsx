import React, { ReactNode } from "react"
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if(!isLoggedIn) {
        return <Navigate to='/' replace />
    }

    return <>{children}</>;
}
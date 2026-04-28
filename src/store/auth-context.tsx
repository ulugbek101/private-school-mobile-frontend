import { createContext, useState } from "react";
import type { AuthContextType } from "../models/auth-context"
import { getStoredAuthTokensFromLocalStorage, getUserFromLocalStorage } from "../helpers/token"


export const AuthContext = createContext<AuthContextType | null>(null);


function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [authTokens, setAuthTokens] = useState(() => getStoredAuthTokensFromLocalStorage());
    const [user, setUser] = useState(() => getUserFromLocalStorage());

    async function loginUser(phoneNumber: string, password: string) {}

    function logoutUser() {}

    const value = {
        authTokens,
        setAuthTokens,

        user,
        setUser,

        loginUser,
        logoutUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;

import type { User } from "./user"


export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthContextType {
    authTokens: AuthTokens | null;
    user: User | null
    loginUser: (phoneNumber: string, password: string) => Promise<void>
    logoutUser: () => void;
}

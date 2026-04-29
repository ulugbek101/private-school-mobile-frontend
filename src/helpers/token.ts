import { jwtDecode } from "jwt-decode"
import type { User } from "../models/user"
import type { AuthTokens } from "../models/auth-context"

export function getStoredAuthTokensFromLocalStorage(): AuthTokens | null {
    const storedAuthTokens = localStorage.getItem("_eSchoolManagementSystemsAuthTokens");

    if (storedAuthTokens) {
        try {
            const parsedTokens = JSON.parse(storedAuthTokens);
            return parsedTokens;
        } catch (error: any) {
            return null;
        }
    }
    return null;
}


export function getUserFromLocalStorage(): User | null {
    let user = null;

    const storedAuthTokens = getStoredAuthTokensFromLocalStorage()

    if (storedAuthTokens) {
        user = jwtDecode<User>(storedAuthTokens.access)
    }

    return user
}

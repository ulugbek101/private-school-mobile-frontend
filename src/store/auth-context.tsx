import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";
import {
	getStoredAuthTokensFromLocalStorage,
	getUserFromLocalStorage,
} from "../helpers/token";
import type { AuthContextType, AuthTokens } from "../models/auth-context";
import type { User } from "../models/user";

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredAuthTokensFromLocalStorage(),
	);
	const [user, setUser] = useState(() => getUserFromLocalStorage());

	async function loginUser(phoneNumber: string, password: string) {
		try {
			const response = await fetch(`${BASE_URL}/api/v1/token/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phone_number: phoneNumber, password: password }),
			});

			if (!response.ok) {
				let errorMessage: string;
				if (response.status === 401) {
					errorMessage = `Bunday ma'lumotlarga ega foydalanuvchi tizimda topilmadi`;
				} else {
					errorMessage = `${response.statusText}. ${response.status}`;
				}
				toast.error(errorMessage);
				return false;
			}

			const data: AuthTokens = await response.json();
			const newUser: User = jwtDecode<User>(data.access);

			setAuthTokens(data);
			setUser(newUser);
			localStorage.setItem(
				"_eSchoolManagementSystemsAuthTokens",
				JSON.stringify(data),
			);

			toast.success(
				`Xush kelibsiz, ${newUser.first_name} ${newUser.last_name} !`,
			);
			return true;
		} catch (error: any) {
			throw new Error(`Unknow error: ${error}.`);
		}
	}

	function logoutUser() {
		setUser(null);
		setAuthTokens(null);
		localStorage.removeItem("_eSchoolManagementSystemsAuthTokens");
	}

	const value = {
		authTokens,
		setAuthTokens,

		user,
		setUser,

		loginUser,
		logoutUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

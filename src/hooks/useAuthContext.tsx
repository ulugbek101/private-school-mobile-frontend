import { useContext } from "react";
import type { AuthContextType } from "../models/auth-context";
import { AuthContext } from "../store/auth-context";

function useAuthContext(): AuthContextType {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("AuthContext must be used inside AuthContextProvider");
	}

	return context;
}

export default useAuthContext;

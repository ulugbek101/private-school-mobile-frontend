import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContext";

function RootLayout() {
	const navigate = useNavigate();
	const { user, authTokens } = useAuthContext();

	useEffect(() => {
		if (!user || !authTokens) {
			toast.warning("Sessiya vaqti tugaga, tizimga qayta kirish talab etiladi");
			navigate("/login");
		}
	}, [user, authTokens]);

	return user ? <Outlet /> : null;
}

export default RootLayout;

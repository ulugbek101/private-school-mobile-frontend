import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./store/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthContextProvider>
			<App />
			<ToastContainer toastStyle={{ backgroundColor: "#030712", color: "#90a1b9" }} />
		</AuthContextProvider>
	</StrictMode>,
);

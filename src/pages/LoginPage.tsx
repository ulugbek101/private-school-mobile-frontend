import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"

function LoginPage() {
	const { loginUser } = useAuthContext();
	const navigate = useNavigate();

	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const success: boolean = await loginUser(phoneNumber, password);

		if (success) {
			navigate('/');
		}
	}

	return (
		<div className="absolute w-full h-full bg-gray-950 flex items-center justify-center">
			<form
				onSubmit={handleLogin}
				method="post"
				className="flex flex-col gap-4 w-50"
			>
				<input
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					value={phoneNumber}
					onChange={event => setPhoneNumber(event.target.value)}
					className="w-full focus:outline-none rounded border border-slate-500 py-2 px-4 text-white font-semibold"
				/>

				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={event => setPassword(event.target.value)}
					className="w-full focus:outline-none rounded border border-slate-500 py-2 px-4 text-white font-semibold"
				/>

				<button
					type="submit"
					className="rounded border border-blue-600 py-2 px-4 w-full text-white font-semibold"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default LoginPage;

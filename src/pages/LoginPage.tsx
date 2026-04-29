import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../components/UI/Input";
import useAuthContext from "../hooks/useAuthContext";

interface Inputs {
	phoneNumber: string;
	password: string;
}

function LoginPage() {
	const { loginUser } = useAuthContext();
	const navigate = useNavigate();
	const [formIsValid, setFormIsValid] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<Inputs>({
		defaultValues: {
			phoneNumber: "+998 ",
			password: "",
		},
	});

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	const handleLogin: SubmitHandler<Inputs> = async data => {
		const success = await loginUser(data.phoneNumber, data.password);

		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="min-h-screen w-full bg-gray-950 flex items-center justify-center px-4">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.05),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_5%)]" />

			<form
				onSubmit={handleSubmit(handleLogin)}
				method="post"
				className="relative w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl"
			>
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 ring-1 ring-slate-500/30">
						<span className="material-icons text-slate-500">lock</span>
					</div>

					<h1 className="text-2xl font-bold text-slate-500">Xush kelibsiz!</h1>
					<p className="mt-2 text-sm text-slate-400">
						Tizimga kirish uchun ma'lumotlaringizni tering
					</p>
				</div>

				<div className="flex flex-col gap-4">
					<div>
						<Controller
							name="phoneNumber"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									autoFocus={true}
									{...field}
									mask="+998 (__) ___-__-__"
									replacement={{ _: /\d/ }}
									placeholder="+998 (__) ___-__-__"
									type="text"
									id="phoneNumber"
									className="border border-slate-700 bg-slate-950/70 py-3 pl-4 pr-10 text-slate-400 placeholder:text-slate-500 transition focus:border-slate-500"
									icon="dialpad"
									iconClass="text-slate-500"
								/>
							)}
						/>

						{errors.phoneNumber && (
							<span className="mt-1 block text-xs text-red-400">
								Telefon raqam - bo'sh bo'lishi mumkin emas!
							</span>
						)}
					</div>

					<div>
						<Input
							type={passwordIsVisible ? "text" : "password"}
							id="password"
							placeholder="Maxfiy so'z"
							{...register("password", { required: true })}
							className="border border-slate-700 bg-slate-950/70 py-3 pl-4 pr-10 text-slate-400 placeholder:text-slate-500 transition focus:border-slate-500"
							icon={passwordIsVisible ? "visibility_off" : "visibility"}
							onIconClick={() => setPasswordIsVisible(!passwordIsVisible)}
							iconClass="text-slate-500 hover:text-blue-400"
						/>

						{errors.password && (
							<span className="mt-1 block text-xs text-red-400">
								Parol - bo'sh bo'lishi mumkin emas!
							</span>
						)}
					</div>

					<button
						disabled={!isValid}
						type="submit"
						className="mt-2 rounded-xl bg-blue-900 py-3 px-4 text-sm font-bold text-white shadow-lg transition focus:outline-none ring-2 ring-transparent focus:ring-slate-500 hover:cursor-pointer hover:bg-blue-800 active:scale-95 disabled:bg-gray-800 disabled:active:scale-100 disabled:hover:cursor-not-allowed disabled:text-gray-500"
					>
						Login
					</button>
				</div>

				<p className="mt-6 text-center text-xs text-slate-500 flex flex-row items-center justify-center gap-1">
					<span className="material-icons text-sm! text-gray-500">
						lock_outline
					</span>
					Barcha ma'lumotlar himoyalangan
				</p>
			</form>
		</div>
	);
}

export default LoginPage;

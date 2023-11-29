"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (res.error) {
				setError("Invalid Credentials");
				return;
			}

			router.replace("/");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid place-items-center">
			<div className="p-5 rounded-[12px] bg-white/30 shadow-[0_0_25px_0_rgba(0,0,0,0.1)] backdrop-blur-[2px]">
				<h1 className="text-xl font-bold my-4">Login</h1>
				{loading ? (
					<div>
						loading
					</div>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-3">
						<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="p-3"/>
						<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" className="p-3"/>
						<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]">
							Login
						</button>
						{error && (
							<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
								{error}
							</div>
						)}
					</form>
				)}
			</div>
		</div>
	);
}

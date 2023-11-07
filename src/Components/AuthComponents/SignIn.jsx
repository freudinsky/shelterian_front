import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProv";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setLoggedIn } = useAuth();
	const nav = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}auth/signin`,
				{ email, password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				nav("/dashboard");
				setLoggedIn(true);
			}
		} catch (err) {
			setError(err.response.data.error);
			toast.error(err.response.data.error || "Logindaten falsch!");
		}
	};

	return (
		<>
			<p className="font-bold text-2xl text-center">Login</p>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					className="my-1 mt-10 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="email"
					placeholder="E-Mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="password"
					placeholder="Passwort"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					className="mt-1 bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					type="submit"
					value="Einloggen"
				/>
			</form>
			<div className="text-sm mt-10 text-center">
				{"Noch kein Account? "}
				<Link className="text-rose-800 font-semibold text-center" to="/auth/signup">
					Jetzt registrieren.
				</Link>
			</div>
			<ToastContainer />
		</>
	);
}

export default SignIn;

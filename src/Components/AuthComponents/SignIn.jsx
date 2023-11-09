import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProv";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoad] = useState(false);
	const { setLoggedIn, setLoading, setShelterData } = useAuth();
	const nav = useNavigate();

	// const shelter = async () => {
	// 	try {
	// 		const res = await axios.get(
	// 			`${import.meta.env.VITE_API_URL}auth/shelterinfo`,
	// 			{ withCredentials: true }
	// 		);
	// 		if (res.data && res.data._id) {
	// 			setLoggedIn(true);
	// 			setShelterData(res.data);
	// 		} else {
	// 			setLoggedIn(false);
	// 			setShelterData({});
	// 		}
	// 	} catch (e) {
	// 		setLoggedIn(false);
	// 		setShelterData({});
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoad(true);

		if (email && password) {
			try {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}auth/signin`,
					{ email, password },
					{ withCredentials: true }
				);
				if (res.status === 200 && res.data) {
					// await shelter();
					setShelterData(res.data)
					setLoggedIn(true);
					nav("/dashboard");
					setLoading(false);
					setLoad(false);
				}
			} catch (err) {
				setLoggedIn(false);
				setError(err.response.error);
				toast.error(err.response.error || "Logindaten falsch!");
				setLoad(false);
			}
		} else {
			setLoggedIn(false);
			toast.error("Bitte Email & Passwort eintragen.");
			setLoad(false);
		}
	};

	return (
		<>
			<h1 className="font-bold text-2xl text-center">Login</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					className="my-1 mt-10 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="email"
					placeholder="E-Mail"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="password"
					placeholder="Passwort"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					className="mt-1 bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					onClick={handleSubmit}
					isLoading={loading}
					type="submit"
				>
					Einloggen
				</Button>
				{/* <input
					className="mt-1 bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					type="submit"
					value="Einloggen"
				/> */}
			</form>
			<div className="text-sm mt-10 text-center">
				{"Noch kein Account? "}
				<Link
					className="text-rose-800 font-semibold text-center"
					to="/auth/signup"
				>
					Jetzt registrieren.
				</Link>
			</div>
		</>
	);
}

export default SignIn;

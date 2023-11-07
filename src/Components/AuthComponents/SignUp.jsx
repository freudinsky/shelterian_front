import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
	const [name, setName] = useState("");
	const [refPerson, setRefPerson] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostCode] = useState("");
	const [country, setCountry] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");
	const [pwdSame, setPwdSame] = useState(true);
	const nav = useNavigate();

	const checkPwd = () => {
		if (confirmPwd) {
			if (password === confirmPwd) {
				setPwdSame(true);
			} else {
				setPwdSame(false);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}auth/signup`,
				{
					name,
					refPerson,
					address: street,
					city,
					postcode,
					country,
					phone,
					email,
					password,
				},
				{ withCredentials: true }
			);
			if (res.status === 201) {
				toast.success("Erfolgreich registriert!");
				nav("/auth/signin");
			}
		} catch (err) {
			
			toast.error(err || "Registrierung fehlgeschlagen.");
		}
	};

	return (
		<>
			<p className="font-bold text-lg">Login</p>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					className="my-1 mt-10 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					placeholder="Name Tierheim"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					placeholder="Name Ansprechpartner"
					value={refPerson}
					onChange={(e) => setRefPerson(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					placeholder="Straße & Hausnummer"
					value={street}
					onChange={(e) => setStreet(e.target.value)}
				/>
				<div className="flex gap-2 max-w-full">
					<input
						className="my-1 w-4/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
						type="text"
						placeholder="PLZ"
						value={postcode}
						onChange={(e) => setPostCode(e.target.value)}
					/>
					<input
						className="my-1 w-8/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
						type="text"
						placeholder="Stadt"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<select
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="select"
					placeholder="Land"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				>
					<option value="" disabled>
						Land auswählen
					</option>
					<option value="de">Deutschland</option>
					<option value="at">Österreich</option>
					<option value="ch">Schweiz</option>
				</select>
				{/* <div className="flex justify-between gap-1 items-center">
					<p className="px-2 h-10 font-semibold border-solid border-1 border-slate-300 rounded-t-full rounded-r-none rounded-b-full rounded-l-full">
						{prefix}
					</p> */}
				<input
					className="my-1 w-full border-solid border-1 border-slate-300 rounded-full h-10 indent-5"
					type="text"
					placeholder="Telefonnummer"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				{/* </div> */}
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
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
					className={
						pwdSame
							? "my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
							: "my-1 border-solid border-1 border-red-500 rounded-3xl h-10 indent-5"
					}
					type="password"
					placeholder="Passwort wiederholen"
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)}
					onBlur={checkPwd}
				/>
				<input
					className="mt-1 self-end bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					type="submit"
					value="Registrieren"
				/>
			</form>
			<div className="text-sm mt-10">
				{"Schon registriert? "}
				<Link className="text-rose-800 font-semibold" to="/auth/signin">
					Jetzt einloggen.
				</Link>
			</div>
			<ToastContainer />
		</>
	);
}

export default SignUp;

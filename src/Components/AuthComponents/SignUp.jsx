import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	Tooltip,
	useDisclosure
} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TermsEditor from "../AdminDashboard/AdoptionTerms/TermsEditor";
import EditIcon from "../AdminDashboard/EditIcon";

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
	const [pwdStrong, setPwdStrong] = useState(true);
	const [loading, setLoad] = useState(false);
	const [terms, setTerms] = useState();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const nav = useNavigate();

	const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

	const strongPwd = () => {
		if (strongPwdRegex.test(password)) {
			setPwdStrong(true);
		} else {
			setPwdStrong(false);
		}
	};
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
		checkPwd();
		setLoad(true);

		if (
			pwdSame &&
			name &&
			refPerson &&
			street &&
			city &&
			postcode &&
			country &&
			phone &&
			email
		) {
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
						terms,
					},
					{ withCredentials: true }
				);
				if (res.status === 201) {
					toast.success("Erfolgreich registriert!");
					setLoad(false);
					nav(`/auth/confirmation?${email}`);
				}
			} catch (err) {
				toast.error("Registrierung fehlgeschlagen.");
				setLoad(false);
			}
		} else {
			toast.error("Bitte alle Felder ausfüllen!");
			setLoad(false);
		}
	};

	return (
		<>
			<h1 className="font-bold text-2xl text-center">Registrierung</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					className="my-1 mt-10 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					required
					placeholder="Name Tierheim"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					required
					placeholder="Name Ansprechpartner"
					value={refPerson}
					onChange={(e) => setRefPerson(e.target.value)}
				/>
				<input
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="text"
					required
					placeholder="Straße & Hausnummer"
					value={street}
					onChange={(e) => setStreet(e.target.value)}
				/>
				<div className="flex gap-2 max-w-full">
					<input
						className="my-1 w-4/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
						type="text"
						required
						placeholder="PLZ"
						value={postcode}
						onChange={(e) => setPostCode(e.target.value)}
					/>
					<input
						className="my-1 w-8/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
						type="text"
						required
						placeholder="Stadt"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<select
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="select"
					placeholder="Land"
					required
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				>
					<option value="" disabled>
						Land auswählen
					</option>
					<option value="DE">Deutschland</option>
					<option value="AT">Österreich</option>
					<option value="CH">Schweiz</option>
				</select>
				<input
					className="my-1 w-full border-solid border-1 border-slate-300 rounded-full h-10 indent-5"
					type="text"
					placeholder="Telefonnummer"
					required
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<input
					autoComplete="email"
					className="my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
					type="email"
					placeholder="E-Mail"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className={
						pwdStrong
							? "my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
							: "my-1 border-solid border-1 border-red-500 rounded-3xl h-10 indent-5"
					}
					type="password"
					placeholder="Passwort"
					autoComplete="new-password"
					value={password}
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					onBlur={strongPwd}
				/>
				{!pwdStrong ? (
					<Tooltip
						showArrow={true}
						content={
							<div className="px-4 py-2  text-white">
								<p>Das Passwort muss:</p>
								<ul className="list-disc font-semibold pl-6">
									<li>mind. 1 Kleinbuchstaben</li>
									<li>mind. 1 Großbuchstaben</li>
									<li>mind. 1 Sonderzeichen</li>
									<li>mind. 1 Zahl</li>
									<li>mind. 8 Zeichen</li>
								</ul>
								<p>enthalten.</p>
							</div>
						}
						className="bg-rose-900"
						placement="left"
					>
						<div className="flex items-center gap-1 px-2">
							<img
								width="17"
								height="17"
								src="https://img.icons8.com/ios-glyphs/30/ef4444/info--v1.png"
								alt="info--v1"
							/>
							<label className="text-sm text-red-500" for="password">
								Schwaches Passwort.{" "}
							</label>
						</div>
					</Tooltip>
				) : (
					""
				)}
				<input
					className={
						pwdSame
							? "my-1 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
							: "my-1 border-solid border-1 border-red-500 rounded-3xl h-10 indent-5"
					}
					type="password"
					placeholder="Passwort wiederholen"
					autoComplete="new-password"
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)}
					required
				/>
				{!pwdSame ? (
					<div className="flex items-center gap-1 mb-2 px-2">
						<img
							width="17"
							height="17"
							src="https://img.icons8.com/ios-glyphs/30/ef4444/info--v1.png"
							alt="info--v1"
						/>
						<label className="text-sm text-red-500" for="password">
							Passwörter müssen übereinstimmen.
						</label>
					</div>
				) : (
					""
				)}
				<Button
					className="mt-1 bg-rose-600 mb-4 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					onClick={onOpen}
				>
					<EditIcon />
					Vermittlungsbedingungen hinzufügen
				</Button>
				<Modal
					size="3xl"
					placement="auto"
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					className="h-fit"
				>
					<ModalContent>
						{(onClose) => (
						<>
							<ModalHeader className="text-lg font-bold text-white h-1/6 bg-rose-900">
								Vermittlungsbedingungen hinzufügen
							</ModalHeader>
								<TermsEditor
									terms={terms}
									setTerms={setTerms}
									onClose={onClose}
								/>
						</>
						)}
					</ModalContent>
				</Modal>
				<Button
					className="mt-1 bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
					onClick={handleSubmit}
					isLoading={loading}
					type="submit"
				>
					Registrieren
				</Button>
			</form>
			<div className="text-sm mt-10  text-center">
				{"Schon registriert? "}
				<Link className="text-rose-800 font-semibold " to="/auth/signin">
					Jetzt einloggen.
				</Link>
			</div>

		</>
	);
}

export default SignUp;

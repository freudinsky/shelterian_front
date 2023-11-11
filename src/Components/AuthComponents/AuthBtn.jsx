import React from "react";
import { useAuth } from "../../Context/AuthProv";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AuthBtn() {
	const { loggedIn, setLoggedIn } = useAuth();
	const nav = useNavigate()

	const handleLogout = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}auth/logout`,
				{},
				{ withCredentials: true }
			);
			setLoggedIn(false);
			nav("/")
			window.location.reload()
		} catch (err) {
			toast.error("Fehler beim Ausloggen.");
		}
	};

	return (
		<>
			<div className="flex items-center">
				{loggedIn ? (
					<div className="flex justify-end items-center gap-4">
						<Link to="/dashboard">
							<Button
								variant="flat"
								radius="full"
								className="bg-rose-800 text-white font-semibold"
							>
								Dashboard
							</Button>
						</Link>{" "}
						<Button
							variant="flat"
							size="md"
							onClick={handleLogout}
							radius="full"
							className="bg-neutral-500 text-white font-semibold"
						>
							Logout
						</Button>
					</div>
				) : (
					<Link to="/auth/signin">
						<Button
							variant="solid"
							size="md"
							radius="full"
							className="bg-rose-800 text-white font-semibold"
						>
							Login
						</Button>
					</Link>
				)}
			</div>
		</>
	);
}

export default AuthBtn;

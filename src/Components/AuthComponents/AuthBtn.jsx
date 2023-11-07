import React from "react";
import { useAuth } from "../../Context/AuthProv";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function AuthBtn() {
	const { loggedIn, setLoggedIn } = useAuth();

	const handleLogout = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}auth/logout`,
				{},
				{ withCredentials: true }
			);
			setLoggedIn(false);
		} catch (err) {
			toast.error("Fehler beim Ausloggen.");
		}
	};

	return (
		<>
			<div className="flex items-center">
				{loggedIn ? (
					<div className="flex justify-end items-center gap-4">
						<Button
							variant="flat"
							radius="full"
							className="bg-rose-800 text-white font-semibold"
						>
							<Link to="/dashboard">Dashboard</Link>
						</Button>{" "}
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
					<Button
						variant="solid"
						size="md"
						radius="full"
						className="bg-rose-800 text-white font-semibold"
					>
						<Link to="/auth/signin">Login</Link>
					</Button>
				)}
			</div>
			<ToastContainer />
		</>
	);
}

export default AuthBtn;

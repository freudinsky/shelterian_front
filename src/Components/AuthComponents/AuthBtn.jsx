import React from "react";
import { useAuth } from "../../Context/AuthProv";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
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
						<Button variant="flat">
							<Link to="/dashboard">Dashboard</Link>
						</Button>{" "}
						<Button variant="bordered" size="md" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				) : (
					<Button variant="solid" size="md">
						<Link to="/signin">Login</Link>
					</Button>
				)}
			</div>
		</>
	);
}

export default AuthBtn;

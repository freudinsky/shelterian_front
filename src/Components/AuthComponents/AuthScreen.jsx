import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthProv";

function AuthScreen() {
	const { loggedIn } = useAuth();

	return (
		<>
			{ loggedIn ?
				<div className="auth-screen">
					<Outlet />
				</div> : ""
			}
		</>
	);
}

export default AuthScreen;

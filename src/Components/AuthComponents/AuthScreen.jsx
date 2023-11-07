import React from "react";
import { Outlet } from "react-router-dom";

function AuthScreen() {
	return (
		<>
			<div className="auth-screen">
				<Outlet />
			</div>
		</>
	);
}

export default AuthScreen;

import React from "react";
import { Outlet } from "react-router-dom";

function AuthScreen() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default AuthScreen;

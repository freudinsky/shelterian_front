import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";

function AuthScreen() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default AuthScreen;

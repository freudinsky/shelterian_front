import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";

function AuthScreen() {
	return (
		<>
			<div className="auth-screen"><Outlet /></div>
		</>
	);
}

export default AuthScreen;

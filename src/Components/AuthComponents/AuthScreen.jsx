import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthScreen() {
	return (
		<>
			<div className="auth-screen">
				<div className="container mx-auto max-w-sm my-20 border-slate-200 border-solid border-1  rounded-xl shadow-md shadow-slate-300 py-8">
					<div className="w-10/12 mx-auto">
						<Outlet />
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}

export default AuthScreen;

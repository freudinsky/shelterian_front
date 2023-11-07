import React from "react";
import { Outlet } from "react-router-dom";

function AuthScreen() {
	return (
		<>
			<div className="auth-screen">
				<div className="container mx-auto max-w-sm my-20 border-slate-200 border-solid border-1  rounded-xl shadow-md shadow-slate-300 py-8">
					<div className="w-10/12 mx-auto">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default AuthScreen;

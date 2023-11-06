import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import AuthBtn from "./AuthComponents/AuthBtn";

function NavBar() {
	return (
		<>
			<div className="flex justify-between gap-8 min-w-sm max-screen align-middle">
				<div className="flex justify-start gap-8 align-middle my-5">
					<Link to="/">
						<img
							src={import.meta.env.VITE_LOGO_LNG}
							alt="Shelterian Logo long"
							className="w-56"
						/>
					</Link>
					<Navigation />
				</div>
				<div className="flex items-center justify-end"><AuthBtn /></div>
			</div>
		</>
	);
}

export default NavBar;

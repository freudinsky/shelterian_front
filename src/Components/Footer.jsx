import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<>
			<hr className="my-6 w-full" />
			<div className="w-5/12 max-w-md">
				<ul className="flex justify-between font-semibold">
					<li>
						<Link to="/imprint">Impressum</Link>
					</li>
					<li>
						<Link to="/privacy">Datenschutzerklärung</Link>
					</li>
					<li>
						<Link to="/terms">Nutzungsbedingungen</Link>
					</li>
				</ul>
			</div>
			<p className="my-2 text-sm font-light"> &copy; Shelterian 2023 </p>
		</>
	);
}

export default Footer;

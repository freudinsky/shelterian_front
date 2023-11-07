import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "@nextui-org/react";

function Footer() {
	return (
		<>
			<Divider className="my-6 w-full" />
			<div className="w-5/12 max-w-md">
				<ul className="flex justify-start gap-6 font-semibold">
					<li>
						<Link to="/imprint">Impressum</Link>
					</li>
					<li>
						<Link to="/privacy">Datenschutzerklärung</Link>
					</li>
					{/* <li>
						<Link to="/terms">Nutzungsbedingungen</Link>
					</li> */}
				</ul>
			</div>
			<p className="my-2 text-sm font-light"> &copy; Shelterian 2023 </p>
		</>
	);
}

export default Footer;

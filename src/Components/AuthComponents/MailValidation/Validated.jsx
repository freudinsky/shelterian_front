import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProv";

function Validated({ email, data }) {
	const { loggedIn } = useAuth();

	return (
		<>
			{!data.validated ? (
				<>
					<h1 className="font-bold text-2xl">
						E-Mail Adresse erfolgreich bestätigt!
					</h1>
					<p className="mt-8 mb-4">
						Liebe/r {data.refPerson} von {data.name},
					</p>
					<p className="mb-8">
						Vielen Dank für das Bestätigen deiner E-Mail Adresse {email}!
					</p>
					{loggedIn ? (
						<>
							<Link className="w-fit" to="/dashboard">
								<Button
									variant="solid"
									size="md"
									radius="full"
									className="bg-rose-800 text-lg h-12 text-white font-semibold"
								>
									Zum Dashboard
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link className="w-fit" to="/auth/signin">
								<Button
									variant="solid"
									size="md"
									radius="full"
									className="bg-rose-800 text-lg h-12 text-white font-semibold"
								>
									Zum Login
								</Button>
							</Link>
						</>
					)}
				</>
			) : (
				<>
					<h1 className="font-bold text-2xl">E-Mail bereits bestätigt!</h1>
					<p className="mt-8 mb-4">
						Liebe/r {data.refPerson} von {data.name},
					</p>
					<p className="mb-8">Deine E-Mail Adresse wurde bereits bestätigt!</p>

					{loggedIn ? (
						<>
							<Link className="w-fit" to="/dashboard">
								<Button
									variant="solid"
									size="md"
									radius="full"
									className="bg-rose-800 text-lg h-12 text-white font-semibold"
								>
									Zum Dashboard
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link className="w-fit" to="/auth/signin">
								<Button
									variant="solid"
									size="md"
									radius="full"
									className="bg-rose-800 text-lg h-12 text-white font-semibold"
								>
									Zum Login
								</Button>
							</Link>
						</>
					)}
				</>
			)}
		</>
	);
}

export default Validated;

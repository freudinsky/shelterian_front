import { Button } from '@nextui-org/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SignupConfirmation() {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const email = query.get("email")

  return (
		<div className="text-center">
			<h1 className="font-bold text-2xl text-center mb-8">
				Registrierung erfolgreich!
			</h1>
			<p className="my-4">Vielen Dank für deine Registrierung!</p>
			<p className="my-4">
				Wir haben dir einen Bestätigungs-Link per E-Mail an{" "}
				<span className="font-bold">{email}</span> geschickt.{" "}
			</p>{" "}
			<p className="my-4 font-bold">
				{" "}
				Bitte bestätige deine E-Mail Adresse über den Link in dieser E-Mail, um
				deinen Account in vollem Umfang nutzen zu können.
			</p>
			<p className="my-4 bg-rose-800 text-white p-4 rounded-2xl">
				<span className="font-semibold">Bitte beachte,</span> dass von dir
				eingetragene Tiere nicht in öffentlich sichtbar sind, bis deine{" "}
				<ul className="w-2/5 my-4 mx-auto list-disc font-semibold">
					<li>E-Mail Adresse</li> <li>Tierheim-Status</li>
				</ul>{" "}
				bestätigt wurden.
			</p>
			<div className='flex justify-center gap-4 mt-8'>
			    <Link className="w-fit" to="/">
    				<Button
    					variant="solid"
    					size="md"
    					radius="full"
    					className="bg-neutral-500 text-white text-base font-semibold"
    				>
    					Startseite
    				</Button>
    			</Link>
    			<Link className="w-fit" to="/auth/signin">
    				<Button
    					variant="solid"
    					size="md"
    					radius="full"
    					className="bg-rose-800 text-white text-base font-semibold"
    				>
    					Login
    				</Button>
    			</Link>
			</div>
		</div>
	);
}

export default SignupConfirmation
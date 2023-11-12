import { Button } from '@nextui-org/react';
import React from 'react'
import { Link } from 'react-router-dom';

function Notvalidated({email}) {
  return (
		<>
			<h1 className="font-bold text-2xl">
				Das hat leider nicht geklappt!
			</h1>
			
			<p className="my-8">
				Leider ist bei der Bestätigung deiner E-Mail Adresse ein Fehler aufgetreten!
			</p>
			<Link to="/">
				<Button
					variant="solid"
					size="md"
					radius="full"
					className="bg-rose-800 text-lg h-12 text-white font-semibold"
				>
					Zur Startseite
				</Button>
			</Link>
		</>
	);
}

export default Notvalidated
import React from 'react'
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const nav = useNavigate()

  return (
		<div className="w-full mx-auto max-w-screen-md h-96 flex flex-col justify-center items-center">
			<div>
				<h1 className="m-0 p-0 text-8xl text-neutral-600 text-center">404</h1>
				<h2 className="m-0 p-0 text-5xl text-neutral-600 text-center my-6">
					{" "}
					Da hat sich wohl jemand verirrt?
				</h2>
			</div>
			<Button
				className="bg-rose-800 text-white rounded-full text-lg font-semibold mt-6"
				onClick={() => nav("/")}
			>
				Zurück zu Home
			</Button>
		</div>
	);
}

export default NotFound
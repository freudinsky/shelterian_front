import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';

function RequestEmailValidate({shelterData}) {
    const [timeout, setTime] = useState(false)

const handleSendNewMail = async() => {
    try {
        const res = await axios.get(
					`${import.meta.env.VITE_API_URL}auth/new-validation-link?email=${
						shelterData.email
					}`
				);
                if (res.status === 201){
                    toast.success("E-Mail erfolgreich versandt.")
                    setTime(true)
                    setTimeout(()=>setTime(false), 10000);
                }
    } catch (error) {
        toast.error(error)
    }
}

  return (
		<div className="mt-4 py-4 px-6 bg-rose-700/75 text-white">
			<p className="text-base font-semibold">
				Bitte bestätige deine E-Mail Adresse, um deinen Account voll nutzen zu
				können.
			</p>
			<div className='flex items-center gap-2 h-10'>
			    <p className="text-sm h-fit">
    				Keine E-Mail bekommen?
    			</p>
    				{!timeout? <Link className='text-sm font-semibold p-0 underline' onClick={handleSendNewMail}>
    					E-Mail erneut senden
    				</Link>: <Spinner size='sm' aria-label='Timeout...' color="default" className='ml-2' />}
			</div>
		</div>
	);
}

export default RequestEmailValidate
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Notvalidated from "./MailValidation/Notvalidated";
import Validated from "./MailValidation/Validated";

function MailValidation() {
	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(true);
  const [shelData, setShelData] = useState({})
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const email = query.get("email");
	const token = query.get("token");

	useEffect(() => {
		const validatonFetch = async (email, token) => {
			setLoading(true);
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}auth/validate?email=${email}&token=${token}`
				);
				if (res.status === 201) {
					setValidated(true);
          setShelData(res.data)
				} else {
					setValidated(false);
				}
				setLoading(false);
			} catch (error) {
				setValidated(false);
				setLoading(false);
				return;
			}
		};
    validatonFetch(email, token)
	}, [email, token]);

  return (
		<div className="p-8 flex flex-col">
			{!loading ? (
				validated ? (
					<Validated email={email} data={shelData} />
				) : (
					<Notvalidated email={email} />
				)
			) : (
				<Spinner />
			)}
		</div>
	);
}

export default MailValidation;

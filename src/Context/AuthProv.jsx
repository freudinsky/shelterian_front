import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProv = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [shelterData, setShelterData] = useState({});
	const [loading, setLoading] = useState(true);
	const [authed, setAuthed] = useState(true);
	//const []

	function checkCookie() {
		const cookies = document.cookie.split(";");
		const cookie = cookies.find((cookie) => cookie.startsWith("auth="));

		if (cookie) {
			setAuthed(true);
		} else {
			setAuthed(false);
		}
	}

	useEffect(() => {
		checkCookie();
		const shelter = async () => {
			if (!authed) {
				try {
					const res = await axios.get(
						`${import.meta.env.VITE_API_URL}auth/shelterinfo`,
						{ withCredentials: true }
					);
					if (res.data && res.data._id) {
						setLoggedIn(true);
						setShelterData(res.data);
					} else {
						setLoggedIn(false);
						setShelterData({});
					}
				} catch (e) {
					setLoggedIn(false);
					setShelterData({});
				} finally {
					setLoading(false);
				}
			}else{
				setLoggedIn(true)
				setLoading(false)
			}
		};
		shelter();
	}, []);

	const value = {
		loggedIn,
		setLoggedIn,
		shelterData,
		setShelterData,
		loading,
		setLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

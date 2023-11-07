import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProv";
import axios from "axios";

function Overview() {
	const [myDogs, setMyDogs] = useState([]);
	const [myCats, setMyCats] = useState([]);
	const { loggedIn, shelterData } = useAuth();

	useEffect(() => {
			const fetchAnimals = async () => {
				try {
					const res = await axios.get(
						`${import.meta.env.VITE_API_URL}admin/myentries`,
						{ withCredentials: true }
					);
					if (res.status === 201 && res.data) {
            setMyCats(res.data.cats)
            setMyDogs(res.data.dogs)
					}
				} catch (error) {
					console.log(error);
				}
			};
      fetchAnimals()
		},
		[])
	

	return <div>Overview</div>;
}

export default Overview;

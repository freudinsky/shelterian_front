import React, { useEffect, useState } from "react";
import ShowcaseRow from "./ShowcaseRow";
import axios from "axios";
import { Spinner, Divider, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Showcase() {
	const [cats, setCats] = useState();
	const [dogs, setDogs] = useState();
	const [isLoading, setIsloading] = useState(true);
    const nav = useNavigate()

	useEffect(() => {
		const fetchDogs = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}data/dogs`,
					{ withCredentials: true }
				);
				if (res.status === 200 && res.data) {
					setDogs(res.data);
					setIsloading(false);
				}
			} catch (error) {
				return;
			}
		};
		const fetchCats = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}data/cats`,
					{ withCredentials: true }
				);
				if (res.status === 200 && res.data) {
					setCats(res.data);
				}
			} catch (error) {
				return;
			}
		};
		fetchDogs();
		fetchCats();
	}, []);

	console.log(cats, dogs);

	return (
		<>
			{!isLoading && dogs && cats ? (
				<div>
					<Divider className="my-4" />
					<h2 className="text-3xl font-bold my-8 pl-10">Tiere</h2>
					<div className="max-w-screen-2xl mx-auto">
					    <div className="bg-amber-950/60 rounded-3xl px-6 py-2 my-4 shadow-lg flex flex-col">
    						<h2 className="text-2xl text-white mt-2 font-bold ">Hunde</h2>
    						<ShowcaseRow key={dogs} animals={dogs} type={"dog"} />
    						<Button
    							radius="full"
    							color="warning"
    							onClick={() => nav("/browse/dogs")}
    							className="mb-2 w-fit px-6 self-end text-white font-semibold"
    						>
    							Zu den Hunden
    						</Button>
    					</div>
    					<div className="bg-amber-950/60 rounded-3xl px-6 py-2 my-4 shadow-lg flex flex-col">
    						<h2 className="text-2xl mt-2 text-white font-bold">Katzen</h2>
    						<ShowcaseRow key={cats} animals={cats} type={"cat"} />
    						<Button
    							radius="full"
    							color="warning"
    							onClick={() => nav("/browse/cats")}
    							className="mb-2 w-fit px-6 self-end text-white font-semibold"
    						>
    							Zu den Katzen
    						</Button>
    					</div>
					</div>
					<Divider className="my-4" />
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
}

export default Showcase;

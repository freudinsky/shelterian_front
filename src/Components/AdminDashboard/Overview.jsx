import { Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AnimCard from "../AnimCard";
import { useAuth } from "../../Context/AuthProv";

function Overview() {
	const [myDogs, setMyDogs] = useState([]);
	const [myCats, setMyCats] = useState([]);
	const { loggedIn, shelterData } = useAuth();

	function forceCardUpdate() {
		const cardComponent = ref.current.querySelector(".card-component");

		cardComponent.forceUpdate();
	}

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}admin/myentries`,
					{ withCredentials: true }
				);
				if (res.status === 201 && res.data) {
					setMyCats(res.data.cats);
					setMyDogs(res.data.dogs);
				}
			} catch (error) {
				console.log(error);
			}
		};
		
		fetchAnimals();
	}, [myDogs, myCats]);

	return (
		<>
			<Tabs
				key="tiere"
				color="warning"
				size="lg"
				variant="light"
				radius="full"
				className="font-semibold mt-4 mb-2"
			>
				<Tab key="dogs" title="Hunde">
					<div className="mt-0 mb-4 w-full max-w-screen-2xl mx-auto">
						<h2 className="text-2xl font-bold ">Unsere Hunde</h2>
						<div className="flex justify-start flex-wrap gap-x-4 gap-y-0 items-center w-fit">
							{myDogs.map((dog) => (
								<AnimCard key={dog._id} animal={dog} type={"dog"} />
							))}
						</div>
					</div>
				</Tab>
				<Tab key="cats" title="Katzen">
					<div className="mt-0 mb-4 w-full max-w-screen-2xl mx-auto">
						<h2 className="text-2xl font-bold ">Unsere Katzen</h2>
						<div className="flex justify-start flex-wrap gap-x-4 gap-y-0 items-center w-fit">
							{myCats.map((cat) => (
								<AnimCard
									key={cat._id}
									animal={cat}
									type={"cat"}
									shelterData={shelterData}
									loggedIn={loggedIn}
								/>
							))}
						</div>
					</div>
				</Tab>
			</Tabs>
		</>
	);
}

export default Overview;

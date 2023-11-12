import { Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProv";
import EntryTab from "./OverviewTabs/EntryTab";

function Overview() {
	const [myDogs, setMyDogs] = useState([]);
	const [myCats, setMyCats] = useState([]);
	const [selectedTab, setSelectedTab] = useState("dogs")
	const { refresh } = useAuth();

	
	useEffect(() => {
		async function fetchAnimals() {
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
		}
		fetchAnimals();
	}, [refresh]);

	return (
		<>
			<Tabs
				key="tiere"
				color="warning"
				size="lg"
				variant="light"
				radius="full"
				className="font-semibold mt-4 mb-2"
				selectedKey={selectedTab}
				onSelectionChange={setSelectedTab}
			>
				<Tab key="dogs" title="Hunde">
					<EntryTab animals={myDogs} type={"dog"} />
				</Tab>
				<Tab key="cats" title="Katzen">
					<EntryTab animals={myCats} type={"cat"} />
				</Tab>
			</Tabs>
		</>
	);
}

export default Overview;

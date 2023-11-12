import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthProv";
import AdminNav from "./AdminNav";

function Dashboard() {
	const {shelterData} = useAuth()
	
	return (
		<>
			
			<AdminNav shelterData={shelterData} />
			<Outlet />
		</>
	);
}

export default Dashboard;

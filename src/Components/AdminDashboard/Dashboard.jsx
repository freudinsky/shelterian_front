import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import { useAuth } from "../../Context/AuthProv"; 
import RequestEmailValidate from "./RequestEmailValidate";

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

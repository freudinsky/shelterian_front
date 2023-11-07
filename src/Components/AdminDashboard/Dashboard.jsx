import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import { useAuth } from "../../Context/AuthProv"; 

function Dashboard() {
	const {loading} = useAuth()

	return (
		<>
		
			<AdminNav />
			<Outlet />
		</>
	);
}

export default Dashboard;

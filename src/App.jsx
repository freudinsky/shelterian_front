import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AccountEdit from "./Components/AdminDashboard/AccountEdit";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import EditView from "./Components/AdminDashboard/EditView";
import NewAnimal from "./Components/AdminDashboard/NewAnimal";
import AuthScreen from "./Components/AuthComponents/AuthScreen";
import SignIn from "./Components/AuthComponents/SignIn";
import SignUp from "./Components/AuthComponents/SignUp";
import Browse from "./Components/Browse/Browse";
import DetailView from "./Components/Browse/DetailView";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Imprint from "./Components/Legal/Imprint";
import PrivacyNote from "./Components/Legal/PrivacyNote";
import TnC from "./Components/Legal/TnC";
import NavBar from "./Components/NavBar";
import NotFound from "./Components/NotFound";
import { useAuth } from "./Context/AuthProv";
import Overview from "./Components/AdminDashboard/Overview";
import DashOverv from "./Components/AdminDashboard/DashOverv";
import { Spinner } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

function App() {
	const { loading, loggedIn } = useAuth();

	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				//Auth
				<Route
					path="/auth"
					element={
						!loggedIn ? (
							<AuthScreen />
						) : loading ? (
							<Spinner />
						) : (
							<Navigate to="/dashboard" />
						)
					}
				>
					<Route path="" element={<Navigate to="signin" />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				//Browse
				<Route path="/browse/:type" element={<Browse />} />
				<Route path="/detail/:type/:id" element={<DetailView />} />
				//Admin Dashboard
				<Route
					path="/dashboard"
					element={
						loggedIn && !loading ? (
							<Dashboard />
						) : loading ? (
							""
						) : (
							<Navigate to="/auth/signin" />
						)
					}
				>
					<Route path="" element={<DashOverv />} />
					<Route path="myentries" element={<Overview />} />
					<Route path="new" element={<NewAnimal />} />
					<Route path="edit/:type/:id" element={<EditView />} />
					<Route path="account" element={<AccountEdit />} />
				</Route>
				//Legal Docs
				<Route path="/imprint" element={<Imprint />} />
				<Route path="/privacy" element={<PrivacyNote />} />
				<Route path="/terms" element={<TnC />} />
				// 404 Handling
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
			<Footer />

			<ToastContainer />
		</>
	);
}

export default App;

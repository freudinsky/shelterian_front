import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./Components/AuthComponents/AuthScreen";
import SignIn from "./Components/AuthComponents/SignIn";
import SignUp from "./Components/AuthComponents/SignUp";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Browse from "./Components/Browse/Browse";
import { useAuth } from "./Context/AuthProv";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import AdminOverview from "./Components/AdminDashboard/AdminOverview";
import DetailView from "./Components/Browse/DetailView";
import NewAnimal from "./Components/AdminDashboard/NewAnimal";
import EditView from "./Components/AdminDashboard/EditView";
import AccountEdit from "./Components/AdminDashboard/AccountEdit";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Imprint from "./Components/Legal/Imprint";
import PrivacyNote from "./Components/Legal/PrivacyNote";
import TnC from "./Components/Legal/TnC";

function App() {
	const { loggedIn } = useAuth();

	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				//Auth
				<Route path="/auth" element={<AuthScreen />}>
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
					element={loggedIn ? <Dashboard /> : <Navigate to="/auth/signin" />}
				>
					<Route path="" element={<AdminOverview />} />
					<Route path="new/:type" element={<NewAnimal />} />
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
		</>
	);
}

export default App;

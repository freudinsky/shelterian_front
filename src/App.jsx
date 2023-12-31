import { Spinner } from "@nextui-org/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AccountEdit from "./Components/AdminDashboard/AccountEdit";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import EditView from "./Components/AdminDashboard/EditView";
import NewAnimal from "./Components/AdminDashboard/NewAnimal";
import Overview from "./Components/AdminDashboard/Overview";
import AuthScreen from "./Components/AuthComponents/AuthScreen";
import MailValidation from "./Components/AuthComponents/MailValidation";
import SignIn from "./Components/AuthComponents/SignIn";
import SignUp from "./Components/AuthComponents/SignUp";
import SignupConfirmation from "./Components/AuthComponents/SignupConfirmation";
import Browse from "./Components/Browse/Browse";
import DetailView from "./Components/Browse/DetailView";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Imprint from "./Components/Legal/Imprint";
import PrivacyNote from "./Components/Legal/PrivacyNote";
import TnC from "./Components/Legal/TnC";
import NavBar from "./Components/NavBar";
import NotFound from "./Components/NotFound";
import { useAuth } from "./Context/AuthProv";

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
					<Route path="confirmation" element={<SignupConfirmation/>}/>
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
					{/* <Route path="" element={<DashHome />} /> */}
					<Route path="" element={<Navigate to="entries" />} />

					<Route path="entries" element={<Overview />} />
					<Route path="new" element={<NewAnimal />} />
					<Route path="edit/:type/:id" element={<EditView />} />
					<Route path="account" element={<AccountEdit />} />
				</Route>
				//Legal Docs
				<Route path="/imprint" element={<Imprint />} />
				<Route path="/privacy" element={<PrivacyNote />} />
				<Route path="/terms" element={<TnC />} />
				// Validation
				<Route path="/validation" element={<MailValidation/>}/>
				// 404 Handling
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
			<Footer />

			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}

export default App;

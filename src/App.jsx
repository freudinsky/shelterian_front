import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./Components/AuthScreen";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Browse from "./Components/Browse";
import { useAuth } from "./Context/AuthProv";
import Dashboard from "./Components/Dashboard";
import AdminOverview from "./Components/AdminOverview";
import DetailView from "./Components/DetailView";
import NewAnimal from "./Components/NewAnimal";
import EditView from "./Components/EditView";
import AccountEdit from "./Components/AccountEdit";

function App() {
	const { loggedIn } = useAuth();

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				//Auth
				<Route path="/auth" element={<AuthScreen />}>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
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
					<Route path="/new/:type" element={<NewAnimal />} />
					<Route path="/edit/:type/:id" element={<EditView />} />
					<Route path="/account" element={<AccountEdit />} />
				</Route>
        
				// 404 Handling
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProv } from "./Context/AuthProv.jsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProv>
			<React.StrictMode>
				<NextUIProvider>
					<App />
				</NextUIProvider>
			</React.StrictMode>
		</AuthProv>
	</BrowserRouter>
);

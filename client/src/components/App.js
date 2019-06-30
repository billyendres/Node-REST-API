import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Avatar from "./Avatar";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/users" component={Users} />
				<Route path="/users/profile/avatar" component={Avatar} />
			</BrowserRouter>
		</div>
	);
};

export default App;

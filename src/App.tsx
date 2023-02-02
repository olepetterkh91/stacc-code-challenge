import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Company from "./pages/Company";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Person from "./pages/Person";
import SingleCompany from "./pages/SingleCompany";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/company" component={Company} exact />
				<Route path="/company/:orgNr" component={SingleCompany} exact />
				<Route path="/person/:name" component={Person} exact />
				<Route path="*" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

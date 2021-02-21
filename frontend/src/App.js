import './styles/styles.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './components/Login'
import Header from './components/Header'
import RegisterApplicant from './components/RegisterApplicant'
import RegisterContributor from './components/RegisterContributor'
import HostView from './components/HostView'
import ApplicantView from './components/ApplicantView'
import Status from './components/Status'

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route path="/register-applicant">
						<RegisterApplicant />
					</Route>
					<Route path="/register-host">
						<RegisterContributor />
					</Route>
					<Route path="/host">
						<HostView />
					</Route>
					<Route path="/applicant">
						<ApplicantView />
					</Route>
					<Route>
						<Status/>
					</Route>
				</Switch>
			</Router>

		</div>
	);
}

export default App;

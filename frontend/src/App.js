import './styles/styles.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './components/Login'
import Header from './components/Header'
import RegisterApplicant from './components/RegisterApplicant'
import RegisterHost from './components/RegisterHost'
import HostView from './components/HostView'
import ApplicantView from './components/ApplicantView'
// export const AuthContext = createContext()

// const initialState = {
// 	isAuthenticated: false,
// 	user: null,
// 	token: null
// }

// const reducer = (state, action) => {
// 	switch (action.type) {
// 	  case "LOGIN":
// 		localStorage.setItem("user", JSON.stringify(action.data.user));
// 		localStorage.setItem("token", JSON.stringify(action.data.token));
// 		return {
// 		  ...state,
// 		  isAuthenticated: true,
// 		  user: action.payload.user,
// 		  token: action.payload.token
// 		};
// 	//   case "LOGOUT":
// 	// 	localStorage.clear();
// 	// 	return {
// 	// 	  ...state,
// 	// 	  isAuthenticated: false,
// 	// 	  user: null
// 	// 	};
// 	  default:
// 		return state;
// 	}
//   };

function App() {
	// const [state, dispatch] = useReducer(reducer, initialState);

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
						<RegisterHost />
					</Route>
					<Route path="/host">
						<HostView />
					</Route>
					<Route path="/applicant">
						<ApplicantView />
					</Route>
				</Switch>
			</Router>

		</div>

	);
}

export default App;

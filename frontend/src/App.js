import './styles/styles.css'
import Login from './components/Login'
import Header from './components/Header'
import RegisterApplicant from './components/RegisterApplicant'
import RegisterContributor from './components/RegisterContributor'

function App() {
	return (
		<div className="App">
			<Header />
			{/* <Login /> */}
			<RegisterApplicant />	
			{/* <RegisterContributor />	 */}
		</div>
	);
}

export default App;

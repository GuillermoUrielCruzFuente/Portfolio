import { useEffect } from 'react'
import Lottie from 'lottie-web'

//data imports
import logoAnimation from '../static/logo.json'

//styles imports
import '../scss/App.css'

//component imports
import Nav from './Nav'

function App() {
	useEffect(() => {
		Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: false,
			loop: false,
			renderer: 'svg'
		})
	}, []) //run code when component is initialized

	return (
		<div className="App">
			<Nav></Nav>
			<header className="App-header">
				<p>Hi!, I'm</p>
				<div id="lottie-animation"></div>
			</header>
		</div>
	)
}

export default App

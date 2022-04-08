import { useEffect } from 'react'
import Lottie from 'lottie-web'

import logoAnimation from '../static/logo.json'

import '../scss/App.css'

function App() {
	useEffect(() => {
		Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: true,
			loop: false,
			renderer: 'svg'
		})
	})

	return (
		<div className="App">
			<header className="App-header">
				<p>Hi!, my name is</p>
				<div id="lottie-animation"></div>
			</header>
		</div>
	)
}

export default App

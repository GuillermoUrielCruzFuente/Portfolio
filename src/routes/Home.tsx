import { useEffect } from 'react'
import Lottie from 'lottie-web'

//data imports
import logoAnimation from '../static/logo.json'

//styles imports
import '../scss/Home.scss'

export default function Home() {
	useEffect(() => {
		Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: false,
			loop: false,
			renderer: 'svg',
			name: 'homeLogo'
		})

		setTimeout(() => {
			Lottie.play('homeLogo')
		}, 1300);
	}, []) //run code when component is initialized

	return (
		<div className="App">
			<header className="App-header">
				<p className='big-text'>Hola!, soy</p>
				<div id="lottie-animation"></div>
				<p>Desarrollador web frontend, diseñador UX/UI y cuando la ocasión lo requiere editor y motion designer.</p>
				<button>contactar</button>
			</header>
		</div>
	)
}

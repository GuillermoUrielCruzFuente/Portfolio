import { useEffect } from 'react'
import Lottie from 'lottie-web'

//data imports
import logoAnimation from '../static/lottie/logo.json'

//styles imports
import '../scss/Home.scss'

export default function Home() {

	useEffect(() => {
		let logoAnim = Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: false,
			loop: false,
			renderer: 'svg',
			name: 'homeLogo',
			rendererSettings: {
				progressiveLoad: false,
				hideOnTransparent: true,
				viewBoxOnly: true,
				focusable: false
			}
		})

		setTimeout(() => {
			logoAnim.play()
			console.log('generated')
		}, 1000);

		return () => {
			logoAnim.destroy()
			console.log('destroyed')
		}
	})

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

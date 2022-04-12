import { useEffect } from 'react'
import Lottie from 'lottie-web'

//data imports
import logoAnimation from '../static/lottie/logo.json'

//styles imports
import '../scss/Home.scss'

export default function Home() {

	useEffect(() => {
		let homeShapeRef = document.getElementById('home-shape') as HTMLElement

		let logoAnim = Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: false,
			loop: false,
			renderer: 'svg',
			name: 'homeLogo',
			rendererSettings: {
				progressiveLoad: true,
				hideOnTransparent: true,
				viewBoxOnly: false,
				focusable: false
			}
		})

		document.getElementsByTagName('html')[0].style.overflow = 'auto'

		setTimeout(() => {
			logoAnim.play()
			homeShapeRef.style.animation = 'home-shape-in 1s ease 300ms forwards'
		}, 1000);

		return () => {
			logoAnim.destroy()
		}
	})

	return (
		<div className="App">
			<header className='App-header'>
				<p className='big-text'>Hola!, soy</p>
				<div id='lottie-animation'></div>
				<p>Desarrollador web frontend, diseñador UX/UI y cuando la ocasión lo requiere editor y motion designer.</p>
				<button>contactar</button>

				<svg id='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
					<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
				</svg>
			</header>


		</div>
	)
}

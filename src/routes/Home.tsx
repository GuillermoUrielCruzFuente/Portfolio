import { useEffect } from 'react'
import Lottie, { AnimationItem } from 'lottie-web'

//data imports
import logoAnimation from '../static/lottie/logo.json'
import earthVideo from '../static/video/earth.mp4'

//styles imports
import '../scss/Home.scss'

export default function Home() {

	useEffect(() => {
		let homeShapeRef = document.getElementById('home-shape') as HTMLElement
		let homeVideo = document.getElementById('home-video') as HTMLVideoElement

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
			homeShapeRef.style.animation = 'home-shape-in 1s ease 300ms forwards'
			
			homeShapeRef.addEventListener('animationend', (animation: AnimationEvent) => {
				if (animation.animationName === 'home-shape-in') {
					homeVideo.style.opacity = '1'
					homeVideo.play()
					logoAnim.play()
				}
			})
		}, 100);

		return () => {
			logoAnim.destroy()
			homeVideo.remove()
		}
	}, [])

	return (
		<header id='home-container'>
			<p className='big-text'>Hola!, soy</p>
			<div id='lottie-animation'></div>
			<p>Desarrollador web frontend, diseñador UX/UI y cuando la ocasión lo requiere editor y motion designer.</p>
			<button>contactar</button>

			<svg id='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
				<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
			</svg>

			<div className="full-container">
				<video id='home-video' src={earthVideo} muted autoPlay playsInline loop></video>
			</div>
		</header>
	)
}

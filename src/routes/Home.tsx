import { useEffect } from 'react'
import Lottie from 'lottie-web'

//styles imports
import '../scss/Home.scss'

//data imports
import logoAnimation from '../static/lottie/logo.json'
import earthVideo from '../static/video/earth.mp4'

//components
import AnimatedButton from '../components/AnimatedButton/AnimatedButton'

export default function Home() {

	useEffect(() => {
		let homeShape = document.getElementById('home-shape') as HTMLElement
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

		document.getElementsByTagName('html')[0].style.overflowY = 'auto'

		setTimeout(() => {
			homeShape.style.animation = 'home-shape-in 1s ease 300ms forwards'

			homeShape.addEventListener('animationend', (animation: AnimationEvent) => {
				if (animation.animationName === 'home-shape-in') {
					homeVideo.style.opacity = '1'
					homeVideo.play()
					logoAnim.play()
				}
			})

			logoAnim.addEventListener('complete', () => {
				document.querySelectorAll('.home-appear').forEach((element: Element) => {
					element.setAttribute('style', 'opacity: 1')
				})
			})
		}, 100);

		return () => {
			logoAnim.destroy()
			homeVideo.remove()
		}
	}, [])

	return (
		<header id='home-container'>
			<p className='big-text home-appear' >Hola!, soy</p>

			<div id='lottie-animation'></div>

			<p className='home-appear'>Frontend web developer, con más de 4 años de experiencia. La programación no es mi única habilidad, visita la sección sobre mí y entérate a más detalle.</p>

			<AnimatedButton
				buttonId='home'
				buttonClassName='home-appear'
				text='contáctame'
				animateOnLoad={false}
				to='/contact'
				isLink={true}
			/>

			<svg id='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
				<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
			</svg>

			<div className="full-container">
				<video id='home-video' src={earthVideo} muted autoPlay playsInline loop></video>
			</div>
		</header>
	)
}

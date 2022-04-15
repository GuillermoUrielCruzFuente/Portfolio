import { useEffect } from 'react'
import Lottie from 'lottie-web'

//styles imports
import '../scss/Home.scss'

//data imports
import logoAnimation from '../static/lottie/logo.json'
import homeVideo from '../static/video/blue.mp4'

//components
import AnimatedButton from '../components/AnimatedButton/AnimatedButton'
import SocialMedia from '../components/SocialMedia/SocialMedia'
import Button from '../components/Button/Button'

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
			name: 'homeLogo'
		})

		setTimeout(() => {
			homeShape.style.animation = 'home-shape-in 1s ease forwards'

			homeShape.addEventListener('animationend', (animation: AnimationEvent) => {
				if (animation.animationName === 'home-shape-in') {
					homeVideo.style.opacity = '0.5'
					homeVideo.style.transform = 'scale(1)'

					logoAnim.play()

					homeShape.classList.add('shape-shadow')
				}
			})

			logoAnim.addEventListener('complete', () => {
				const elementsToAppear = document.getElementsByClassName('home-appear')
				for (let i = 0; i < elementsToAppear.length; i++) {
					const element = elementsToAppear[i] as HTMLElement
					element.style.opacity = '1'
				}
			})
		}, 500);

		return () => {
			logoAnim.destroy()
			homeVideo.remove()
		}
	}, [])

	const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

	const z = () => {
		console.log('callback')
	}

	return (
		<header id='home-container'>
			<p className='big-text home-appear' >Hola!, soy</p>

			<div id='lottie-animation'></div>

			<p className='home-appear'>Frontend web developer, con más de 4 años de experiencia. La programación no es mi única habilidad, visita la sección sobre mí y entérate a más detalle.</p>

			{/* <AnimatedButton
				buttonId='home'
				buttonClassName='home-appear'
				text='contáctame'
				animateOnLoad={false}
				to='/contact'
				isLink={true}
			/> */}

			<Button callback={z} marginTop='1rem' className='home-appear' NavigateTo='/contact' id='home'>Contáctame</Button>

			<svg id='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
				<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
			</svg>

			<div className="full-container">
				<video id='home-video' src={homeVideo} muted autoPlay playsInline loop></video>
			</div>

			<SocialMedia />
		</header>
	)
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lottie from 'lottie-web'
import { CSSTransition } from 'react-transition-group'

//styles imports
import '../scss/Home.scss'

//data imports
import logoAnimation from '../static/lottie/logo.json'
import homeVideo from '../static/video/blue.mp4'

//components
import SocialMedia from '../components/SocialMedia/SocialMedia'
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router-dom'

function Home() {
	const [homeState, setHomeState] = useState(false)
	let [videoState, setVideoState] = useState(false)

	let homeShapeRef = useRef(null)
	let homeVideoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		let logoAnim = Lottie.loadAnimation({
			container: document.getElementById('lottie-animation') as HTMLElement,
			animationData: logoAnimation,
			autoplay: false,
			loop: false,
			renderer: 'svg',
			name: 'homeLogo'
		})

		console.log('a')

		setTimeout(() => {
			logoAnim.play()

			setTimeout(() => {
				appearElements()
				console.log('putamadre')
			}, 1500);
			// logoAnim.addEventListener('', () => {
			// })

			setHomeState(true)
		}, 500);
	}, [])

	const toggleState = () => {
		setVideoState(false)
		setTimeout(() => {
			setHomeState(!homeState)
			homeState ? hideElements() : appearElements()
		}, 200);
	}

	const appearElements = () => {
		const elementsToAppear = document.getElementsByClassName('home-appear')

		for (let i = 0; i < elementsToAppear.length; i++) {
			const element = elementsToAppear[i] as HTMLElement
			element.style.opacity = '1'
			element.style.transform = 'scale(1)'
		}
	}

	const hideElements = () => {
		const elementsToAppear = document.getElementsByClassName('home-appear')

		for (let i = 0; i < elementsToAppear.length; i++) {
			const element = elementsToAppear[i] as HTMLElement
			element.style.transition = '300ms'
			element.style.opacity = '0'
			element.style.transform = 'scale(1.1)'
		}

		console.log('0')
	}

	const showVideo = () => {
		homeVideoRef.current ? homeVideoRef.current.style.opacity = '0.25' : console.warn('reference to home video corrupted')
	}

	const hideVideo = () => {
		homeVideoRef.current ? homeVideoRef.current.style.opacity = '0' : console.warn('reference to home video corrupted')
	}

	let navigate = useNavigate()

	const goToContact = () => {
		setTimeout(() => {
			navigate('/contact')
		}, 500);
	}

	return (
		<header id='home-container'>
			<p className='big-text home-appear' >Hola!, soy</p>

			<div id='lottie-animation' className='home-appear'></div>

			<p className='home-appear'>Frontend web developer, con más de 4 años de experiencia. La programación no es mi única habilidad, visita la sección sobre mí y entérate a más detalle.</p>

			<Button callback={toggleState} marginTop='1rem' className='home-appear' id='home'>Contáctame</Button>

			<CSSTransition in={homeState} classNames='home-shape-anim' timeout={{ enter: 1000, exit: 500 }} mountOnEnter nodeRef={homeShapeRef} onEntered={() => setVideoState(true)} onExited={goToContact}>
				<svg ref={homeShapeRef} className='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
					<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
				</svg>
			</CSSTransition>

			<div className="full-container">
				<CSSTransition in={videoState} classNames='video-anim' timeout={{ enter: 1000, exit: 400 }} mountOnEnter nodeRef={homeVideoRef}>
					<video ref={homeVideoRef} src={homeVideo} muted autoPlay playsInline loop />
				</CSSTransition>
			</div>

			<SocialMedia />
		</header>
	)
}

export default Home
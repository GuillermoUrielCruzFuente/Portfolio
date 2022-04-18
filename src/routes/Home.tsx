import { useEffect, useRef, useState } from 'react'
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

function Home() {
	const [homeState, setHomeState] = useState(false)
	const [homeShapeState, setHomeShapeState] = useState(false)

	let h1Ref = useRef(null)
	let homeShapeRef = useRef(null)

	useEffect(() => {
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
			logoAnim.setSpeed(3)
			homeVideo.style.opacity = '0.5'
			homeVideo.style.transform = 'scale(1)'
			logoAnim.play()

			logoAnim.addEventListener('complete', () => {
				const elementsToAppear = document.getElementsByClassName('home-appear')
				for (let i = 0; i < elementsToAppear.length; i++) {
					const element = elementsToAppear[i] as HTMLElement
					element.style.opacity = '1'
				}
			})

			setHomeState(true)
			setHomeShapeState(true)
		}, 500);

		return () => {
			logoAnim.destroy()
			homeVideo.remove()
			console.log('destroy')
		}
	}, [])

	const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

	const z = () => {
		setHomeState(!homeState)
		setHomeShapeState(!homeShapeState)
	}

	return (
		<header id='home-container'>
			<p className='big-text home-appear' >Hola!, soy</p>

			<div id='lottie-animation'></div>

			<p className='home-appear'>Frontend web developer, con más de 4 años de experiencia. La programación no es mi única habilidad, visita la sección sobre mí y entérate a más detalle.</p>

			<Button callback={z} marginTop='1rem' className='home-appear' id='home'>Contáctame</Button>

			<CSSTransition in={homeState} classNames='h1' timeout={{ enter: 300, exit: 500 }} mountOnEnter nodeRef={h1Ref}>
				<h1 ref={h1Ref}>Hola</h1>
			</CSSTransition>

			<CSSTransition in={homeShapeState} classNames='home-shape-anim' timeout={{ enter: 1000, exit: 500 }} mountOnEnter nodeRef={homeShapeRef}>
				<svg ref={homeShapeRef} className='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
					<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
				</svg>
			</CSSTransition>

			<div className="full-container">
				<video id='home-video' src={homeVideo} muted autoPlay playsInline loop />
			</div>

			<SocialMedia />
		</header>
	)
}
export default Home
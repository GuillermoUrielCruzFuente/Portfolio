import { useLayoutEffect, useRef, useState } from 'react'
import Lottie, { AnimationConfigWithData } from 'lottie-web'
import { CSSTransition } from 'react-transition-group'

//styles imports
import '../scss/Home.scss'

//data imports
import logoAnimationData from '../static/lottie/logo.json'
import homeVideo from '../static/video/blue.mp4'

//components
import SocialMedia from '../components/SocialMedia/SocialMedia'
import Button from '../components/Button/Button'
import Nav from '../components/Nav/Nav'

function Home() {
	const [homeState, setHomeState] = useState(false)
	const [videoState, setVideoState] = useState(false)
	const [socialState, setSocialState] = useState(false)

	const logoAnimationContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimation = useRef(Lottie.loadAnimation({ container: logoAnimationContainerRef.current as HTMLDivElement }))

	let homeShapeRef = useRef(null)
	let homeVideoRef = useRef(null)
	let fullContainerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {

		Lottie.setQuality(1)

		const logoAnimationConfig: AnimationConfigWithData<'svg'> = {
			container: logoAnimationContainerRef.current as HTMLDivElement,
			animationData: logoAnimationData,
			loop: false,
			autoplay: false
		}

		logoAnimation.current = Lottie.loadAnimation(logoAnimationConfig)
		logoAnimation.current.goToAndStop(0, true)
	}, [])

	useLayoutEffect(() => {
		setTimeout(() => {
			fullContainerRef.current ? fullContainerRef.current.style.backgroundColor = '#31053b' : console.warn(fullContainerRef.current, 'is null')
			logoAnimation.current.play()
			setHomeState(true)
			setSocialState(true)
			setTimeout(() => {
				appearElements()
			}, 1500);
		}, 500);
	}, [])

	const hideHome = () => {
		logoAnimation.current.setDirection(-1)
		logoAnimation.current.setSpeed(2)
		logoAnimation.current.playSegments([170, 0], true)

		fullContainerRef.current ? fullContainerRef.current.style.backgroundColor = '#1b0221' : console.warn(fullContainerRef.current, 'is null')

		setVideoState(false)
		setSocialState(false)
		setTimeout(() => {
			setHomeState(false)
			hideElements()
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
		logoAnimationContainerRef.current ? logoAnimationContainerRef.current.style.opacity = '0' : console.warn(logoAnimationContainerRef, 'is null')
		const elementsToAppear = document.getElementsByClassName('home-appear')

		for (let i = 0; i < elementsToAppear.length; i++) {
			const element = elementsToAppear[i] as HTMLElement
			element.style.transition = '300ms'
			element.style.opacity = '0'
			element.style.transform = 'scale(1.1)'
		}
	}

	return (
		<>
			<Nav transitionTime={1000} callback={hideHome} isHome={true} />

			<header id='home-container'>
				<p className='big-text home-appear' >Hola!, soy</p>

				<div ref={logoAnimationContainerRef} id='lottie-animation'></div>

				<p className='home-appear'>Frontend web developer, con más de 4 años de experiencia. La programación no es mi única habilidad, visita la sección sobre mí y entérate a más detalle.</p>

				<Button transitionTime={1000} callback={hideHome} className='home-appear home-button' NavigateTo='/contact'>Contáctame</Button>

				<CSSTransition in={homeState} classNames='home-shape-anim' timeout={{ enter: 1000, exit: 500 }} mountOnEnter nodeRef={homeShapeRef} onEntered={() => setVideoState(true)}>
					<svg ref={homeShapeRef} className='home-shape' viewBox="0 0 1389.987 1080" preserveAspectRatio='none' fill='#1b0221'>
						<path d="M1990,1140H3379.987L2950,2220H1990Z" transform="translate(-1990 -1140)" />
					</svg>
				</CSSTransition>

				<div className="full-container" ref={fullContainerRef}>
					<CSSTransition in={videoState} classNames='video-anim' timeout={{ enter: 1000, exit: 400 }} mountOnEnter nodeRef={homeVideoRef}>
						<video ref={homeVideoRef} src={homeVideo} muted autoPlay playsInline loop />
					</CSSTransition>
				</div>

				<SocialMedia state={socialState} />
			</header>
		</>
	)
}

export default Home
import { useLayoutEffect, useRef, useState } from 'react'
import Lottie, { AnimationConfigWithData } from 'lottie-web'

//styles imports
import '../scss/pages/Home/Home.scss'

//data imports
import logoAnimationData from '../static/lottie/logo.json'

//components
import SocialMedia from '../components/SocialMedia/SocialMedia'
import Button from '../components/Button/Button'
import Nav from '../components/Nav/Nav'

function Home() {
	const [socialState, setSocialState] = useState(true)
	const logoAnimationContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimation = useRef(Lottie.loadAnimation({ container: logoAnimationContainerRef.current as HTMLDivElement }))

	useLayoutEffect(() => {
		setSocialState(false)

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
			logoAnimation.current.play()

			setTimeout(() => {
				appearElements()
				setSocialState(true)
			}, 3000);
		}, 500);
	}, [])

	const hideHome = () => {
		logoAnimation.current.setDirection(-1)
		logoAnimation.current.setSpeed(2)
		logoAnimation.current.playSegments([140, 0], true)
		setSocialState(false)
		setTimeout(() => {
			hideElements()
		}, 300);
	}

	const appearElements = () => {
		const elementsToAppear = document.getElementsByClassName('home-appear')

		for (let i = 0; i < elementsToAppear.length; i++) {
			const element = elementsToAppear[i] as HTMLElement
			element.style.opacity = '1'
		}
	}

	const hideElements = () => {
		logoAnimationContainerRef.current ? logoAnimationContainerRef.current.style.opacity = '0' : console.error('there is no container for lottie logo animation')
		const elementsToAppear = document.getElementsByClassName('home-appear')

		for (let i = 0; i < elementsToAppear.length; i++) {
			const element = elementsToAppear[i] as HTMLElement
			element.style.transition = '500ms'
			element.style.opacity = '0'
		}
	}

	return (
		<>
			<Nav transitionTime={1000} callback={hideHome} isHome={true} />

			<header id='home-container'>
				<p className='big-text home-appear' >Hola!, soy</p>

				<div ref={logoAnimationContainerRef} id='lottie-animation'></div>

				<p className='home-appear'>
					Desarrollador Fronted de tiempo completo, con más de 4 años de experiencia. Mexicano, con intervención en distintos proyectos profesionales, una gran creatividad y atención a los detalles.
				</p>

				<Button transitionTime={1000} callback={hideHome} className='home-appear home-button' NavigateTo='/contact'>contáctame</Button>

				<SocialMedia state={socialState} />
			</header>
		</>
	)
}

export default Home
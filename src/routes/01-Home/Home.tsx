import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Lottie, { AnimationItem } from 'lottie-web'

//outlet custom hook
import { useNavSignal, ContextType } from '../../components/Nav/Nav'

//styles imports
import './Home.scss'

//data imports
import logoAnimationData from '../../static/lottie/logo.json'
import projectsIcon from '../../static/img/icons/home-buttons/portfolio.svg'
import contactIcon from '../../static/img/icons/home-buttons/plane.svg'

//components
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import Button from '../../components/Button/Button'

const Home = () => {
	const { nav, reactiveFunc }: ContextType = useNavSignal()
	const location = useLocation()
	const refContainer = useRef<HTMLHeadElement>(null)
	const [sectionState, setSectionState] = useState(false)

	const [socialState, setSocialState] = useState(false)
	const logoAnimationHomeContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimation = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: logoAnimationHomeContainerRef.current!,
		})
	)

	useEffect(() => {
		showContent()

		Lottie.setQuality('low')

		return () => {
			logoAnimation.current.destroy()
		}
	}, [])

	useEffect(() => {
		if (nav) {
			if (nav.to != location.pathname) {
				hideContent()
			}
		}
	}, [nav])

	const showElements = () => {
		const elements = document.getElementsByClassName('appear') as HTMLCollectionOf<HTMLElement>

		for (const element of elements) {
			element.style.opacity = '1'
		}
	}

	const playLogoAnimation = () => {
		logoAnimation.current = Lottie.loadAnimation({
			container: logoAnimationHomeContainerRef.current!,
			animationData: logoAnimationData,
			renderer: 'svg',
			autoplay: false,
			loop: false,
		})

		logoAnimation.current.playSegments([0, 180], true)

		logoAnimation.current.addEventListener('complete', () => {
			setSocialState(true)
			showElements()
		})
	}

	const showContent = () => {
		setSectionState(true)
	}

	const hideContent = () => {
		setSectionState(false)
	}

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={350}
			classNames="page"
			mountOnEnter
			unmountOnExit
			onEnter={playLogoAnimation}
			onExited={() => reactiveFunc(true)}
		>
			<header id="home-main-container" ref={refContainer}>
				<div className="home-content">
					<p className="big-text appear">Hola!👋🏾soy</p>

					<div ref={logoAnimationHomeContainerRef} id="lottie-animation"></div>

					<p className="description appear">
						Desarrollador Frontend de tiempo completo, con más de 4 años de experiencia.
						Mexicano, con intervención en distintos proyectos profesionales, una gran
						creatividad y atención a los detalles.
					</p>

					<div className="buttons-container">
						<Button img={contactIcon} className="appear" secondary>
							contáctame
						</Button>

						<Button img={projectsIcon} className="appear">
							proyectos
						</Button>
					</div>
				</div>

				<div className="bottom-info">
					<div className="available appear">
						<span id="circle"></span>
						<p className="able-to-work">Disponible</p>
					</div>

					<SocialMedia state={socialState} containerClass={'social-media-container'} />
				</div>
			</header>
		</CSSTransition>
	)
}

export default Home

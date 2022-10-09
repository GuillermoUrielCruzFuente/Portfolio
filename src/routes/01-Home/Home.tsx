import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Lottie, { AnimationItem } from 'lottie-web'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

//styles imports
import './Home.scss'

import collage from '../../static/img/web-images/collage.png'

//data imports
import logoAnimationData from '../../static/lottie/logo.json'
import projectsIcon from '../../static/img/icons/home-buttons/portfolio.svg'
import contactIcon from '../../static/img/icons/home-buttons/plane.svg'

//components
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import Button from '../../components/Button/Button'

const Home = () => {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
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
		const elements = document.getElementsByClassName(
			'appear'
		) as HTMLCollectionOf<HTMLElement>

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
			onExited={() => setReadyToNavigate(true)}
		>
			<header id="home-main-container" ref={refContainer}>
				<div className="home-content">
					<p className="big-text appear">Hola!👋🏾soy</p>
					<div
						ref={logoAnimationHomeContainerRef}
						id="lottie-animation"
					></div>
					<p className="description appear">
						<span className="accent">Desarrollador Frontend</span>{' '}
						de tiempo completo, con más de 4 años de experiencia.
						Mexicano, con intervención en distintos proyectos
						profesionales, una gran creatividad y atención a los
						detalles.
					</p>
					<div className="buttons-container">
						<Button
							img={contactIcon}
							className="appear"
							secondary
							navigator={{
								to: '/contacto',
								navigator: navigateTo,
							}}
						>
							contacto
						</Button>

						<Button
							img={projectsIcon}
							className="appear"
							navigator={{
								to: '/proyectos',
								navigator: navigateTo,
							}}
						>
							proyectos
						</Button>
					</div>

					<SocialMedia
						state={socialState}
						containerClass={'social-media-container'}
					/>

					<div className="available appear">
						<span id="circle"></span>
						<p className="able-to-work">Disponible</p>
					</div>

					<div className="collage-container appear">
						<img
							src={collage}
							alt="projects images"
							className="collage"
						/>
					</div>
				</div>
			</header>
		</CSSTransition>
	)
}

export default Home

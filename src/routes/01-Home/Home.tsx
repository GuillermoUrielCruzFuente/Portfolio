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
import IntersectionContainer from '../../components/IntersectionContainer/IntersectionContainer'

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

	const collageRef = useRef<HTMLImageElement>(null)
	
	let collageDownloadState = false

	const showCollage = () => {
		collageRef.current!.classList.replace('collage-init', 'collage-final')
	}

	const collageImageReady = () => (collageDownloadState = true)

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

			if (collageDownloadState) {
				showCollage()
			} else {
				collageRef.current?.addEventListener('load', () =>
					showCollage()
				)
			}
		})
	}

	const showContent = () => setSectionState(true)

	const hideContent = () => setSectionState(false)

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={500}
			classNames="page-anim"
			mountOnEnter
			unmountOnExit
			onEnter={playLogoAnimation}
			onExited={() => setReadyToNavigate(true)}
		>
			<header id="home-main-container" ref={refContainer}>
				<div className="home-content">
					<p className="big-text appear">Hola! 👋🏾 soy</p>
					<div
						ref={logoAnimationHomeContainerRef}
						id="lottie-animation"
					/>

					<p className="description appear">
						<span className="accent">Desarrollador Frontend</span>{' '}
						de tiempo completo, con más de 3 años de experiencia.
						Mexicano, con intervención en distintos proyectos
						profesionales, una gran creatividad y atención a los
						detalles.
					</p>

					<div className="buttons-container appear">
						<Button
							img={contactIcon}
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
						containerClass="social-media-container"
					/>
					<div className="available appear">
						<span id="circle"></span>
						<p className="able-to-work">Disponible</p>
					</div>
					<div className="collage-container">
						<img
							src={collage}
							alt="projects images"
							className="collage collage-init"
							ref={collageRef}
							onLoad={collageImageReady}
						/>
					</div>
				</div>
			</header>
		</CSSTransition>
	)
}

export default Home

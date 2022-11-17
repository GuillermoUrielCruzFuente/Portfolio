import { useEffect, useRef, useState } from 'react'
import {
	NavLink,
	Link,
	useLocation,
	useNavigate,
	Outlet,
} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//routes
import getRoutesWithRef, { RouteWithRef } from '../../routes/routes'

//styles
import './Nav.scss'

//third party libraries
import Lottie, { AnimationItem } from 'lottie-web'

//data
import logoAnimationData from '../../static/lottie/logo.json'
import hamburgerAnimationData from '../../static/lottie/hamburger-menu.json'

//hooks
import useNavigateTo from '../../hooks/useNavigateTo'
import { ContextType, Navigation } from '../../hooks/useNavContext'

const Nav = () => {
	// #region basic logic for page navigation
	const location = useLocation()
	const navigate = useNavigate()
	const [clickedLink, setClickedLink] = useState<Navigation | null>(null)
	const [readyToNavigate, setReadyToNavigate] = useState<boolean>(false)
	// let responsiveMenuCounter = 0

	const showNavLogo = () => {
		logoAnimationContainerRef.current!.style.opacity = '1'

		logoAnimationRef.current.setDirection(1)
		logoAnimationRef.current.setSpeed(1)
		logoAnimationRef.current.play()

		document.getElementById('nav-logo-link')!.style.pointerEvents = 'auto'
	}

	const hideNavLogo = () => {
		logoAnimationContainerRef.current!.style.opacity = '0'

		logoAnimationContainerRef.current!.addEventListener(
			'transitionend',
			() => {
				if (logoAnimationContainerRef.current?.style.opacity === '0') {
					logoAnimationRef.current.goToAndStop(0, true)
				}
			}
		)

		document.getElementById('nav-logo-link')!.style.pointerEvents = 'none'
	}

	const disableLinks = () => {
		const links = document.getElementsByClassName(
			'nav-link'
		) as HTMLCollectionOf<HTMLAnchorElement>

		for (const link of links) {
			link.style.pointerEvents = 'none'
		}
	}

	const navigator = useNavigateTo({
		setClickedLink: setClickedLink,
		animationHandler: {
			show: showNavLogo,
			hide: hideNavLogo,
		},
		disableLinks: disableLinks,
		noReadyToNavigate: setReadyToNavigate,
	})

	const signal: ContextType = {
		nav: clickedLink,
		setReadyToNavigate: setReadyToNavigate,
		navigateTo: navigator,
	}

	const enableLinks = () => {
		const links = document.getElementsByClassName(
			'nav-link'
		) as HTMLCollectionOf<HTMLAnchorElement>

		for (const link of links) {
			link.style.pointerEvents = 'all'
		}
	}
	// #endregion

	// #region responsive menu logic
	const [responsiveMenuState, setResponsiveMenuState] = useState(false)
	const [mobItems, setMobItems] = useState(false)
	// #endregion

	// #region lottie logo in navbar
	const logoAnimationContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimationRef = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: logoAnimationContainerRef.current!,
		})
	)
	// #endregion

	const buttonAnimationContainerRef = useRef<HTMLDivElement>(null)
	const buttonLottieAnimationRef = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: buttonAnimationContainerRef.current!,
		})
	)

	// #region reference for CSSTransition NodeRef Attribute in responsive menu
	const menuMobileRef = useRef<HTMLDivElement>(null)
	let routesWithRef = getRoutesWithRef()
	//#endregion

	const changeStyleOnScroll = () => {
		const nav = document.getElementsByTagName('nav')[0]
		if (window.scrollY >= 100) {
			nav.classList.replace('no-blur-bg', 'blur-bg')
		} else {
			nav.classList.replace('blur-bg', 'no-blur-bg')
		}
	}

	useEffect(() => {
		logoAnimationRef.current = Lottie.loadAnimation({
			container: logoAnimationContainerRef.current!,
			animationData: logoAnimationData,
			autoplay: false,
			loop: false,
		})

		buttonLottieAnimationRef.current = Lottie.loadAnimation({
			container: buttonAnimationContainerRef.current!,
			animationData: hamburgerAnimationData,
			loop: false,
			autoplay: false,
		})

		buttonLottieAnimationRef.current.setSpeed(1.35)

		if (location.pathname != '/') {
			showNavLogo()
		} else {
			document.getElementById('nav-logo-link')!.style.pointerEvents =
				'none'
		}

		// window.addEventListener('resize', hideMenuOnResize)
		// window.addEventListener('keydown', hideMenuOnEsc)
		window.addEventListener('scroll', changeStyleOnScroll)

		return () => {
			logoAnimationRef.current.destroy()
			buttonLottieAnimationRef.current.destroy()

			window.removeEventListener('resize', hideMenuOnResize)
			window.removeEventListener('keydown', hideMenuOnEsc)
			window.removeEventListener('scroll', changeStyleOnScroll)
		}
	}, [])

	// in order to navigate on CSSTransition unmounted
	// listen for a flag that can be fired with a function
	// provided to the OutletContext
	useEffect(() => {
		if (readyToNavigate) {
			if (clickedLink) {
				navigate(clickedLink.to!)
				enableLinks()
				window.scrollTo(0, 0)
			}
		}
	}, [readyToNavigate])

	const showBackArrow = () =>
		buttonLottieAnimationRef.current.playSegments([20, 70], true)

	const showHamburger = () =>
		buttonLottieAnimationRef.current.playSegments([120, 140], true)

	const disableVerticalScroll = () => {
		const html = document.getElementsByTagName('html')[0]
		html.style.overflow = 'hidden hidden'
	}

	const enableVerticalScroll = () => {
		const html = document.getElementsByTagName('html')[0]
		html.style.overflow = 'hidden auto'
	}

	//we need to handle the state reading by encapsulating it inside a ref
	// https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
	const menuStateRef = useRef(false)

	const hideMenuOnResize = () => {
		//if the menu is active and the window width is less than 700px
		//then the menu need to be invisible
		if (window.innerWidth > 700 && menuStateRef.current) {
			console.log('hideMenuOnResize true')
			hideMenu()

			window.removeEventListener('resize', hideMenuOnResize)
			window.removeEventListener('keydown', hideMenuOnEsc)
		}
	}

	const hideMenuOnEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && menuStateRef.current) {
			console.log('hide menu on Esc true')
			hideMenu()

			window.removeEventListener('resize', hideMenuOnResize)
			window.removeEventListener('keydown', hideMenuOnEsc)
		}
	}

	const toggleMenu = () => {
		menuStateRef.current ? hideMenu() : showMenu()
	}

	const hideMenu = () => {
		setResponsiveMenuState(false)
		enableVerticalScroll()
		showHamburger()

		menuStateRef.current = false

		window.removeEventListener('resize', hideMenuOnResize)
		window.removeEventListener('keydown', hideMenuOnEsc)
	}

	const showMenu = () => {
		setResponsiveMenuState(true)
		disableVerticalScroll()
		showBackArrow()

		menuStateRef.current = true

		window.addEventListener('resize', hideMenuOnResize)
		window.addEventListener('keydown', hideMenuOnEsc)
	}

	return (
		<>
			<nav className="no-blur-bg">
				<div id="nav-container">
					<div id="nav-logo-container">
						<Link
							to="/"
							id="nav-logo-link"
							onClick={(event) => {
								event.preventDefault()
								navigator(routesWithRef[0].path)
							}}
						>
							<div
								id="nav-logo"
								ref={logoAnimationContainerRef}
							/>
						</Link>
					</div>

					<div id="navigator">
						<div className="links-container-desk">
							{routesWithRef.map((route) => {
								return (
									<NavLink
										onClick={(event) => {
											event.preventDefault()
											navigator(route.path)
										}}
										to={route.path}
										key={route.text}
										className="nav-link-item-desk | nav-link"
									>
										{route.text}
									</NavLink>
								)
							})}
						</div>

						<CSSTransition
							in={responsiveMenuState}
							classNames="appear"
							timeout={{ enter: 500, exit: 500 }}
							mountOnEnter
							unmountOnExit
							nodeRef={menuMobileRef}
							addEndListener={() => setMobItems(!mobItems)}
						>
							<div
								className="links-container-mobile"
								ref={menuMobileRef}
							>
								{routesWithRef.map(
									(route: RouteWithRef, i: number) => (
										<CSSTransition
											in={mobItems}
											classNames="link-item-app"
											timeout={{
												enter: 500 + i * 100,
												exit: 500 + i * 80,
											}}
											nodeRef={route.ref}
											mountOnEnter
											unmountOnExit
											key={route.text}
										>
											<NavLink
												onClick={(event) => {
													event.preventDefault()
													toggleMenu()
													navigator(route.path)
												}}
												to={route.path}
												className="nav-link-item-mob | nav-link"
												ref={route.ref}
												style={{
													transitionDelay: mobItems
														? `${i * 100}ms`
														: `${i * 80}ms`,
												}}
											>
												{route.text}
											</NavLink>
										</CSSTransition>
									)
								)}
							</div>
						</CSSTransition>

						<div className="button-container">
							<div
								ref={buttonAnimationContainerRef}
								id="menu-button"
								onClick={toggleMenu}
							></div>
						</div>
					</div>
				</div>
			</nav>

			<Outlet context={signal} />

			<svg className="svg-noise" width="100%" height="100%">
				<filter id="filter">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.65"
						stitchTiles="stitch"
						numOctaves="1"
					></feTurbulence>
				</filter>
				<rect width="100%" height="100%" filter="url(#filter)"></rect>
			</svg>
		</>
	)
}

export default Nav

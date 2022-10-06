import { useEffect, useRef, useState } from 'react'
import {
	NavLink,
	Link,
	useLocation,
	useNavigate,
	Outlet,
} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import ShapesBackground from '../ShapesBackground/ShapesBackground'

//routes
import getRoutesWithRef, { RouteWithRef } from '../../routes/routes'

//styles
import './Nav.scss'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimationData from '../../static/lottie/logo.json'

//hooks
import useNavigateTo from '../../hooks/useNavigateTo'
import { ContextType, Navigation } from '../../hooks/useNavContext'

const Nav = () => {
	// #region basic logic for page navigation
	const location = useLocation()
	const navigate = useNavigate()
	const [clickedLink, setClickedLink] = useState<Navigation | null>(null)
	const [readyToNavigate, setReadyToNavigate] = useState<boolean>(false)

	const showNavLogo = () => {
		logoAnimationRef.current.setDirection(1)
		logoAnimationRef.current.setSpeed(1)
		logoAnimationRef.current.play()

		document.getElementById('nav-logo-link')!.style.pointerEvents = 'auto'
	}

	const hideNavLogo = () => {
		logoAnimationRef.current.setDirection(-1)
		logoAnimationRef.current.setSpeed(2)
		logoAnimationRef.current.playSegments([180, 0], true)

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
	const [menuDeviceState, setMenuDeviceState] = useState(false)
	const [mobItems, setMobItems] = useState(false)
	// #endregion

	// #region lottie logo in navbar
	const logoAnimationContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimationRef = useRef(
		Lottie.loadAnimation({
			container: logoAnimationContainerRef.current!,
		})
	)
	// #endregion

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

	const hideMenuOnResize = () => {
		//if the menu is active and the window width is less than 700px
		//then the menu need to be invisible
		if (window.innerWidth > 700 && !menuDeviceState) {
			setMenuDeviceState(false)
		}
	}

	const hideMenuOnEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setMenuDeviceState(false)
		}
	}

	useEffect(() => {
		logoAnimationRef.current = Lottie.loadAnimation({
			container: logoAnimationContainerRef.current!,
			animationData: logoAnimationData,
			autoplay: false,
			loop: false,
		})

		if (location.pathname != '/') {
			// logoAnimationRef.current.playSegments([0, 180], true)
			showNavLogo()
		} else {
			document.getElementById('nav-logo-link')!.style.pointerEvents =
				'none'
		}

		window.addEventListener('scroll', changeStyleOnScroll)

		return () => {
			logoAnimationRef.current.destroy()
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

	const toggleMenu = () => {
		setMenuDeviceState(!menuDeviceState)

		const a = document.getElementsByTagName('html')[0]
		a.style.overflow = !menuDeviceState ? 'hidden hidden' : 'hidden auto'

		if (!menuDeviceState) {
			window.addEventListener('resize', hideMenuOnResize)
			window.addEventListener('keydown', hideMenuOnEsc)
		}
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

						{
							<CSSTransition
								in={menuDeviceState}
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
										(route: RouteWithRef, i: number) => {
											return (
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
															navigator(
																route.path
															)
														}}
														to={route.path}
														className="nav-link-item-mob | nav-link"
														ref={route.ref}
														style={{
															transitionDelay:
																mobItems
																	? `${
																			i *
																			100
																	  }ms`
																	: `${
																			i *
																			80
																	  }ms`,
														}}
													>
														{route.text}
													</NavLink>
												</CSSTransition>
											)
										}
									)}
								</div>
							</CSSTransition>
						}

						<div id="menu-button" onClick={toggleMenu}></div>
					</div>
				</div>
			</nav>

			<div>
				<ShapesBackground />
				<Outlet context={signal} />
			</div>
		</>
	)
}

export default Nav

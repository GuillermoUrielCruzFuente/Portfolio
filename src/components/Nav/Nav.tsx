import { MutableRefObject, useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import { NavLink, Link, useLocation, useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import routes from '../../routes/routes'

//styles
import './Nav.scss'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimationData from '../../static/lottie/logo.json'

type RoutesWithRefs = {
	text: string
	path: string
	ref: MutableRefObject<HTMLAnchorElement | null>
}

type Navigation = {
	to: string | null
	from: string | null
}

export type ContextType = {
	nav: Navigation | null
	setReadyToNavigate: Dispatch<SetStateAction<boolean>>
	navigateTo: (to: string) => void
}
/**
 * custom hook to provide structure to the outlet context by react router
 * @returns context
 */
export const useNavSignal = () => useOutletContext<ContextType>()

// type PropagationProps = {
// 	to: string
// 	setClickedLink: Dispatch<SetStateAction<Navigation | null>>
// 	animationHandler: {
// 		show: () => {}
// 		hide: () => {}
// 	}
// 	linksHandler: () => {}
// 	noReadyToNavigate: Dispatch<SetStateAction<boolean>>
// }

/**
 * provide a function to programatically navigate to the specified route
 */
// export const usePropagateNavigationSignal = ({
// 	to,
// 	setClickedLink,
// 	animationHandler,
// 	linksHandler,
// 	noReadyToNavigate,
// }: PropagationProps) => {
// 	// change the reactive value for clicked link
// 	setClickedLink({
// 		from: location.pathname,
// 		to: to,
// 	})

// 	// run navbar animation depends on destination route
// 	if (to === '/') {
// 		animationHandler.hide()
// 	} else {
// 		animationHandler.show()
// 	}

// 	// disable all links in order to avoid multiple clicks
// 	linksHandler()

// 	// change the reactive value that handles the navigation to false, in order to listen for animation finish
// 	noReadyToNavigate(false)

// 	return () => {}
// }

type NavigateTo = {
	setClickedLink: Dispatch<SetStateAction<Navigation | null>>
	animationHandler: {
		show: () => void
		hide: () => void
	}
	disableLinks: () => void
	noReadyToNavigate: Dispatch<SetStateAction<boolean>>
}

export const useNavigateTo = ({
	setClickedLink,
	animationHandler,
	disableLinks,
	noReadyToNavigate,
}: NavigateTo) => {
	return (to: string) => {
		// change the reactive value for clicked link
		setClickedLink({
			from: location.pathname,
			to: to,
		})

		// run navbar animation depends on destination route
		if (to === '/') {
			animationHandler.hide()
		} else {
			animationHandler.show()
		}

		// disable all links in order to avoid multiple clicks
		disableLinks()

		// change the reactive value that handles the navigation to false, in order to listen for animation finish
		noReadyToNavigate(false)
	}
}

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
	}

	const hideNavLogo = () => {
		logoAnimationRef.current.setDirection(-1)
		logoAnimationRef.current.setSpeed(2)
		logoAnimationRef.current.playSegments([180, 0], true)
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

	// /**
	//  * 1. change the reactive value for clicked link
	//  * 2. run navbar animation depends on destination route
	//  * 3. disable all links in order to avoid multiple clicks
	//  * 4. change the reactive value that handles the navigation to false,
	//  * 	  in order to listen for animation finish
	//  * @param to route to navigate
	//  */
	// const propagateNavigationSignal = (to: string) => {
	// 	setClickedLink({
	// 		from: location.pathname,
	// 		to: to,
	// 	})

	// 	if (to === '/') {
	// 		//here make the logo invisible
	// 		logoAnimationRef.current.setDirection(-1)
	// 		logoAnimationRef.current.setSpeed(2)
	// 		logoAnimationRef.current.playSegments([180, 0], true)
	// 	} else {
	// 		//here make the logo visible
	// 		logoAnimationRef.current.setDirection(1)
	// 		logoAnimationRef.current.setSpeed(1)
	// 		logoAnimationRef.current.play()
	// 	}

	// 	disableLinks()

	// 	setReadyToNavigate(false)
	// }

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

	let routesWithRefs: Array<RoutesWithRefs> = []
	for (const key in routes) {
		if (Object.prototype.hasOwnProperty.call(routes, key)) {
			const route = routes[key]
			const mRef = useRef<HTMLAnchorElement>(null)
			let newObj: RoutesWithRefs = { ...route, ref: mRef }

			routesWithRefs.push(newObj)
		}
	}
	//#endregion

	const changeStyleOnScroll = () => {
		const nav = document.getElementsByTagName('nav')[0]
		if (window.scrollY >= 300) {
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
			logoAnimationRef.current.playSegments([0, 180], true)
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
	// provide to the OutletContext
	useEffect(() => {
		if (readyToNavigate) {
			if (clickedLink) {
				navigate(clickedLink.to!)
				enableLinks()
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
								// propagateNavigationSignal(routes[0].path)
								navigator(routes[0].path)
							}}
						>
							<div id="nav-logo" ref={logoAnimationContainerRef} />
						</Link>
					</div>

					<div id="navigator">
						<div className="links-container-desk">
							{routes.map((route) => {
								return (
									<NavLink
										onClick={(event) => {
											event.preventDefault()
											// propagateNavigationSignal(route.path)
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
								<div className="links-container-mobile" ref={menuMobileRef}>
									{routesWithRefs.map((route: RoutesWithRefs, i: number) => {
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
														// propagateNavigationSignal(route.path)
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
									})}
								</div>
							</CSSTransition>
						}

						<div id="menu-button" onClick={toggleMenu}></div>
					</div>
				</div>
			</nav>

			<div>
				<Outlet context={signal} />
			</div>
		</>
	)
}

export default Nav

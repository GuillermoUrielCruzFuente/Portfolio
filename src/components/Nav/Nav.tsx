import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//routes
import getRoutesWithRef from '../../routes/routes'

//styles
import './Nav.scss'

//third party libraries
import Lottie, { AnimationItem } from 'lottie-web'

//data
import hamburgerAnimationData from '@lottie/hamburger-menu.json'

import SerializedEntering from '../SerializedEntering'
import NavLogo from '../NavLogo'

const Nav = () => {
	const [navLinksState, setNavLinksState] = useState(false)

	const [responsiveMenuState, setResponsiveMenuState] = useState(false)
	const [mobItems, setMobItems] = useState(false)


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
		buttonLottieAnimationRef.current = Lottie.loadAnimation({
			container: buttonAnimationContainerRef.current!,
			animationData: hamburgerAnimationData,
			loop: false,
			autoplay: false,
		})

		buttonLottieAnimationRef.current.setSpeed(1.35)
		setNavLinksState(true)

		window.addEventListener('scroll', changeStyleOnScroll)

		return () => {
			buttonLottieAnimationRef.current.destroy()

			window.removeEventListener('scroll', changeStyleOnScroll)
		}
	}, [])

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
			hideMenu()

			window.removeEventListener('resize', hideMenuOnResize)
			window.removeEventListener('keydown', hideMenuOnEsc)
		}
	}

	const hideMenuOnEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && menuStateRef.current) {
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
					<NavLogo />

					<div id="navigator">
						<SerializedEntering
							enter={navLinksState}
							classNames="link-item"
							delay={100}
							timeout={1000}
							containerClassName="links-container-desk"
						>
							{routesWithRef.map((route) => (
								<NavLink
									to={route.path}
									className="nav-link-item-desk"
									key={route.text}
								>
									{route.text}
								</NavLink>
							))}
						</SerializedEntering>

						<CSSTransition
							in={responsiveMenuState}
							classNames="appear"
							timeout={500}
							mountOnEnter
							unmountOnExit
							nodeRef={menuMobileRef}
							addEndListener={() => setMobItems(!mobItems)}
						>
							<div
								className="links-container-mobile"
								ref={menuMobileRef}
							>
								<div className="mob-items-container">
									{routesWithRef.map((route, i: number) => (
										<div
											className="link-mob-container"
											key={route.text}
										>
											<CSSTransition
												in={mobItems}
												classNames="link-item-mob"
												timeout={500 + i * 100}
												nodeRef={route.ref}
												mountOnEnter
												unmountOnExit
											>
												<NavLink
													onClick={() => {
														toggleMenu()
													}}
													to={route.path}
													className="nav-link-item-mob"
													ref={route.ref}
													style={{
														transitionDelay: `${
															i * 100
														}ms`,
													}}
												>
													{route.text}
												</NavLink>
											</CSSTransition>
										</div>
									))}
								</div>
							</div>
						</CSSTransition>

						<div className="button-container">
							<div
								ref={buttonAnimationContainerRef}
								id="menu-button"
								onClick={toggleMenu}
							/>
						</div>
					</div>
				</div>
			</nav>
			
			<Outlet />
		</>
	)
}

export default Nav

import createLogoAnimationConfig from '@/helpers/CreateLogoAnimationConfig'
import Lottie, { AnimationItem } from 'lottie-web'
import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '@styles/components/NavLogo.scss'

const NavLogo = () => {
	const location = useLocation()
	const logoContainerRef = useRef<HTMLDivElement>(null)
	const logoAnimationRef = useRef<AnimationItem | undefined>()
	const linkRef = useRef<HTMLAnchorElement>(null)

	useLayoutEffect(() => {
		initLogoAnimation()
		addLinkListeners()

		return cleanUp
	}, [])

	useLayoutEffect(() => {
		isHomePage() ? hideLogo() : showLogo()
	}, [location.pathname])

	const cleanUp = () => {
		logoAnimationRef.current?.destroy()
		removeLinkListeners()
	}

	const isHomePage = () => location.pathname === '/'

	const addLinkListeners = () => {
		linkRef.current?.addEventListener('transitionend', handleLinkTransition)
	}

	const removeLinkListeners = () => {
		linkRef.current?.removeEventListener(
			'transitionend',
			handleLinkTransition
		)
	}

	const initLogoAnimation = () => {
		logoAnimationRef.current = Lottie.loadAnimation(
			createLogoAnimationConfig(logoContainerRef.current!)
		)

		setAnimationInitialFrame()
	}

	const setAnimationInitialFrame = () =>
		logoAnimationRef.current?.goToAndStop(74, true)

	const isLinkInvisible = () => linkRef.current?.style.opacity === '0'

	const changeLogoVisibility = ({ isVisible }: { isVisible: boolean }) => {
		linkRef.current!.style.opacity = isVisible ? '1' : '0'
	}

	const wasLinkTurnedToInvisible = (event: TransitionEvent) => {
		return event.propertyName === 'opacity' && isLinkInvisible()
	}

	const handleLinkTransition = (event: globalThis.TransitionEvent) => {
		wasLinkTurnedToInvisible(event) && setAnimationInitialFrame()
	}

	const changeLinkInteractivity = ({
		isInteractive,
	}: {
		isInteractive: boolean
	}) => {
		linkRef.current?.blur()
		linkRef.current!.tabIndex = isInteractive ? 1 : -1
		linkRef.current!.style.pointerEvents = isInteractive ? 'all' : 'none'
	}

	const hideLogo = () => {
		changeLogoVisibility({ isVisible: false })
		changeLinkInteractivity({ isInteractive: false })
	}

	const showLogo = () => {
		changeLogoVisibility({ isVisible: true })
		changeLinkInteractivity({ isInteractive: true })
		logoAnimationRef.current?.play()
	}

	return (
		<Link className="nav-logo" to={'/'} ref={linkRef}>
			<div className="logo" ref={logoContainerRef} />
		</Link>
	)
}

export default NavLogo
